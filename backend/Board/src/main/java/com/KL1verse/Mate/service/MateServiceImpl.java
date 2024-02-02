package com.KL1verse.Mate.service;

import com.KL1verse.Board.dto.req.BoardDTO;
import com.KL1verse.Board.dto.req.SearchBoardConditionDto;
import com.KL1verse.Board.repository.BoardRepository;
import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Comment.repository.CommentRepository;
import com.KL1verse.Mate.dto.req.MateDTO;
import com.KL1verse.Mate.repository.MateRepository;
import com.KL1verse.Mate.repository.entity.Mate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class MateServiceImpl implements MateService {

    private final MateRepository mateRepository;
    private final BoardRepository boardRepository;

    private final CommentRepository commentRepository;

    public MateServiceImpl(MateRepository mateRepository, BoardRepository boardRepository,
        CommentRepository commentRepository) {
        this.mateRepository = mateRepository;
        this.boardRepository = boardRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public MateDTO getMateById(Long boardId) {
        Mate mate = findMateByBoardId(boardId);
        return convertToDTO(mate);
    }

    @Override
    public MateDTO createMate(MateDTO mateDto) {
        Mate mate = convertToEntity(mateDto);
        Board board = saveBoard(mate.getBoard());
        mate.setBoard(board);
        Mate createdMate = mateRepository.save(mate);
        return convertToDTO(createdMate);
    }

    @Override
    public MateDTO updateMate(Long boardId, MateDTO mateDto) {
        Mate existingMate = findMateByBoardId(boardId);
        updateExistingMate(existingMate, mateDto);
        Mate updatedMate = mateRepository.save(existingMate);
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

    //    @Override
//    public Page<MateDTO> searchMates(SearchBoardConditionDto searchCondition, Pageable pageable) {
//        Page<Mate> mates;
//
//        if (searchCondition != null && searchCondition.getKeyword() != null) {
//            mates = mateRepository.findByBoard_TitleContainingOrBoard_ContentContaining(
//                searchCondition.getKeyword(),
//                searchCondition.getKeyword(),
//                pageable
//            );
//        } else {
//            mates = mateRepository.findAll(pageable);
//        }
//
//        return mates.map(this::convertToDTO);
//    }
    @Override
    public Page<MateDTO> searchMates(SearchBoardConditionDto searchCondition, Pageable pageable) {
        Page<Mate> mates;

        if (searchCondition != null && searchCondition.getKeyword() != null) {
            mates = mateRepository.findByBoard_TitleContainingOrBoard_ContentContaining(
                searchCondition.getKeyword(),
                searchCondition.getKeyword(),
                pageable
            );
        } else {
            mates = mateRepository.findAll(pageable);
        }

        // 댓글 수를 가져와서 설정
        return mates.map(mate -> {
            MateDTO mateDTO = convertToDTO(mate);

            // Mate과 연관된 Board의 댓글 수 가져오기
            if (mate.getBoard() != null) {
                Long boardId = mate.getBoard().getBoardId();
                Integer commentCount = commentRepository.countCommentsByBoardId(boardId);

                // MateDTO 내의 BoardDTO에 댓글 수 설정
                mateDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);
            }

            return mateDTO;
        });
    }

//    @Override
//    public Page<MateDTO> getAllMateList(Pageable pageable) {
//        Page<Mate> mates = mateRepository.findByBoard_BoardType(Board.BoardType.MATE, pageable);
//        return mates.map(this::convertToDTO);
//    }

    @Override
    public Page<MateDTO> getAllMateList(Pageable pageable) {
        Page<Mate> mates = mateRepository.findByBoard_BoardType(Board.BoardType.MATE, pageable);

        return mates.map(mate -> {
            MateDTO mateDTO = convertToDTO(mate);

            // Mate과 연관된 Board의 댓글 수 가져오기
            if (mate.getBoard() != null) {

                Long boardId = mate.getBoard().getBoardId();
                Integer commentCount = commentRepository.countCommentsByBoardId(boardId);

                // MateDTO 내의 BoardDTO에 댓글 수  설정
                mateDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);
            }

            return mateDTO;
        });
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
        // 추가적인 업데이트 로직을 여기에 추가
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

            // Mate과 연관된 Board의 댓글 수 가져오기
            if (mate.getBoard() != null) {
                Long boardId = mate.getBoard().getBoardId();
                Integer commentCount = commentRepository.countCommentsByBoardId(boardId);
                // Board 엔티티에 commentCount 필드가 있다고 가정

                // MateDTO 내의 BoardDTO에 댓글 수 설정
                mateDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);
            }

            return mateDTO;
        });
    }

    private MateDTO convertToDTO(Mate mate) {
        MateDTO mateDTO = new MateDTO();
        BeanUtils.copyProperties(mate, mateDTO);
        mateDTO.setBoard(BoardDTO.builder()
            .boardId(mate.getBoard().getBoardId())
            .boardType(mate.getBoard().getBoardType())
            .title(mate.getBoard().getTitle())
            .content(mate.getBoard().getContent())
            .createAt(mate.getBoard().getCreateAt())
            .updateAt(mate.getBoard().getUpdateAt())
            .deleteAt(mate.getBoard().getDeleteAt())
//        .user(Long.valueOf(mate.getBoard().getUser()))
            .build());
        return mateDTO;
    }

    private Mate convertToEntity(MateDTO mateDTO) {
        Mate mate = new Mate();
        BeanUtils.copyProperties(mateDTO, mate);
        mate.setBoard(Board.builder()
            .boardId(mateDTO.getBoard().getBoardId())
            .boardType(mateDTO.getBoard().getBoardType())
            .title(mateDTO.getBoard().getTitle())
            .content(mateDTO.getBoard().getContent())
            .createAt(mateDTO.getBoard().getCreateAt())
            .updateAt(mateDTO.getBoard().getUpdateAt())
            .deleteAt(mateDTO.getBoard().getDeleteAt())
//        .user(String.valueOf(mateDTO.getBoard().getUser()))
            .build());
        return mate;
    }

    public List<MateDTO> getMostRecentMates(int count) {
        List<Mate> recentMates = mateRepository.findAll(
            PageRequest.of(0, count, Sort.by(Sort.Direction.DESC, "board.createAt"))
        ).getContent();

        return recentMates.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
}
