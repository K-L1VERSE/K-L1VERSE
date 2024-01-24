package com.KL1verse.Waggle.service;

public interface WaggleLikeService {

  void likeWaggle(Long waggleId, Long userId);

  void unlikeWaggle(Long waggleId, Long userId);
}