// WaggleServiceImpl
package com.KL1verse.Waggle.service;

import com.KL1verse.Board.dto.req.BoardDTO;
import com.KL1verse.Board.dto.req.SearchBoardConditionDto;
import com.KL1verse.Board.repository.BoardRepository;
import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Comment.repository.CommentRepository;
import com.KL1verse.Waggle.dto.req.WaggleDTO;
import com.KL1verse.Waggle.repository.WaggleLikeRepository;
import com.KL1verse.Waggle.repository.WaggleRepository;
import com.KL1verse.Waggle.repository.entity.Waggle;
import com.KL1verse.s3.repository.entity.File;
import com.KL1verse.s3.service.BoardImageService;
import com.KL1verse.s3.service.FileService;
import com.KL1verse.kafka.dto.req.BoardCleanbotCheckReqDto;
import com.KL1verse.kafka.producer.KafkaBoardCleanbotProducer;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class WaggleServiceImpl implements WaggleService {

    private final WaggleRepository waggleRepository;
    private final BoardRepository boardRepository;

    private final FileService fileService;

    private final BoardImageService boardImageService;
    private final WaggleLikeRepository waggleLikeRepository;

    private final CommentRepository commentRepository;
    private final KafkaBoardCleanbotProducer kafkaBoardCleanbotProducer;


    @Override
    public WaggleDTO getWaggleById(Long boardId, Integer loginUserId) {
        Waggle waggle = findWaggleByBoardId(boardId);

        WaggleDTO waggleDTO = convertToDTO(waggle);

        boolean isLiked = waggleLikeRepository
            .findByUserIdAndWaggleId_WaggleId(Long.valueOf(loginUserId), waggle.getWaggleId())
            .isPresent();
        waggleDTO.setLiked(isLiked);

        int likesCount = waggleRepository.getLikesCountForEachWaggle().stream()
            .filter(result -> ((Waggle) result[0]).getWaggleId().equals(waggle.getWaggleId()))
            .map(result -> ((Long) result[1]).intValue())
            .findFirst()
            .orElse(0);

        waggleDTO.setLikesCount(likesCount);

        int commentCount = commentRepository.countCommentsByBoardId(boardId);
        waggleDTO.getBoard().setCommentCount(commentCount);

        Integer userId = waggleDTO.getBoard().getUserId();
        List<Object[]> nicknameResult = waggleRepository.findUserNickname(userId);


        String userNickname = (String) nicknameResult.get(0)[0];
        waggleDTO.getBoard().setNickname(userNickname);


        return waggleDTO;
    }
    @Override
    public WaggleDTO createWaggle(WaggleDTO waggleDto) {
        Waggle waggle = convertToEntity(waggleDto);
        Set<String> hashtags = extractHashtags(waggleDto.getBoard().getContent());
        waggle.setHashtags(hashtags);

        Board board = saveBoard(waggle.getBoard());

        File file = fileService.saveFile(waggleDto.getBoard().getBoardImage());
        boardImageService.saveBoardImage(board, file);

        Integer userId = waggleDto.getBoard().getUserId();
        List<Object[]> nicknameResult = waggleRepository.findUserNickname(userId);
        String userNickname = nicknameResult.isEmpty() ? null : (String) nicknameResult.get(0)[0];

        Waggle createdWaggle = waggleRepository.save(waggle);

        WaggleDTO createdWaggleDTO = convertToDTO(createdWaggle);
        createdWaggleDTO.getBoard().setNickname(userNickname);
        
//        BoardCleanbotCheckReqDto boardCleanbotCheckReqDto = BoardCleanbotCheckReqDto.builder()
//            .id(createdWaggle.getBoard().getBoardId())
//            .content(createdWaggle.getBoard().getContent())
//            .domain("board")
//            .build();
//        kafkaBoardCleanbotProducer.boardCleanbotCheck(boardCleanbotCheckReqDto);

        return createdWaggleDTO;
    }

    @Transactional
    @Override
    public WaggleDTO updateWaggle(Long boardId, WaggleDTO waggleDto) {
        Waggle existingWaggle = findWaggleByBoardId(boardId);
        updateExistingWaggle(existingWaggle, waggleDto);

        Board board = existingWaggle.getBoard();
//        board.setBoardImage(waggleDto.getBoard().getBoardImage());

        Set<String> hashtags = extractHashtags(waggleDto.getBoard().getContent());
        existingWaggle.setHashtags(hashtags);

        Waggle updatedWaggle = waggleRepository.save(existingWaggle);
        File file = fileService.saveFile(waggleDto.getBoard().getBoardImage());
        boardImageService.saveBoardImage(board, file);


//        BoardCleanbotCheckReqDto boardCleanbotCheckReqDto = BoardCleanbotCheckReqDto.builder()
//            .id(boardId)
//            .content(waggleDto.getBoard().getContent())
//            .domain("board")
//            .build();
//        kafkaBoardCleanbotProducer.boardCleanbotCheck(boardCleanbotCheckReqDto);

        return convertToDTO(updatedWaggle);
    }

    // extractHashtags 메서드 추가
    private Set<String> extractHashtags(String content) {
        Set<String> hashtags = new HashSet<>();
        Pattern pattern = Pattern.compile("#(\\w+)");
        Matcher matcher = pattern.matcher(content);

        while (matcher.find()) {
            hashtags.add(matcher.group(1));
        }

        return hashtags;
    }

//    @Override
//    public WaggleDTO createWaggle(WaggleDTO waggleDto) {
//        Waggle waggle = convertToEntity(waggleDto);
//        Board board = saveBoard(waggle.getBoard());
//
//        File file = fileService.saveFile(waggleDto.getBoard().getBoardImage());
//        boardImageService.saveBoardImage(board, file);
//
//        Waggle createdWaggle = waggleRepository.save(waggle);
//
//        return convertToDTO(createdWaggle);
//    }
//
//
//    @Transactional
//    @Override
//    public WaggleDTO updateWaggle(Long boardId, WaggleDTO waggleDto) {
//        Waggle existingWaggle = findWaggleByBoardId(boardId);
//        updateExistingWaggle(existingWaggle, waggleDto);
//
//        Board board = existingWaggle.getBoard();
//        board.setBoardImage(waggleDto.getBoard().getBoardImage());
//
//        Waggle updatedWaggle = waggleRepository.save(existingWaggle);
//        File file = fileService.saveFile(waggleDto.getBoard().getBoardImage());
//        boardImageService.saveBoardImage(board, file);
//
//        return convertToDTO(updatedWaggle);
//    }

    @Override
    public void deleteWaggle(Long boardId) {
        Waggle waggleToDelete = findWaggleByBoardId(boardId);

        if (waggleToDelete != null) {
            waggleToDelete.getBoard().setDeleteAt(LocalDateTime.now());
        }
        waggleRepository.deleteById(waggleToDelete.getWaggleId());

    }


    @Override
    public Page<WaggleDTO> searchWagglesWithLikes(SearchBoardConditionDto searchCondition,
        Pageable pageable) {
        Page<Waggle> waggles;

        if (searchCondition != null && searchCondition.getKeyword() != null) {
            waggles = waggleRepository.findByBoard_TitleContainingOrBoard_ContentContaining(
                searchCondition.getKeyword(),
                searchCondition.getKeyword(),
                pageable
            );
        } else {
            waggles = waggleRepository.findAll(pageable);
        }

        List<Object[]> likesCounts = waggleRepository.getLikesCountForEachWaggle();

        return waggles.map(waggle -> {
            WaggleDTO waggleDTO = convertToDTO(waggle);

            Long boardId = waggle.getBoard().getBoardId();
            Integer commentCount = commentRepository.countCommentsByBoardId(boardId);

            waggleDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);

            for (Object[] result : likesCounts) {
                Waggle waggleResult = (Waggle) result[0];
                if (waggleResult.getWaggleId().equals(waggle.getWaggleId())) {
                    Long totalLikes = (Long) result[1];
                    int likesCount = (totalLikes != null) ? totalLikes.intValue() : 0;
                    waggleDTO.setLikesCount(likesCount);
                    break;
                }
            }

            Integer userId = waggleDTO.getBoard().getUserId();
            List<Object[]> nicknameResult = waggleRepository.findUserNickname(userId);


            String userNickname = (String) nicknameResult.get(0)[0];
            waggleDTO.getBoard().setNickname(userNickname);

            return waggleDTO;
        });
    }

    @Override
    public Page<WaggleDTO> getAllWaggleList(Pageable pageable) {
        Page<Waggle> waggles = waggleRepository.findByBoard_BoardType(Board.BoardType.WAGGLE,
            pageable);

        return waggles.map(waggle -> {
            WaggleDTO waggleDTO = convertToDTO(waggle);

            Long boardId = waggle.getBoard().getBoardId();
            Integer commentCount = commentRepository.countCommentsByBoardId(boardId);


            Integer likesCount = waggleRepository.getLikesCountForEachWaggle().stream()
                .filter(result -> ((Waggle) result[0]).getWaggleId().equals(waggle.getWaggleId()))
                .map(result -> ((Long) result[1]).intValue())
                .findFirst()
                .orElse(0);

            waggleDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);
            waggleDTO.setLikesCount(likesCount);

            Integer userId = waggleDTO.getBoard().getUserId();
            List<Object[]> nicknameResult = waggleRepository.findUserNickname(userId);
            String userNickname = nicknameResult.isEmpty() ? null : (String) nicknameResult.get(0)[0];
            waggleDTO.getBoard().setNickname(userNickname);

            return waggleDTO;
        });
    }



    private Waggle findWaggleByBoardId(Long boardId) {
        Page<Waggle> waggles = waggleRepository.findByBoard_BoardId(boardId, Pageable.unpaged());
        if (waggles.isEmpty()) {
            throw new RuntimeException("Waggle not found with boardId: " + boardId);
        }
        return waggles.getContent().get(0);
    }

    private Board saveBoard(Board board) {
        return boardRepository.save(board);
    }

    private void updateExistingWaggle(Waggle existingWaggle, WaggleDTO waggleDto) {
        existingWaggle.getBoard().setTitle(waggleDto.getBoard().getTitle());
        existingWaggle.getBoard().setContent(waggleDto.getBoard().getContent());
    }


    @Override
    public Page<WaggleDTO> getAllWagglesWithLikes(Pageable pageable) {

        List<Object[]> likesCounts = waggleRepository.getLikesCountForEachWaggle();

//        log.error("likesCounts: {}", likesCounts);

        Page<Waggle> waggles = waggleRepository.findAll(pageable);

        List<WaggleDTO> wagglesWithLikes = waggles.getContent().stream()
            .map(waggle -> {
                WaggleDTO waggleDTO = convertToDTO(waggle);

                Long boardId = waggle.getBoard().getBoardId();
                Integer commentCount = commentRepository.countCommentsByBoardId(boardId);

                waggleDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);

                for (Object[] result : likesCounts) {
                    Waggle waggleResult = (Waggle) result[0];
                    if (waggleResult.getWaggleId().equals(waggle.getWaggleId())) {
                        Long totalLikes = (Long) result[1];
                        int likesCount = (totalLikes != null) ? totalLikes.intValue() : 0;
                        waggleDTO.setLikesCount(likesCount);
                        break;
                    }
                }
                Integer userId = waggleDTO.getBoard().getUserId();
                List<Object[]> nicknameResult = waggleRepository.findUserNickname(userId);


                    String userNickname = (String) nicknameResult.get(0)[0];
                    waggleDTO.getBoard().setNickname(userNickname);

                    return waggleDTO;
            })
            .collect(Collectors.toList());

        return new PageImpl<>(wagglesWithLikes, pageable, waggles.getTotalElements());
    }


    private List<WaggleDTO> convertToDTOListWithLikes(List<Object[]> likesCounts) {
        List<WaggleDTO> wagglesWithLikes = new ArrayList<>();
        for (Object[] result : likesCounts) {
            Waggle waggle = (Waggle) result[0];
            Long totalLikes = (Long) result[1];
            Integer commentCount = commentRepository.countCommentsByBoardId(
                waggle.getBoard().getBoardId());

            int likesCount = (totalLikes != null) ? totalLikes.intValue() : 0;

            WaggleDTO waggleDTO = convertToDTO(waggle);
            waggleDTO.setLikesCount(likesCount);
            waggleDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);
            wagglesWithLikes.add(waggleDTO);
        }
        return wagglesWithLikes;
    }


    private WaggleDTO convertToDTO(Waggle waggle) {
        WaggleDTO waggleDTO = new WaggleDTO();
        BeanUtils.copyProperties(waggle, waggleDTO);

        waggleDTO.setBoard(BoardDTO.builder()
            .boardId(waggle.getBoard().getBoardId())
            .boardType(waggle.getBoard().getBoardType())
            .title(waggle.getBoard().getTitle())
            .content(waggle.getBoard().getContent())
            .createAt(waggle.getBoard().getCreateAt())
            .updateAt(waggle.getBoard().getUpdateAt())
            .deleteAt(waggle.getBoard().getDeleteAt())
            .commentCount(0)
            .userId(waggle.getBoard().getUserId())
//            .boardImage(waggle.getBoard().getBoardImage())
            .boardType(waggle.getBoard().getBoardType())
            .build());
        waggleDTO.setHashtags(new ArrayList<>(waggle.getHashtags()));
        return waggleDTO;
    }

    private Waggle convertToEntity(WaggleDTO waggleDTO) {
        Waggle waggle = new Waggle();
        BeanUtils.copyProperties(waggleDTO, waggle);
        waggle.setBoard(Board.builder()
            .boardId(waggleDTO.getBoard().getBoardId())
            .boardType(waggleDTO.getBoard().getBoardType())
            .title(waggleDTO.getBoard().getTitle())
            .content(waggleDTO.getBoard().getContent())
            .createAt(waggleDTO.getBoard().getCreateAt())
            .updateAt(waggleDTO.getBoard().getUpdateAt())
            .deleteAt(waggleDTO.getBoard().getDeleteAt())
            .userId(waggleDTO.getBoard().getUserId())
//            .boardImage(waggleDTO.getBoard().getBoardImage())
            .boardType(waggleDTO.getBoard().getBoardType())
            .build());
        return waggle;
    }

    @Override
    public List<WaggleDTO> getMostRecentWaggles(int count) {
        List<Waggle> recentWaggles = waggleRepository.findAll(
            PageRequest.of(0, count, Sort.by(Sort.Direction.DESC, "board.createAt"))
        ).getContent();

        return recentWaggles.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Override
    public void blockedByCleanbotCheck(Long boardId) {
        Waggle waggle = findWaggleByBoardId(boardId);
        waggle.getBoard().setDeleteAt(LocalDateTime.now());
        waggleRepository.save(waggle);
    }
}