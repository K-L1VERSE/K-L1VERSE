package com.KL1verse.Comment.service;


import com.KL1verse.Comment.dto.req.CommentLikeDTO;

public interface CommentLikeService {

    CommentLikeDTO likeComment(Long userId, Long commentId);

    void unlikeComment(Long userId, Long commentId);

}

