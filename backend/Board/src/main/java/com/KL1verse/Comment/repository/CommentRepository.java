package com.KL1verse.Comment.repository;

import com.KL1verse.Comment.repository.entity.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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
}
