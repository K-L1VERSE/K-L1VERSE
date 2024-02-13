package com.KL1verse.Comment.repository;

import com.KL1verse.Comment.repository.entity.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByBoardId_BoardId(Long boardId);

    List<Comment> findByParentId_CommentId(Long parentId);

    @Query("SELECT c, COUNT(cl) AS likesCount " +
        "FROM comment c " +
        "LEFT JOIN Waggle_colikes cl ON c.commentId = cl.commentId.commentId " +
        "WHERE c.boardId.boardId = :boardId " +
        "GROUP BY c.commentId")
    List<Object[]> findCommentsWithLikesCountByBoardId(Long boardId);

    @Query("SELECT COUNT(cl) FROM Waggle_colikes cl WHERE cl.commentId.commentId = :commentId")
    Integer findLikesCountByCommentId(Long commentId);

    @Query(value = "SELECT COUNT(c.comment_id) FROM comment c WHERE c.board_id = :boardId AND c.delete_at IS NULL", nativeQuery = true)
    Integer countCommentsByBoardId(Long boardId);

    @Query(value = "SELECT u.nickname FROM user u JOIN comment c ON c.user_id = u.user_id WHERE c.user_id = :userId", nativeQuery = true)
    List<Object[]> findUserNickname(@Param("userId") Integer userId);

    @Query(value = "SELECT nickname, profile FROM user WHERE user_id = :userId", nativeQuery = true)
    List<Object[]> findUserNicknameAndProfile(@Param("userId") Integer userId);

    @Query(value = "SELECT u.nickname, u.profile, CASE WHEN u.badge_id IS NOT NULL THEN bd.code ELSE NULL END AS code FROM user u LEFT JOIN badge b ON u.badge_id = b.badge_id LEFT JOIN badge_detail bd ON b.badge_detail_id = bd.badge_detail_id WHERE u.user_id = :userId", nativeQuery = true)
    List<Object[]> findUserNicknameAndProfileAndMainBadge(@Param("userId") Integer userId);

    @Query(value = "SELECT u.profile, CASE WHEN u.badge_id IS NOT NULL THEN bd.code ELSE NULL END AS code FROM user u LEFT JOIN badge b ON u.badge_id = b.badge_id LEFT JOIN badge_detail bd ON b.badge_detail_id = bd.badge_detail_id WHERE u.user_id = :userId", nativeQuery = true)
    List<Object[]> findUserProfileAndMainBadge(@Param("userId") Integer userId);
}
