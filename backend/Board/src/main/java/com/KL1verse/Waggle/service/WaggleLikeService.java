package com.KL1verse.Waggle.service;

import com.KL1verse.Waggle.dto.req.WaggleLikeDTO;

public interface WaggleLikeService {

    WaggleLikeDTO likeWaggle(Long waggleId, Integer userId);

    void unlikeWaggle(Long waggleId, Integer userId);
}