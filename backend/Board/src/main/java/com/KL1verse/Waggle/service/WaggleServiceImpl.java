// WaggleServiceImpl
package com.KL1verse.Waggle.service;

import com.KL1verse.Board.dto.req.BoardDTO;
import com.KL1verse.Board.dto.req.SearchBoardConditionDto;
import com.KL1verse.Board.exception.UnauthorizedException;
import com.KL1verse.Board.repository.BoardRepository;
import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Comment.repository.CommentRepository;
import com.KL1verse.Waggle.dto.req.WaggleDTO;
import com.KL1verse.Waggle.repository.WaggleRepository;
import com.KL1verse.Waggle.repository.entity.Waggle;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
public class WaggleServiceImpl implements WaggleService {

    private final WaggleRepository waggleRepository;
    private final BoardRepository boardRepository;

    private final CommentRepository commentRepository;

    public WaggleServiceImpl(WaggleRepository waggleRepository, BoardRepository boardRepository,
        CommentRepository commentRepository) {
        this.waggleRepository = waggleRepository;
        this.boardRepository = boardRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public WaggleDTO getWaggleById(Long boardId) {
        Waggle waggle = findWaggleByBoardId(boardId);
        return convertToDTO(waggle);
    }

    @Override
    public WaggleDTO createWaggle(WaggleDTO waggleDto) {
        Waggle waggle = convertToEntity(waggleDto);
        Board board = saveBoard(waggle.getBoard());
        waggle.setBoard(board);
        Waggle createdWaggle = waggleRepository.save(waggle);
        return convertToDTO(createdWaggle);
    }

    @Override
    public WaggleDTO updateWaggle(Long boardId, WaggleDTO waggleDto) {
        Waggle existingWaggle = findWaggleByBoardId(boardId);
        updateExistingWaggle(existingWaggle, waggleDto);
        Waggle updatedWaggle = waggleRepository.save(existingWaggle);
        return convertToDTO(updatedWaggle);
    }

    @Override
    public void deleteWaggle(Long boardId) {
        Waggle waggleToDelete = findWaggleByBoardId(boardId);

        // 로그인한 사용자가 Waggle 게시물의 소유자인지 확인

            if (waggleToDelete != null) {
                waggleToDelete.getBoard().setDeleteAt(LocalDateTime.now());
            }
            waggleRepository.deleteById(waggleToDelete.getWaggleId());

    }




    //    @Override
//    public Page<WaggleDTO> searchWagglesWithLikes(SearchBoardConditionDto searchCondition, Pageable pageable) {
//        Page<Waggle> waggles;
//
//        if (searchCondition != null && searchCondition.getKeyword() != null) {
//            waggles = waggleRepository.findByBoard_TitleContainingOrBoard_ContentContaining(
//                searchCondition.getKeyword(),
//                searchCondition.getKeyword(),
//                pageable
//            );
//        } else {
//            waggles = waggleRepository.findAll(pageable);
//        }
//
//        return waggles.map(waggle -> {
//            WaggleDTO waggleDTO = convertToDTO(waggle);
//
//            // Waggle과 연관된 Board의 댓글 수 가져오기
//            Long boardId = waggle.getBoard().getBoardId();
//            Integer commentCount = commentRepository.countCommentsByBoardId(boardId);
//
//            // WaggleDTO 내의 BoardDTO에 댓글 수 설정
//            waggleDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);
//
//            return waggleDTO;
//        });
//    }
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

        // 좋아요 수를 가져와서 설정
        List<Object[]> likesCounts = waggleRepository.getLikesCountForEachWaggle();

        return waggles.map(waggle -> {
            WaggleDTO waggleDTO = convertToDTO(waggle);

            // Waggle과 연관된 Board의 댓글 수 가져오기
            Long boardId = waggle.getBoard().getBoardId();
            Integer commentCount = commentRepository.countCommentsByBoardId(boardId);

            // WaggleDTO 내의 BoardDTO에 댓글 수 설정
            waggleDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);

            // 좋아요 수 설정
            for (Object[] result : likesCounts) {
                Waggle waggleResult = (Waggle) result[0];
                if (waggleResult.getWaggleId().equals(waggle.getWaggleId())) {
                    Long totalLikes = (Long) result[1];
                    int likesCount = (totalLikes != null) ? totalLikes.intValue() : 0;
                    waggleDTO.setLikesCount(likesCount);
                    break;
                }
            }

            return waggleDTO;
        });
    }

    @Override
    public Page<WaggleDTO> getAllWaggleList(Pageable pageable) {
        Page<Waggle> waggles = waggleRepository.findByBoard_BoardType(Board.BoardType.WAGGLE,
            pageable);

        return waggles.map(waggle -> {
            WaggleDTO waggleDTO = convertToDTO(waggle);

            // Waggle과 연관된 Board의 댓글 수 가져오기
            Long boardId = waggle.getBoard().getBoardId();
            Integer commentCount = commentRepository.countCommentsByBoardId(boardId);

            // WaggleDTO 내의 BoardDTO에 댓글 수 설정
            waggleDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);

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

//    @Override
//    public Page<WaggleDTO> getAllWagglesWithLikes(Pageable pageable) {
//        List<Object[]> likesCounts = waggleRepository.getLikesCountForEachWaggle();
//        List<WaggleDTO> wagglesWithLikes = convertToDTOListWithLikes(likesCounts);
//        return new PageImpl<>(wagglesWithLikes, pageable, wagglesWithLikes.size());
//    }

    @Override
    public Page<WaggleDTO> getAllWagglesWithLikes(Pageable pageable) {
        // 좋아요 수를 가져오는 쿼리 실행
        List<Object[]> likesCounts = waggleRepository.getLikesCountForEachWaggle();

        // 페이지네이션된 모든 Waggle 가져오기
        Page<Waggle> waggles = waggleRepository.findAll(pageable);

        // 좋아요 수와 댓글 수를 설정하여 DTO로 변환
        List<WaggleDTO> wagglesWithLikes = waggles.getContent().stream()
            .map(waggle -> {
                WaggleDTO waggleDTO = convertToDTO(waggle);

                // Waggle과 연관된 Board의 댓글 수 가져오기
                Long boardId = waggle.getBoard().getBoardId();
                Integer commentCount = commentRepository.countCommentsByBoardId(boardId);

                // WaggleDTO 내의 BoardDTO에 댓글 수 설정
                waggleDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);

                // 좋아요 수 설정
                for (Object[] result : likesCounts) {
                    Waggle waggleResult = (Waggle) result[0];
                    if (waggleResult.getWaggleId().equals(waggle.getWaggleId())) {
                        Long totalLikes = (Long) result[1];
                        int likesCount = (totalLikes != null) ? totalLikes.intValue() : 0;
                        waggleDTO.setLikesCount(likesCount);
                        break;
                    }
                }

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

            // 좋아요 개수가 null이 아니라면 그 값을 사용, null이면 0으로 설정
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
            .build());
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
}