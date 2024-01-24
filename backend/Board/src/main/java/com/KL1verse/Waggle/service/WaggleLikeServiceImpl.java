package com.KL1verse.Waggle.service;

import com.KL1verse.Waggle.repository.WaggleLikeRepository;
import com.KL1verse.Waggle.repository.entity.Waggle;
import com.KL1verse.Waggle.repository.entity.WaggleLike;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class WaggleLikeServiceImpl implements WaggleLikeService {

  private final WaggleLikeRepository waggleLikeRepository;

  public WaggleLikeServiceImpl(WaggleLikeRepository waggleLikeRepository) {
    this.waggleLikeRepository = waggleLikeRepository;
  }

  @Override
  public void likeWaggle(Long waggleId, Long userId) {

    WaggleLike waggleLike = WaggleLike.builder()
        .userId(userId)
        .waggleId(Waggle.builder().waggleId(waggleId).build())
        .build();

    waggleLikeRepository.save(waggleLike);
  }


  @Override
  @Transactional
  public void unlikeWaggle(Long waggleId, Long userId) {
    Waggle waggle = Waggle.builder().waggleId(waggleId).build();
    waggleLikeRepository.deleteByWaggleIdAndUserId(waggle, userId);
  }
}
