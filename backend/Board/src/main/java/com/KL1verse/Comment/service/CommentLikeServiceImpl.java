package com.KL1verse.Comment.service;

import com.KL1verse.Comment.dto.req.CommentLikeDTO;
import com.KL1verse.Comment.repository.CommentLikeRepository;
import com.KL1verse.Comment.repository.entity.Comment;
import com.KL1verse.Comment.repository.entity.CommentLike;
import com.KL1verse.Comment.service.CommentLikeService;

import com.KL1verse.Waggle.repository.entity.Waggle;
import com.KL1verse.Waggle.repository.entity.WaggleLike;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class CommentLikeServiceImpl implements CommentLikeService {

    private final CommentLikeRepository commentLikeRepository;

    public CommentLikeServiceImpl(CommentLikeRepository commentLikeRepository) {
        this.commentLikeRepository = commentLikeRepository;
    }

    @Override
    public CommentLikeDTO likeComment(Long userId, Long commentId) {
        Optional<CommentLike> existingLike = commentLikeRepository.findByUserIdAndCommentId_CommentId(userId, commentId);
        if (existingLike.isPresent()) {
            CommentLike like = existingLike.get();
            return new CommentLikeDTO(like.getCommentLikeId(), like.getUserId(), like.getCommentId().getCommentId());
        }


        CommentLike newLike = CommentLike.builder()
            .userId(userId)
            .commentId(Comment.builder().commentId(commentId).build()).build();


        CommentLike savedLike = commentLikeRepository.save(newLike);
        return new CommentLikeDTO(savedLike.getCommentLikeId(), savedLike.getUserId(), savedLike.getCommentId().getCommentId());
    }

    @Override
    public void unlikeComment(Long userId, Long commentId) {
        Optional<CommentLike> existingLike = commentLikeRepository.findByUserIdAndCommentId_CommentId(userId, commentId);
        existingLike.ifPresent(like -> commentLikeRepository.delete(like));
    }

}
