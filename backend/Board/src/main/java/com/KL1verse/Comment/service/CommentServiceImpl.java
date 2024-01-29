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
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;

    public CommentServiceImpl(CommentRepository commentRepository,
        BoardRepository boardRepository) {
        this.commentRepository = commentRepository;
        this.boardRepository = boardRepository;
    }


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
            .orElseThrow(
                () -> new RuntimeException("Board not found with id: " + commentDTO.getBoardId()));
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
            .parentId(
                createdComment.getParentId() != null ? createdComment.getParentId().getCommentId()
                    : null)
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


    @Override
    public void deleteComment(Long commentId) {
        Comment existingComment = commentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));

        if (existingComment.getDeleteAt() != null) {
            throw new RuntimeException("Comment {} already deleted " + commentId);
        }

        // delete_at 필드를 현재 타임스탬프로 설정하여 소프트 삭제
        existingComment.setDeleteAt(LocalDateTime.now());
        commentRepository.save(existingComment);
        log.info("Comment {} is deleted : ", commentId);
    }


    @Override
    public CommentDTO createReply(Long parentCommentId, CommentDTO replyDTO) {
        Comment parentComment = commentRepository.findById(parentCommentId)
            .orElseThrow(
                () -> new RuntimeException("Parent Comment not found with id: " + parentCommentId));

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


    @Override
    public List<CommentDTO> getAllCommentsByBoardId(Long boardId, Long requestingUserId) {
        List<Comment> comments = commentRepository.findByBoardId_BoardId(boardId);

        return comments.stream()
            .filter(comment -> comment.getParentId() == null) // 부모 댓글만 가져옴
            .map(comment -> {
                if (comment.isSecret() && !isAuthorized(comment, requestingUserId)) {
                    // 댓글이 비밀이고 사용자가 권한이 없는 경우 적절한 메시지 표시
                    CommentDTO secretComment = new CommentDTO();
                    secretComment.setContent("비밀 댓글입니다.");
                    secretComment.setUpdateAt(comment.getUpdateAt());
                    secretComment.setDeleteAt(comment.getDeleteAt());
                    secretComment.setCommentId(comment.getCommentId());
                    secretComment.setCreateAt(comment.getCreateAt());
                    secretComment.setSecret(comment.isSecret());
                    secretComment.setReplies(Collections.emptyList()); // 비밀 댓글에 대한 답글 가져오기 불필요
                    secretComment.setBoardId(comment.getBoardId().getBoardId());
                    return secretComment;
                } else {
                    // 비밀이 아닌 댓글에 대해 재귀적으로 답글 가져오기
                    return convertToDTOWithReplies(comment, requestingUserId);
                }
            })
            .filter(commentDTO -> commentDTO.getDeleteAt() == null)
            .collect(Collectors.toList());
    }

    private CommentDTO convertToDTOWithReplies(Comment comment, Long requestingUserId) {
        CommentDTO commentDTO = convertToDTO(comment);
        List<CommentDTO> replyDTOs = comment.getReplies().stream()
            .map(reply -> {
                if (reply.isSecret() && !isAuthorized(reply, requestingUserId)) {
                    // 답글이 비밀이고 사용자가 권한이 없는 경우 적절한 메시지 표시
                    CommentDTO secretReply = new CommentDTO();
                    secretReply.setContent("비밀 대댓글입니다.");
                    secretReply.setUpdateAt(reply.getUpdateAt());
                    secretReply.setDeleteAt(reply.getDeleteAt());
                    secretReply.setCommentId(reply.getCommentId());
                    secretReply.setCreateAt(reply.getCreateAt());
                    secretReply.setParentId(reply.getParentId().getCommentId());
                    secretReply.setSecret(reply.isSecret());
                    secretReply.setReplies(Collections.emptyList()); // 비밀 대댓글에 대한 답글 가져오기 불필요
                    secretReply.setBoardId(reply.getBoardId().getBoardId());
                    return secretReply;
                } else {
                    // 비밀이 아닌 답글에 대해 재귀적으로 답글 가져오기
                    return convertToDTOWithReplies(reply, requestingUserId);
                }
            })
            .collect(Collectors.toList());
        commentDTO.setReplies(replyDTOs);
        return commentDTO;
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
                    replyDTO.setReplies(comment.getReplies().stream().map(this::convertToDTO)
                        .collect(Collectors.toList()));
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
        commentDTO.setBoardId(comment.getBoardId().getBoardId());
        commentDTO.setUserId(comment.getUserId());
        commentDTO.setParentId(
            comment.getParentId() != null ? comment.getParentId().getCommentId() : null);
        commentDTO.setReplies(
            comment.getReplies().stream().map(this::convertToDTO).collect(Collectors.toList()));

        return commentDTO;
    }

    private Comment convertToEntity(CommentDTO commentDTO) {
        Comment comment = new Comment();
        BeanUtils.copyProperties(commentDTO, comment);
        comment.setParentId(
            commentDTO.getParentId() != null ? commentRepository.findById(commentDTO.getParentId())
                .orElseThrow(() -> new RuntimeException(
                    "Parent Comment not found with id: " + commentDTO.getParentId())) : null);
        return comment;
    }

}
