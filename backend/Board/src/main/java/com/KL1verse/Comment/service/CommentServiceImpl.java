package com.KL1verse.Comment.service;


import com.KL1verse.Board.repository.BoardRepository;
import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Comment.dto.req.CommentDTO;
import com.KL1verse.Comment.repository.CommentLikeRepository;
import com.KL1verse.Comment.repository.CommentRepository;
import com.KL1verse.Comment.repository.entity.Comment;
import com.KL1verse.kafka.dto.res.BoardNotificationResDto;
import com.KL1verse.kafka.dto.res.BoardNotificationResDto.BoardNotificationType;
import com.KL1verse.kafka.producer.KafkaBoardNotificationProducer;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final KafkaBoardNotificationProducer kafkaBoardNotificationProducer;
    private final CommentLikeRepository commentLikeRepository;

    @Value("${domain}")
    private String domain;

    @Override
    public CommentDTO getCommentById(Long commentId, Long requestingUserId, Integer commentParentUserId) {
        Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));

        if (comment.getIsSecret() && !isAuthorized(comment, requestingUserId, commentParentUserId)) {

            return null;
        }

        return convertToDTO(comment);
    }


    private boolean isAuthorized(Comment comment, Long requestingUserId, Integer commentParentUserId) {

        int boardUserId = comment.getBoardId().getUserId();
        Long commentUserId = Long.valueOf(comment.getUserId());

        return requestingUserId.equals(commentUserId) ||
            (requestingUserId.intValue() == boardUserId) ||
            (requestingUserId.intValue() == commentParentUserId) ;

    }


    @Override
    public CommentDTO createComment(CommentDTO commentDTO) {

        log.info("commentDto isSecret = {}", commentDTO.getIsSecret());
        Comment comment = convertToEntity(commentDTO);
        log.info("isSecret = {}", comment.getIsSecret());

        Board board = boardRepository.findById(commentDTO.getBoardId())
            .orElseThrow(
                () -> new RuntimeException("Board not found with id: " + commentDTO.getBoardId()));
        comment.setBoardId(board);

        Comment createdComment = commentRepository.save(comment);

//        List<Object[]> userNickname = commentRepository.findUserNickname(commentDTO.getUserId());
//        commentDTO.setNickname((String) userNickname.get(0)[0]);
        List<Object[]> user = commentRepository.findUserNicknameAndProfile(commentDTO.getUserId());
        String userNickname = (String) user.get(0)[0];
        String userProfile = (String) user.get(0)[1];
        commentDTO.setNickname(userNickname);

        if(!board.getUserId().equals(commentDTO.getUserId())) {
            kafkaBoardNotificationProducer.boardNotification(
                    BoardNotificationResDto.builder()
                            .type(BoardNotificationType.COMMENT)
                            .userId(board.getUserId())
                            .profile(userProfile)
                            .nickname(userNickname)
                            .uri("/" + board.getBoardType().toString().toLowerCase() + "/" + String.valueOf(board.getBoardId()))
                            .message("님이 새로운 댓글을 달았습니다.")
                            .build()
            );
        }

        return CommentDTO.builder()
            .commentId(createdComment.getCommentId())
            .content(createdComment.getContent())
            .createAt(createdComment.getCreateAt())
            .updateAt(createdComment.getUpdateAt())
            .deleteAt(createdComment.getDeleteAt())
            .boardId(createdComment.getBoardId().getBoardId())
            .userId(createdComment.getUserId())
            .isSecret(createdComment.getIsSecret())
            .nickname(commentDTO.getNickname())
            .likesCount(0)
            .parentId(
                createdComment.getParentId() != null ? createdComment.getParentId().getCommentId()
                    : null)
            .build();
    }

    @Override
    public CommentDTO updateComment(Long commentId, CommentDTO commentDTO) {
        Comment existingComment = commentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));

        existingComment.setContent(commentDTO.getContent());

        Comment updatedComment = commentRepository.save(existingComment);
        return convertToDTO(updatedComment);
    }


    @Override
    public void deleteComment(Long commentId) {
        Comment existingComment = commentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));

        if (existingComment.getDeleteAt() != null) {
            throw new RuntimeException("Comment {} already deleted " + commentId);
        }

        existingComment.setDeleteAt(LocalDateTime.now());

        if(existingComment.getReplies().size() > 0) {
            for(int i=0; i<existingComment.getReplies().size(); i++) {
                existingComment.getReplies().get(i).setDeleteAt(LocalDateTime.now());
            }
        }

        commentRepository.save(existingComment);
        log.info("Comment {} is deleted : ", commentId);
    }


    @Override
    public CommentDTO createReply(Long parentCommentId, CommentDTO replyDTO) {
        Comment parentComment = commentRepository.findById(parentCommentId)
            .orElseThrow(
                () -> new RuntimeException("Parent Comment not found with id: " + parentCommentId));

        Comment reply = convertToEntity(replyDTO);
        reply.setParentId(parentComment);

        reply.setBoardId(parentComment.getBoardId());

        Comment createdReply = commentRepository.save(reply);

        List<Object[]> userInfo = commentRepository.findUserNicknameAndProfile(replyDTO.getUserId());
        String userNickname = (String) userInfo.get(0)[0];
        String userProfile = (String) userInfo.get(0)[1];

        if(!parentComment.getUserId().equals(replyDTO.getUserId())) {
            kafkaBoardNotificationProducer.boardNotification(
                BoardNotificationResDto.builder()
                    .type(BoardNotificationType.COMMENT)
                    .userId(parentComment.getUserId())
                    .profile(userProfile)
                    .nickname(userNickname)
                    .uri("/" + parentComment.getBoardId().getBoardType().toString().toLowerCase() + "/" + String.valueOf(parentComment.getBoardId().getBoardId()))
                    .message("님이 새로운 대댓글을 달았습니다.")
                    .build()
            );
        }

        return CommentDTO.builder()
            .commentId(createdReply.getCommentId())
            .content(createdReply.getContent())
            .parentId(createdReply.getParentId().getCommentId())
            .updateAt(createdReply.getUpdateAt())
            .deleteAt(createdReply.getDeleteAt())
            .createAt(createdReply.getCreateAt())
            .userId(createdReply.getUserId())
            .nickname(replyDTO.getNickname())
            .isSecret(createdReply.getIsSecret())
            .boardId(createdReply.getBoardId().getBoardId())
            .likesCount(0)
            .build();
    }

    @Override
    public List<CommentDTO> getAllCommentsByBoardId(Long boardId, Long requestingUserId) {
        List<Object[]> commentsWithLikesCount = commentRepository.findCommentsWithLikesCountByBoardId(
            boardId);
        return commentsWithLikesCount.stream()
            .map(result -> {
                Comment comment = (Comment) result[0];
                Long likesCount = (Long) result[1];

                CommentDTO commentDTO = convertToDTO(comment);

                Integer commentLikesCount = commentRepository.findLikesCountByCommentId(
                    comment.getCommentId());

                commentDTO.setLikesCount(commentLikesCount != null ? commentLikesCount : 0);

                List<Object[]> userInfo = commentRepository.findUserNicknameAndProfileAndMainBadge(
                    comment.getUserId());
                String userNickname = (String) userInfo.get(0)[0];
                String userProfile = (String) userInfo.get(0)[1];
                String mainBadge = (String) userInfo.get(0)[2];

                commentDTO.setNickname(userNickname);
                commentDTO.setProfile(userProfile);
                if(mainBadge != null) {
                    commentDTO.setMainBadge(mainBadge);
                }


                boolean isLiked = commentLikeRepository.findByUserIdAndCommentId_CommentId(requestingUserId, comment.getCommentId()).isPresent();
                commentDTO.setLiked(isLiked);

                if (comment.getParentId() == null) {

                    if (comment.getIsSecret() && !isAuthorized(comment, requestingUserId, comment.getUserId())) {

                        log.info("~!@~!@~!~!!~@~! 비밀댓글");
                        CommentDTO secretComment = new CommentDTO();
                        secretComment.setContent("비밀 댓글입니다.");
                        secretComment.setUpdateAt(comment.getUpdateAt());
                        secretComment.setDeleteAt(comment.getDeleteAt());
                        secretComment.setCommentId(comment.getCommentId());
                        secretComment.setCreateAt(comment.getCreateAt());
                        secretComment.setIsSecret(comment.getIsSecret());
                        secretComment.setLiked(isLiked);

                        List<CommentDTO> secretReplies = comment.getReplies().stream()
                            .filter(reply->reply.getDeleteAt() == null)
                            .map(reply -> {
                                if (reply.getIsSecret() && !isAuthorized(reply, requestingUserId, comment.getUserId())) {

                                    CommentDTO secretReply = new CommentDTO();
                                    secretReply.setContent("비밀 대댓글입니다.");
                                    secretReply.setParentCommentUserId(comment.getUserId());
                                    secretReply.setUpdateAt(reply.getUpdateAt());
                                    secretReply.setDeleteAt(reply.getDeleteAt());
                                    secretReply.setCommentId(reply.getCommentId());
                                    secretReply.setCreateAt(reply.getCreateAt());
                                    secretReply.setParentId(reply.getParentId().getCommentId());
                                    secretReply.setIsSecret(reply.getIsSecret());
                                    secretReply.setReplies(Collections.emptyList());
                                    secretReply.setBoardId(reply.getBoardId().getBoardId());
                                    secretReply.setLiked(isLiked);

                                    Integer secretReplyLikesCount = commentRepository.findLikesCountByCommentId(
                                        reply.getCommentId());
                                    secretReply.setLikesCount(
                                        secretReplyLikesCount != null ? secretReplyLikesCount : 0);

                                    return secretReply;
                                } else {
                                    CommentDTO normalReply = convertToDTOWithReplies(reply,
                                        requestingUserId);

                                    List<Object[]> replyUserInfo = commentRepository.findUserNicknameAndProfileAndMainBadge(
                                            reply.getUserId());
                                    String replyUserNickname = (String) replyUserInfo.get(0)[0];
                                    String replyUserProfile = (String) replyUserInfo.get(0)[1];
                                    String replyUsermainBadge = (String) replyUserInfo.get(0)[2];

                                    normalReply.setNickname(replyUserNickname);
                                    normalReply.setProfile(replyUserProfile);
                                    if(replyUsermainBadge != null) {
                                        normalReply.setMainBadge(replyUsermainBadge);
                                    }


                                    normalReply.setLiked(isLiked);
                                    return normalReply;
                                }
                            })
                            .collect(Collectors.toList());
                        secretComment.setReplies(secretReplies);

                        secretComment.setBoardId(comment.getBoardId().getBoardId());
                        secretComment.setLikesCount(likesCount.intValue());
                        secretComment.setLiked(isLiked);
                        return secretComment;
                    } else {

                        List<CommentDTO> replies = comment.getReplies().stream()
                            .filter(reply -> reply.getDeleteAt() == null)
                            .map(reply -> {
                                if (reply.getIsSecret() && !isAuthorized(reply, requestingUserId, comment.getUserId())) {

                                    CommentDTO secretReply = new CommentDTO();
                                    secretReply.setContent("비밀 대댓글입니다.");
                                    secretReply.setParentCommentUserId(comment.getUserId());
                                    secretReply.setUpdateAt(reply.getUpdateAt());
                                    secretReply.setDeleteAt(reply.getDeleteAt());
                                    secretReply.setCommentId(reply.getCommentId());
                                    secretReply.setCreateAt(reply.getCreateAt());
                                    secretReply.setParentId(reply.getParentId().getCommentId());
                                    secretReply.setIsSecret(reply.getIsSecret());
                                    secretReply.setReplies(Collections.emptyList());
                                    secretReply.setBoardId(reply.getBoardId().getBoardId());
                                    secretReply.setLiked(isLiked);

                                    Integer secretReplyLikesCount = commentRepository.findLikesCountByCommentId(
                                        reply.getCommentId());
                                    secretReply.setLikesCount(
                                        secretReplyLikesCount != null ? secretReplyLikesCount : 0);

                                    List<Object[]> secretReplyNickname = commentRepository.findUserNickname(
                                        reply.getUserId());
                                    secretReply.setNickname(
                                        (String) secretReplyNickname.get(0)[0]); // Set the nickname

                                    return secretReply;
                                } else {

                                    CommentDTO normalReply = convertToDTOWithReplies(reply,
                                        requestingUserId);

                                    List<Object[]> replyUserInfo = commentRepository.findUserNicknameAndProfileAndMainBadge(
                                            reply.getUserId());
                                    String replyUserNickname = (String) replyUserInfo.get(0)[0];
                                    String replyUserProfile = (String) replyUserInfo.get(0)[1];
                                    String replyUsermainBadge = (String) replyUserInfo.get(0)[2];

                                    normalReply.setParentCommentUserId(comment.getUserId());
                                    normalReply.setNickname(replyUserNickname);
                                    normalReply.setProfile(replyUserProfile);
                                    if(replyUsermainBadge != null) {
                                        normalReply.setMainBadge(replyUsermainBadge);
                                    }

                                    boolean replyIsLiked = commentLikeRepository.findByUserIdAndCommentId_CommentId(requestingUserId, reply.getCommentId()).isPresent();

                                    normalReply.setLiked(replyIsLiked);
                                    return normalReply;
                                }
                            })
                            .collect(Collectors.toList());

                        commentDTO.setReplies(replies);
//                        commentDTO.setNickname((String) userNickname.get(0)[0]);
                        commentDTO.setLiked(isLiked);
                        return commentDTO;
                    }
                } else {

                    return null;
                }
            })
            .filter(Objects::nonNull)
            .filter(commentDTO -> commentDTO.getDeleteAt() == null)
            .collect(Collectors.toList());
    }

    private CommentDTO convertToDTOWithReplies(Comment comment, Long requestingUserId) {
        CommentDTO commentDTO = convertToDTO(comment);
        List<CommentDTO> replyDTOs = comment.getReplies().stream()
            .map(reply -> {
                if (reply.getIsSecret() && !isAuthorized(reply, requestingUserId, comment.getUserId())) {

                    CommentDTO secretReply = new CommentDTO();
                    secretReply.setContent("비밀 대댓글입니다.");
                    secretReply.setParentCommentUserId(comment.getUserId());
                    secretReply.setUpdateAt(reply.getUpdateAt());
                    secretReply.setDeleteAt(reply.getDeleteAt());
                    secretReply.setCommentId(reply.getCommentId());
                    secretReply.setCreateAt(reply.getCreateAt());
                    secretReply.setParentId(reply.getParentId().getCommentId());
                    secretReply.setIsSecret(reply.getIsSecret());
                    secretReply.setReplies(Collections.emptyList());
                    secretReply.setBoardId(reply.getBoardId().getBoardId());

                    Integer secretReplyLikesCount = commentRepository.findLikesCountByCommentId(
                        reply.getCommentId());
                    secretReply.setLikesCount(
                        secretReplyLikesCount != null ? secretReplyLikesCount : 0);

                    return secretReply;
                } else {

                    return convertToDTOWithReplies(reply, requestingUserId);
                }
            })
            .collect(Collectors.toList());
        commentDTO.setReplies(replyDTOs);

        return commentDTO;
    }


    @Override
    public List<CommentDTO> getAllRepliesByParentId(Long parentId) {
        List<Comment> replies = commentRepository.findByParentId_CommentId(parentId);
        return replies.stream()
            .map(comment -> {
                CommentDTO replyDTO = new CommentDTO();
                if (comment.getIsSecret()) {

                    replyDTO.setContent("비밀 댓글입니다.");
                    replyDTO.setUpdateAt(comment.getUpdateAt());
                    replyDTO.setDeleteAt(comment.getDeleteAt());
                    replyDTO.setCommentId(comment.getCommentId());
                    replyDTO.setCreateAt(comment.getCreateAt());
                    replyDTO.setIsSecret(comment.getIsSecret());
                    replyDTO.setReplies(comment.getReplies().stream().map(this::convertToDTO)
                        .collect(Collectors.toList()));
                    replyDTO.setBoardId(comment.getBoardId().getBoardId());

                } else {

                    replyDTO = convertToDTO(comment);
                    List<Object[]> secretReplyNickname = commentRepository.findUserNickname(replyDTO.getUserId());
                    replyDTO.setNickname((String) secretReplyNickname.get(0)[0]);
                }
                return replyDTO;
            })
            .filter(commentDTO -> commentDTO.getDeleteAt() == null)
            .collect(Collectors.toList());
    }


    private CommentDTO convertToDTO(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        BeanUtils.copyProperties(comment, commentDTO);
        commentDTO.setBoardId(comment.getBoardId().getBoardId());
        commentDTO.setUserId(comment.getUserId());

        Integer likesCount = commentRepository.findLikesCountByCommentId(comment.getCommentId());
        commentDTO.setLikesCount(likesCount);

        commentDTO.setParentId(
            comment.getParentId() != null ? comment.getParentId().getCommentId() : null);
        commentDTO.setReplies(
            comment.getReplies().stream().map(this::convertToDTO).collect(Collectors.toList()));

        return commentDTO;
    }


    private Comment convertToEntity(CommentDTO commentDTO) {
        Comment comment = new Comment();
        BeanUtils.copyProperties(commentDTO, comment);
        comment.setParentId(
            commentDTO.getParentId() != null ? commentRepository.findById(commentDTO.getParentId())
                .orElseThrow(() -> new RuntimeException(
                    "Parent Comment not found with id: " + commentDTO.getParentId())) : null);
        return comment;
    }

}
