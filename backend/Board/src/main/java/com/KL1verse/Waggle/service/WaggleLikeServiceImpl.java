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
    private  final WaggleService waggleService;

    public WaggleLikeServiceImpl(WaggleLikeRepository waggleLikeRepository,
        WaggleService waggleService) {
        this.waggleLikeRepository = waggleLikeRepository;
      this.waggleService = waggleService;
    }

    @Override
    public WaggleLikeDTO likeWaggle(Long waggleId, Integer userId) {
        Optional<WaggleLike> existingLike = waggleLikeRepository.findByUserIdAndWaggleId_WaggleId(
            Long.valueOf(userId), waggleId);
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
        waggleService.saveHashtags(waggleService.getWaggleById(waggleId, userId));

        return null;
    }


    @Override
    public void unlikeWaggle(Long waggleId, Integer userId) {
        Optional<WaggleLike> existingLike = waggleLikeRepository.findByUserIdAndWaggleId_WaggleId(
            Long.valueOf(userId), waggleId);
        existingLike.ifPresent(like -> waggleLikeRepository.delete(like));
        waggleService.removeHashtagsFromUnlikedWaggle(waggleId);
    }

}
