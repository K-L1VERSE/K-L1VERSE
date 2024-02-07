package com.KL1verse.Comment.repository;

import com.KL1verse.Comment.repository.entity.CommentLike;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {

    Optional<CommentLike> findByUserIdAndCommentId_CommentId(Long userId, Long commentId);


}
