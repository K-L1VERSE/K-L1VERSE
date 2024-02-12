package com.KL1verse.Comment.service;

import com.KL1verse.Comment.dto.req.CommentLikeDTO;
import com.KL1verse.Comment.repository.CommentLikeRepository;
import com.KL1verse.Comment.repository.CommentRepository;
import com.KL1verse.Comment.repository.entity.Comment;
import com.KL1verse.Comment.repository.entity.CommentLike;

import java.util.List;
import java.util.Optional;

import com.KL1verse.kafka.dto.res.BoardNotificationResDto;
import com.KL1verse.kafka.producer.KafkaBoardNotificationProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentLikeServiceImpl implements CommentLikeService {

    private final CommentLikeRepository commentLikeRepository;
    private final CommentRepository commentRepository;
    private final KafkaBoardNotificationProducer kafkaBoardNotificationProducer;

    @Override
    public CommentLikeDTO likeComment(Long userId, Long commentId) {
        Optional<CommentLike> existingLike = commentLikeRepository.findByUserIdAndCommentId_CommentId(
            userId, commentId);
        if (existingLike.isPresent()) {
            CommentLike like = existingLike.get();
            return new CommentLikeDTO(like.getCommentLikeId(), like.getUserId(),
                like.getCommentId().getCommentId());
        }

        CommentLike newLike = CommentLike.builder()
            .userId(userId)
            .commentId(Comment.builder().commentId(commentId).build()).build();

        CommentLike savedLike = commentLikeRepository.save(newLike);

        List<Object[]> userInfo = commentRepository.findUserNicknameAndProfile(Integer.parseInt(userId.toString()));
        String userNickname = (String) userInfo.get(0)[0];
        String userProfile = (String) userInfo.get(0)[1];

        Comment comment = commentRepository.findById(commentId).orElseThrow();

        if(Integer.parseInt(userId.toString()) != comment.getUserId()) {
            kafkaBoardNotificationProducer.boardNotification(
                    BoardNotificationResDto.builder()
                            .type(BoardNotificationResDto.BoardNotificationType.LIKE)
                            .userId(comment.getUserId())
                            .profile(userProfile)
                            .nickname(userNickname)
                            .uri("/" + comment.getBoardId().getBoardType().toString().toLowerCase() + "/" + String.valueOf(comment.getBoardId().getBoardId()))
                            .message("님이 댓글 좋아요를 누르셨습니다.")
                            .build()
            );
        }

        return new CommentLikeDTO(savedLike.getCommentLikeId(), savedLike.getUserId(),
            savedLike.getCommentId().getCommentId());
    }

    @Override
    public void unlikeComment(Long userId, Long commentId) {
        Optional<CommentLike> existingLike = commentLikeRepository.findByUserIdAndCommentId_CommentId(
            userId, commentId);
        existingLike.ifPresent(like -> commentLikeRepository.delete(like));
    }

}
