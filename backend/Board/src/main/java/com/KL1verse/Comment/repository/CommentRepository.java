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

    @Query("SELECT COUNT(c) FROM comment c WHERE c.boardId.boardId = :boardId AND c.deleteAt IS NULL")
    Integer countCommentsByBoardId(Long boardId);

    @Query(value = "SELECT u.nickname FROM user u JOIN comment c ON c.user_id = u.user_id WHERE c.user_id = :userId", nativeQuery = true)
    List<Object[]> findUserNickname(@Param("userId") Integer userId);

    @Query(value = "SELECT nickname, profile FROM user WHERE user_id = :userId", nativeQuery = true)
    List<Object[]> findUserNicknameAndProfile(@Param("userId") Integer userId);

    @Query(value = "SELECT u.nickname, u.profile, bd.code FROM user u JOIN badge b ON u.badge_id = b.badge_id JOIN badge_detail bd ON b.badge_detail_id = bd.badge_detail_id WHERE u.user_id = :userId", nativeQuery = true)
    List<Object[]> findUserNicknameAndProfileAndMainBadge(@Param("userId") Integer userId);
}
