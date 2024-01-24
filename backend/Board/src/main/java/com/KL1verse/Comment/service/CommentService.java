package com.KL1verse.Comment.service;


import com.KL1verse.Comment.dto.req.CommentDTO;
import java.util.List;

public interface CommentService {
    CommentDTO getCommentById(Long commentId);

    CommentDTO createComment(CommentDTO commentDTO);

    CommentDTO updateComment(Long commentId, CommentDTO commentDTO);

    void deleteComment(Long commentId);

    List<CommentDTO> getAllCommentsByBoardId(Long boardId);

    List<CommentDTO> getAllRepliesByParentId(Long parentId);

    CommentDTO createReply(Long parentCommentId, CommentDTO replyDTO);

}

