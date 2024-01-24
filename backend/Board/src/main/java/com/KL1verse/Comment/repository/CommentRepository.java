package com.KL1verse.Comment.repository;

import com.KL1verse.Comment.dto.req.CommentDTO;
import com.KL1verse.Comment.repository.entity.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBoardId_BoardId(Long boardId);
    List<Comment> findByParentId_CommentId(Long parentId);
}
