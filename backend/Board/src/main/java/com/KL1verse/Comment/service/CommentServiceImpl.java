package com.KL1verse.Comment.service;



import com.KL1verse.Board.repository.BoardRepository;
import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Comment.dto.req.CommentDTO;
import com.KL1verse.Comment.repository.CommentRepository;
import com.KL1verse.Comment.repository.entity.Comment;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;

    public CommentServiceImpl(CommentRepository commentRepository, BoardRepository boardRepository) {
        this.commentRepository = commentRepository;
        this.boardRepository = boardRepository;
    }

    @Override
    public CommentDTO getCommentById(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));

        return convertToDTO(comment);
    }

    @Override
    public CommentDTO createComment(CommentDTO commentDTO) {


        Comment comment = convertToEntity(commentDTO);

        Board board = boardRepository.findById(commentDTO.getBoardId())
            .orElseThrow(() -> new RuntimeException("Board not found with id: " + commentDTO.getBoardId()));
        comment.setBoardId(board);

        Comment createdComment = commentRepository.save(comment);
        return CommentDTO.builder()
            .commentId(createdComment.getCommentId())
            .content(createdComment.getContent())
            .boardId(createdComment.getBoardId().getBoardId())
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
        commentRepository.deleteById(commentId);
    }

    @Override
    public List<CommentDTO> getAllCommentsByBoardId(Long boardId) {
        List<Comment> comments = commentRepository.findByBoardId_BoardId(boardId);
        return comments.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public CommentDTO createReply(Long parentCommentId, CommentDTO replyDTO) {
        Comment parentComment = commentRepository.findById(parentCommentId)
            .orElseThrow(() -> new RuntimeException("Parent Comment not found with id: " + parentCommentId));

        Comment reply = convertToEntity(replyDTO);
        reply.setParentId(parentComment);

        Comment createdReply = commentRepository.save(reply);
        return convertToDTO(createdReply);
    }

    @Override
    public List<CommentDTO> getAllRepliesByParentId(Long parentId) {
        List<Comment> replies = commentRepository.findByParentId_CommentId(parentId);
        return replies.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private CommentDTO convertToDTO(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        BeanUtils.copyProperties(comment, commentDTO);
        return commentDTO;
    }

    private Comment convertToEntity(CommentDTO commentDTO) {
        Comment comment = new Comment();
        BeanUtils.copyProperties(commentDTO, comment);
        return comment;
    }

}
