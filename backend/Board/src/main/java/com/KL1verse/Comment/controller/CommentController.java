package com.KL1verse.Comment.controller;

import com.KL1verse.Comment.dto.req.CommentDTO;
import com.KL1verse.Comment.dto.req.CommentLikeDTO;
import com.KL1verse.Comment.service.CommentLikeService;
import com.KL1verse.Comment.service.CommentService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;
    private final CommentLikeService commentLikeService;

    public CommentController(CommentService commentService, CommentLikeService commentLikeService) {
        this.commentService = commentService;
        this.commentLikeService = commentLikeService;
    }

    // Get Comment by ID
    @GetMapping("/{commentId}")
    public ResponseEntity<CommentDTO> getCommentById(@PathVariable Long commentId) {
        CommentDTO comment = commentService.getCommentById(commentId);
        return ResponseEntity.ok(comment);
    }

    @PostMapping("/{boardId}")
    public ResponseEntity<CommentDTO> createComment(@PathVariable Long boardId, @RequestBody CommentDTO commentDTO) {
        commentDTO.setBoardId(boardId);

        CommentDTO createdComment = commentService.createComment(commentDTO);
        return ResponseEntity.ok(createdComment);
    }

    // Update Comment by ID
    @PutMapping("/{commentId}")
    public ResponseEntity<CommentDTO> updateComment(@PathVariable Long commentId,
        @RequestBody CommentDTO commentDTO) {
        CommentDTO updatedComment = commentService.updateComment(commentId, commentDTO);
        return ResponseEntity.ok(updatedComment);
    }

    // Delete Comment by ID
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/list/{boardId}")
    public ResponseEntity<List<CommentDTO>> getAllCommentsByBoardId(@PathVariable Long boardId) {
        List<CommentDTO> comments = commentService.getAllCommentsByBoardId(boardId)
            .stream()
            .filter(comment -> comment.getDeleteAt() == null) // delete_at이 비어 있으면 포함
            .collect(Collectors.toList());

        return ResponseEntity.ok(comments);
    }


    // Create Reply for a Comment
    @PostMapping("/{parentCommentId}/replies")
    public ResponseEntity<CommentDTO> createReply(@PathVariable Long parentCommentId,
        @RequestBody CommentDTO replyDTO) {
        CommentDTO createdReply = commentService.createReply(parentCommentId, replyDTO);
        return ResponseEntity.ok(createdReply);
    }



    // Get Replies for a Comment
    @GetMapping("/{parentCommentId}/replies")
    public ResponseEntity<List<CommentDTO>> getRepliesByParentId(@PathVariable Long parentCommentId) {
        List<CommentDTO> replies = commentService.getAllRepliesByParentId(parentCommentId);
        return ResponseEntity.ok(replies);
    }



    // 댓글 좋아요
    @PostMapping("/like/{commentId}")
    public ResponseEntity<CommentLikeDTO> likeComment(@PathVariable Long commentId, @RequestBody CommentLikeDTO likeDTO) {
        CommentLikeDTO likedComment = commentLikeService.likeComment(likeDTO.getUserId(), commentId);
        return ResponseEntity.ok(likedComment);
    }

    // 댓글 좋아요 취소
    @DeleteMapping("/like/{commentId}")
    public ResponseEntity<Void> unlikeComment(@PathVariable Long commentId, @RequestBody CommentLikeDTO likeDTO) {
        commentLikeService.unlikeComment(likeDTO.getUserId(), commentId);
        return ResponseEntity.noContent().build();
    }

}