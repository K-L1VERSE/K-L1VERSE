package com.KL1verse.Mate.service;

import com.KL1verse.Board.dto.req.BoardDTO;
import com.KL1verse.Board.dto.req.SearchBoardConditionDto;
import com.KL1verse.Board.repository.BoardRepository;
import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Comment.repository.CommentRepository;
import com.KL1verse.Mate.dto.req.MateDTO;
import com.KL1verse.Mate.repository.MateRepository;
import com.KL1verse.Mate.repository.entity.Mate;
import com.KL1verse.kafka.dto.req.BoardCleanbotCheckReqDto;
import com.KL1verse.kafka.dto.res.BoardNotificationResDto;
import com.KL1verse.kafka.producer.KafkaBoardCleanbotProducer;
import com.KL1verse.kafka.producer.KafkaBoardNotificationProducer;
import com.KL1verse.s3.repository.entity.File;
import com.KL1verse.s3.service.BoardImageService;
import com.KL1verse.s3.service.FileService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MateServiceImpl implements MateService {

    private final MateRepository mateRepository;
    private final BoardRepository boardRepository;
    private final FileService fileService;

    private final BoardImageService boardImageService;

    private final CommentRepository commentRepository;
    private final KafkaBoardCleanbotProducer kafkaBoardCleanbotProducer;
    private final KafkaBoardNotificationProducer kafkaBoardNotificationProducer;


    @Override
    public MateDTO getMateById(Long boardId) {
        Mate mate = findMateByBoardId(boardId);

        MateDTO mateDTO = convertToDTO(mate);
        int commentCount = commentRepository.countCommentsByBoardId(boardId);
        mateDTO.getBoard().setCommentCount(commentCount);

        Integer userId = mateDTO.getBoard().getUserId();
        List<Object[]> userInfo = mateRepository.findUserNicknameAndProfileAndMainBadge(userId);


        String userNickname = (String) userInfo.get(0)[0];
        String userProfile = (String) userInfo.get(0)[1];
        String userMainBadge = (String) userInfo.get(0)[2];

        mateDTO.getBoard().setNickname(userNickname);
        mateDTO.getBoard().setProfile(userProfile);
        if(userMainBadge != null) {
            mateDTO.getBoard().setMainBadge(userMainBadge);
        }

        return mateDTO;
    }

    @Override
    public List<MateDTO> getMatesByUser(Integer userId, Pageable pageable) {
        List<Mate> mates = mateRepository.findByBoard_UserId(userId, pageable);

        List<Object[]> userInfo = mateRepository.findUserNicknameAndProfileAndMainBadge(userId);
        String userNickname = (String) userInfo.get(0)[0];
        String userProfile = (String) userInfo.get(0)[1];
        String userMainBadge = (String) userInfo.get(0)[2];

        return mates.stream().map(mate -> {
            MateDTO mateDTO = convertToDTO(mate);

            mateDTO.getBoard().setNickname(userNickname);
            mateDTO.getBoard().setProfile(userProfile);
            if(userMainBadge != null) {
                mateDTO.getBoard().setMainBadge(userMainBadge);
            }

            // 게시물 이미지 가져오기
            mateDTO.getBoard().setBoardImage(mate.getBoard().getBoardImage());

            // 댓글 수 가져오기
            Long boardId = mate.getBoard().getBoardId();
            Integer commentCount = commentRepository.countCommentsByBoardId(boardId);
            mateDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);

            return mateDTO;
        }).collect(Collectors.toList());
    }


    @Transactional
    @Override
    public MateDTO createMate(MateDTO mateDto) {
        Mate mate = convertToEntity(mateDto);
        Board board = saveBoard(mate.getBoard());
        mate.setBoard(board);

        File file = fileService.saveFile(mateDto.getBoard().getBoardImage());
        boardImageService.saveBoardImage(board, file);

        Integer userId = mateDto.getBoard().getUserId();
        List<Object[]> nicknameResult = mateRepository.findUserNickname(userId);
        String userNickname = nicknameResult.isEmpty() ? null : (String) nicknameResult.get(0)[0];

        Mate createdMate = mateRepository.save(mate);

        MateDTO createdMateDTO = convertToDTO(createdMate);
        createdMateDTO.getBoard().setNickname(userNickname);

        board.setBoardImage(file.getUri());
        createdMateDTO.getBoard().setBoardImage(file.getUri());

        kafkaBoardNotificationProducer.boardNotification(BoardNotificationResDto.builder()
                .type(BoardNotificationResDto.BoardNotificationType.GOAL)
                .userId(userId)
                .message("글 작성 보상으로 10골을 지급 받았습니다.")
                .uri("/mate/" + String.valueOf(board.getBoardId()))
                .profile(null)
                .nickname(null)
                .build());

//        BoardCleanbotCheckReqDto boardCleanbotCheckReqDto = BoardCleanbotCheckReqDto.builder()
//            .id(createdMate.getBoard().getBoardId())
//            .content(createdMate.getBoard().getContent())
//            .domain("board")
//            .build();
//        kafkaBoardCleanbotProducer.boardCleanbotCheck(boardCleanbotCheckReqDto);

        return createdMateDTO;
    }


    @Transactional
    @Override
    public MateDTO updateMate(Long boardId, MateDTO mateDto) {
        Mate existingMate = findMateByBoardId(boardId);
        updateExistingMate(existingMate, mateDto);

        Board board = existingMate.getBoard();
//        board.setBoardImage(mateDto.getBoard().getBoardImage());

        Mate updatedMate = mateRepository.save(existingMate);
        File file = fileService.saveFile(mateDto.getBoard().getBoardImage());
        boardImageService.saveBoardImage(board, file);

        board.setBoardImage(file.getUri());
//        BoardCleanbotCheckReqDto boardCleanbotCheckReqDto = BoardCleanbotCheckReqDto.builder()
//            .id(boardId)
//            .content(mateDto.getBoard().getContent())
//            .domain("board")
//            .build();
//        kafkaBoardCleanbotProducer.boardCleanbotCheck(boardCleanbotCheckReqDto);

        return convertToDTO(updatedMate);
    }

    @Override
    public void deleteMate(Long boardId) {
        Mate mateToDelete = findMateByBoardId(boardId);

        if (mateToDelete != null) {
            mateToDelete.getBoard().setDeleteAt(LocalDateTime.now());
        }

        mateRepository.deleteById(mateToDelete.getMateId());
    }


    @Override
    public Page<MateDTO> searchMates(SearchBoardConditionDto searchCondition, Pageable pageable) {
        Page<Mate> mates;

        if (searchCondition != null && searchCondition.getKeyword() != null) {
            mates = mateRepository.findByBoard_TitleContainingOrBoard_ContentContaining(
                searchCondition.getKeyword(), searchCondition.getKeyword(), pageable);
        } else {
            mates = mateRepository.findAll(pageable);
        }

        return mates.map(mate -> {
            MateDTO mateDTO = convertToDTO(mate);

            if (mate.getBoard() != null) {
                Long boardId = mate.getBoard().getBoardId();
                Integer commentCount = commentRepository.countCommentsByBoardId(boardId);

                mateDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);
            }

            Integer userId = mateDTO.getBoard().getUserId();
            List<Object[]> nicknameResult = mateRepository.findUserNickname(userId);


            String userNickname = (String) nicknameResult.get(0)[0];
            mateDTO.getBoard().setNickname(userNickname);
            mateDTO.getBoard().setBoardImage(mate.getBoard().getBoardImage());

            return mateDTO;
        });
    }


    @Override
    public List<MateDTO> getAllMateList(Pageable pageable) {
        List<Mate> mates = mateRepository.findAllBy(pageable);

        return mates.stream().map(mate -> {
            MateDTO mateDTO = convertToDTO(mate);

            if (mate.getBoard() != null) {

                Long boardId = mate.getBoard().getBoardId();
                Integer commentCount = commentRepository.countCommentsByBoardId(boardId);

                mateDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);
            }

            Integer userId = mateDTO.getBoard().getUserId();
            List<Object[]> userInfo = mateRepository.findUserNicknameAndProfileAndMainBadge(userId);
            String userNickname = (String) userInfo.get(0)[0];
            String userProfile = (String) userInfo.get(0)[1];
            String userMainBadge = (String) userInfo.get(0)[2];
            mateDTO.getBoard().setNickname(userNickname);
            mateDTO.getBoard().setProfile(userProfile);
            if(userMainBadge != null) {
                mateDTO.getBoard().setMainBadge(userMainBadge);
            }

            return mateDTO;
        }).collect(Collectors.toList());
    }

    private Mate findMateByBoardId(Long boardId) {
        Page<Mate> mates = mateRepository.findByBoard_BoardId(boardId, Pageable.unpaged());
        if (mates.isEmpty()) {
            throw new RuntimeException("Mate not found with boardId: " + boardId);
        }
        return mates.getContent().get(0);
    }

    private Board saveBoard(Board board) {
        return boardRepository.save(board);
    }

    private void updateExistingMate(Mate existingMate, MateDTO mateDto) {
        existingMate.getBoard().setTitle(mateDto.getBoard().getTitle());
        existingMate.getBoard().setContent(mateDto.getBoard().getContent());
        existingMate.setFullFlag(mateDto.isFullFlag());
        existingMate.setTotal(mateDto.getTotal());

    }

    @Override
    public Page<MateDTO> getOpenMates(Pageable pageable) {
        Page<Mate> openMates = mateRepository.findByFullFlagFalse(pageable);
        return openMates.map(this::convertToDTO);
    }

    @Override
    public Page<MateDTO> getMatesByDateRange(LocalDateTime startDate, LocalDateTime endDate,
        Pageable pageable) {
        Page<Mate> mates = mateRepository.findByBoard_CreateAtBetween(startDate, endDate, pageable);

        return mates.map(mate -> {
            MateDTO mateDTO = convertToDTO(mate);

            // 닉네임 가져오기
            Integer userId = mateDTO.getBoard().getUserId();
            List<Object[]> nicknameResult = mateRepository.findUserNickname(userId);
            String userNickname = nicknameResult.isEmpty() ? null : (String) nicknameResult.get(0)[0];
            mateDTO.getBoard().setNickname(userNickname);

            // 게시물 이미지 가져오기
            mateDTO.getBoard().setBoardImage(mate.getBoard().getBoardImage());

            // 댓글 수 가져오기
            Long boardId = mate.getBoard().getBoardId();
            Integer commentCount = commentRepository.countCommentsByBoardId(boardId);
            mateDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);

            return mateDTO;
        });
    }

    @Override
    public Page<MateDTO> getMatesByMatchList(List<Integer> matchIds, Pageable pageable) {
        Page<Mate> mates;

        if (matchIds != null && !matchIds.isEmpty()) {
            mates = mateRepository.findByMatchIdIn(matchIds, pageable);
        } else {
            mates = mateRepository.findAll(pageable);
        }

        return mates.map(mate -> {
            MateDTO mateDTO = convertToDTO(mate);

            if (mate.getBoard() != null) {
                Long boardId = mate.getBoard().getBoardId();
                Integer commentCount = commentRepository.countCommentsByBoardId(boardId);

                mateDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);
            }

            Integer userId = mateDTO.getBoard().getUserId();
            List<Object[]> nicknameResult = mateRepository.findUserNickname(userId);
            String userNickname = nicknameResult.isEmpty() ? null : (String) nicknameResult.get(0)[0];
            mateDTO.getBoard().setNickname(userNickname);

            return mateDTO;
        });
    }


    private MateDTO convertToDTO(Mate mate) {
        MateDTO mateDTO = new MateDTO();
        BeanUtils.copyProperties(mate, mateDTO);
        mateDTO.setBoard(BoardDTO.builder()
            .boardId(mate.getBoard().getBoardId())
            .boardType(mate.getBoard().getBoardType()).title(mate.getBoard().getTitle())
            .content(mate.getBoard().getContent()).createAt(mate.getBoard().getCreateAt())
            .updateAt(mate.getBoard().getUpdateAt()).deleteAt(mate.getBoard().getDeleteAt())
            .boardImage(mate.getBoard().getBoardImage())

            .userId(mate.getBoard().getUserId())
            .commentCount(commentRepository.countCommentsByBoardId(mate.getBoard().getBoardId()))
            .build());

        return mateDTO;
    }

    private Mate convertToEntity(MateDTO mateDTO) {
        Mate mate = new Mate();
        BeanUtils.copyProperties(mateDTO, mate);
        mate.setBoard(Board.builder().boardId(mateDTO.getBoard().getBoardId())
            .boardType(mateDTO.getBoard().getBoardType()).title(mateDTO.getBoard().getTitle())
            .content(mateDTO.getBoard().getContent()).createAt(mateDTO.getBoard().getCreateAt())
            .updateAt(mateDTO.getBoard().getUpdateAt()).deleteAt(mateDTO.getBoard().getDeleteAt())
//            .boardImage(mateDTO.getBoard().getBoardImage())
            .userId(mateDTO.getBoard().getUserId()).build());
        return mate;
    }

    public List<MateDTO> getMostRecentMates(int count) {
        List<Mate> recentMates = mateRepository.findAll(
            PageRequest.of(0, count, Sort.by(Sort.Direction.DESC, "board.createAt"))).getContent();

        return recentMates.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
}
