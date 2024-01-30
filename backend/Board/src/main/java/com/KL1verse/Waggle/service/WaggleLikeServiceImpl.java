package com.KL1verse.Waggle.service;

import com.KL1verse.Waggle.dto.req.WaggleLikeDTO;
import com.KL1verse.Waggle.repository.WaggleLikeRepository;
import com.KL1verse.Waggle.repository.entity.Waggle;
import com.KL1verse.Waggle.repository.entity.WaggleLike;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class WaggleLikeServiceImpl implements WaggleLikeService {

    private final WaggleLikeRepository waggleLikeRepository;

    public WaggleLikeServiceImpl(WaggleLikeRepository waggleLikeRepository) {
        this.waggleLikeRepository = waggleLikeRepository;
    }

    @Override
    public WaggleLikeDTO likeWaggle(Long waggleId, Long userId) {
        Optional<WaggleLike> existingLike = waggleLikeRepository.findByUserIdAndWaggleId_WaggleId(
            userId, waggleId);
        if (existingLike.isPresent()) {

            WaggleLike like = existingLike.get();
            return new WaggleLikeDTO(like.getLikesId(), like.getUserId(),
                like.getWaggleId().getWaggleId());
        }

        WaggleLike waggleLike = WaggleLike.builder()
            .userId(userId)
            .waggleId(Waggle.builder().waggleId(waggleId).build())
            .build();

        waggleLikeRepository.save(waggleLike);
        return null;
    }

//  @Override
//  public void unlikeWaggle(Long waggleId, Long userId) {
//    Waggle waggle = Waggle.builder().waggleId(waggleId).build();
//    waggleLikeRepository.deleteByWaggleIdAndUserId(waggle, userId);
//  }


    @Override
    public void unlikeWaggle(Long waggleId, Long userId) {
        Optional<WaggleLike> existingLike = waggleLikeRepository.findByUserIdAndWaggleId_WaggleId(
            userId, waggleId);
        existingLike.ifPresent(like -> waggleLikeRepository.delete(like));
    }

}
