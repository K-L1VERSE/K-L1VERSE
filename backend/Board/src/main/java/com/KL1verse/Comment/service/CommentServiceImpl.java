package com.KL1verse.Comment.service;



import com.KL1verse.Board.repository.BoardRepository;
import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Comment.dto.req.CommentDTO;
import com.KL1verse.Comment.repository.CommentRepository;
import com.KL1verse.Comment.repository.entity.Comment;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;

    public CommentServiceImpl(CommentRepository commentRepository, BoardRepository boardRepository) {
        this.commentRepository = commentRepository;
        this.boardRepository = boardRepository;
    }


//    private boolean isAuthorized(Comment comment, Long requestingUserId) {
//        // 요청한 사용자가 게시물 작성자 또는 댓글 작성자인지 확인
////        User requestingUser = getUserById(requestingUserId); // 사용자 ID로 사용자 정보 가져오기 (가정)
//        Long requestingUser = 123L; // 사용자 ID로 사용자 정보 가져오기 (가정)
//        requestingUserId = requestingUser;
//        // 게시물 작성자와 댓글 작성자 확인
//        return requestingUser.equals(comment.getBoardId().getUser()) || requestingUser.equals(comment.getUserId());
//    }


    @Override
    public CommentDTO getCommentById(Long commentId, Long requestingUserId) {
        Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));

        if (comment.isSecret() && !isAuthorized(comment, requestingUserId)) {
            // 비밀 댓글에 대한 권한이 없는 경우 처리
            return null;
        }

        return convertToDTO(comment);
    }

//    private boolean isAuthorized(Comment comment, Long requestingUserId) {
//        // 요청한 사용자가 게시물 작성자 또는 댓글 작성자인지 확인
//        // 사용자 ID로 사용자 정보 가져오기 (가정)
//        Long requestingUser = 123L;
//
//        // 게시물 작성자와 댓글 작성자 확인
//        return requestingUser.equals(comment.getBoardId().getUser()) ||
//            requestingUser.equals(comment.getUserId());
//    }

    private boolean isAuthorized(Comment comment, Long requestingUserId) {
        // 요청한 사용자가 댓글 작성자 또는 게시물 작성자인지 확인
        Long commentUserId = comment.getUserId();
        Long boardUserId = Long.valueOf(comment.getBoardId().getUser());

        return requestingUserId.equals(commentUserId) || requestingUserId.equals(boardUserId);
    }


    @Override
    public CommentDTO createComment(CommentDTO commentDTO) {


        Comment comment = convertToEntity(commentDTO);

        Board board = boardRepository.findById(commentDTO.getBoardId())
            .orElseThrow(() -> new RuntimeException("Board not found with id: " + commentDTO.getBoardId()));
        comment.setBoardId(board);

        Comment createdComment = commentRepository.save(comment);
        return CommentDTO.builder()
            .commentId(createdComment.getCommentId())
            .content(createdComment.getContent())
            .createAt(createdComment.getCreateAt())
            .updateAt(createdComment.getUpdateAt())
            .deleteAt(createdComment.getDeleteAt())
            .boardId(createdComment.getBoardId().getBoardId())
            .userId(createdComment.getUserId())
            .isSecret(createdComment.isSecret())
            .build();
    }

    @Override
    public CommentDTO updateComment(Long commentId, CommentDTO commentDTO) {
        Comment existingComment = commentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));

        // 업데이트할 내용을 DTO에서 가져와서 existingComment에 설정
        existingComment.setContent(commentDTO.getContent());
        // 필요한 다른 필드들도 업데이트

        // 업데이트된 Comment를 저장
        Comment updatedComment = commentRepository.save(existingComment);
        return convertToDTO(updatedComment);
    }

//    @Override
//    public void deleteComment(Long commentId) {
//        commentRepository.deleteById(commentId);
//    }

    @Override
    public void deleteComment(Long commentId) {
        Comment existingComment = commentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));

        if(existingComment.getDeleteAt() != null) {
            throw new RuntimeException("Comment {} already deleted " +  commentId);
        }

        // delete_at 필드를 현재 타임스탬프로 설정하여 소프트 삭제
        existingComment.setDeleteAt(LocalDateTime.now());
        commentRepository.save(existingComment);
        log.info("Comment {} is deleted : ", commentId);
    }


    private CommentDTO convertToDTOWithReplies(Comment comment) {
        CommentDTO commentDTO = convertToDTO(comment);
        List<CommentDTO> replyDTOs = comment.getReplies().stream().map(this::convertToDTO).collect(Collectors.toList());
        commentDTO.setReplies(replyDTOs);
        return commentDTO.builder()
            .commentId(comment.getCommentId())
            .content(comment.getContent())
//            .parentId(comment.getParentId().getCommentId())
            .updateAt(comment.getUpdateAt())
            .deleteAt(comment.getDeleteAt())
            .createAt(comment.getCreateAt())
            .userId(comment.getUserId())
            .isSecret(comment.isSecret())
            .boardId(comment.getBoardId().getBoardId())
            .build();
    }



    @Override
    public CommentDTO createReply(Long parentCommentId, CommentDTO replyDTO) {
        Comment parentComment = commentRepository.findById(parentCommentId)
            .orElseThrow(() -> new RuntimeException("Parent Comment not found with id: " + parentCommentId));

        Comment reply = convertToEntity(replyDTO);
        reply.setParentId(parentComment);

        reply.setBoardId(parentComment.getBoardId());
        Comment createdReply = commentRepository.save(reply);


        return CommentDTO.builder()
            .commentId(createdReply.getCommentId())
            .content(createdReply.getContent())
            .parentId(createdReply.getParentId().getCommentId())
            .updateAt(createdReply.getUpdateAt())
            .deleteAt(createdReply.getDeleteAt())
            .createAt(createdReply.getCreateAt())
            .userId(createdReply.getUserId())
            .isSecret(createdReply.isSecret())
            .boardId(createdReply.getBoardId().getBoardId())
            .build();
    }




//    @Override
//    public List<CommentDTO> getAllCommentsByBoardId(Long boardId, Long requestingUserId) {
//        List<Comment> comments = commentRepository.findByBoardId_BoardId(boardId);
//        return comments.stream()
//            .map(comment -> {
//                if (comment.isSecret() && !isAuthorized(comment, requestingUserId)) {
//                    // 비밀 댓글에 대한 권한이 없는 경우 처리
//                    CommentDTO secretComment = new CommentDTO();
//                    secretComment.setContent("비밀 댓글입니다.");
//                    secretComment.setUpdateAt(comment.getUpdateAt());
//                    secretComment.setDeleteAt(comment.getDeleteAt());
//                    secretComment.setCommentId(comment.getCommentId());
//                    secretComment.setCreateAt(comment.getCreateAt());
//                    secretComment.setSecret(comment.isSecret());
//                    secretComment.setReplies(comment.getReplies().stream().map(this::convertToDTO).collect(Collectors.toList()));
//                    secretComment.setBoardId(comment.getBoardId().getBoardId());
////                    secretComment.setParentId(comment.getParentId().getCommentId());
//
//                    return secretComment;
//                } else {
//                    return convertToDTOWithReplies(comment);
//                }
//            })
//            .filter(commentDTO -> commentDTO.getDeleteAt() == null)
//            .collect(Collectors.toList());
//    }

    @Override
    public List<CommentDTO> getAllCommentsByBoardId(Long boardId, Long requestingUserId) {
        List<Comment> comments = commentRepository.findByBoardId_BoardId(boardId);
        return comments.stream()
            .map(comment -> {
                if (comment.isSecret() && !isAuthorized(comment, requestingUserId)) {
                    // 비밀 댓글에 대한 권한이 없는 경우 처리
                    CommentDTO secretComment = new CommentDTO();
                    secretComment.setContent("비밀 댓글입니다.");
                    secretComment.setUpdateAt(comment.getUpdateAt());
                    secretComment.setDeleteAt(comment.getDeleteAt());
                    secretComment.setCommentId(comment.getCommentId());
                    secretComment.setCreateAt(comment.getCreateAt());
                    secretComment.setSecret(comment.isSecret());
                    secretComment.setReplies(comment.getReplies().stream()
                        .map(reply -> {
                            if (reply.isSecret() && !isAuthorized(reply, requestingUserId)) {
                                CommentDTO secretReply = new CommentDTO();
                                secretReply.setContent("비밀 대댓글입니다.");
                                secretReply.setUpdateAt(reply.getUpdateAt());
                                secretReply.setDeleteAt(reply.getDeleteAt());
                                secretReply.setCommentId(reply.getCommentId());
                                secretReply.setCreateAt(reply.getCreateAt());
                                secretReply.setSecret(reply.isSecret());
//                                secretReply.setBoardId(reply.getBoardId().getBoardId());
                                // secretReply.setParentId(reply.getParentId().getCommentId());
                                return secretReply;
                            } else {
                                return convertToDTO(reply);
                            }
                        })
                        .collect(Collectors.toList()));
                    secretComment.setBoardId(comment.getBoardId().getBoardId());
                    // secretComment.setParentId(comment.getParentId().getCommentId());

                    return secretComment;
                } else {
                    return convertToDTOWithReplies(comment);
                }
            })
            .filter(commentDTO -> commentDTO.getDeleteAt() == null)
            .collect(Collectors.toList());
    }







    @Override
    public List<CommentDTO> getAllRepliesByParentId(Long parentId) {
        List<Comment> replies = commentRepository.findByParentId_CommentId(parentId);
        return replies.stream()
            .map(comment -> {
                CommentDTO replyDTO = new CommentDTO();
                if (comment.isSecret()) {
                    // 비밀 댓글에 대한 처리
                    replyDTO.setContent("비밀 댓글입니다.");
                    replyDTO.setUpdateAt(comment.getUpdateAt());
                    replyDTO.setDeleteAt(comment.getDeleteAt());
                    replyDTO.setCommentId(comment.getCommentId());
                    replyDTO.setCreateAt(comment.getCreateAt());
                    replyDTO.setSecret(comment.isSecret());
                    replyDTO.setReplies(comment.getReplies().stream().map(this::convertToDTO).collect(Collectors.toList()));
                    replyDTO.setBoardId(comment.getBoardId().getBoardId());
                    // replyDTO.setParentId(comment.getParentId().getCommentId());
                } else {
                    replyDTO = convertToDTO(comment);
                }
                return replyDTO;
            })
            .filter(commentDTO -> commentDTO.getDeleteAt() == null)
            .collect(Collectors.toList());
    }



    private CommentDTO convertToDTO(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        BeanUtils.copyProperties(comment, commentDTO);
        return commentDTO;
    }

    private Comment convertToEntity(CommentDTO commentDTO) {
        Comment comment = new Comment();
        BeanUtils.copyProperties(commentDTO, comment);
        return comment;
    }

}
