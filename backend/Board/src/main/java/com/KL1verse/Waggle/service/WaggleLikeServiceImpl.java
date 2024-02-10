package com.KL1verse.Waggle.service;

import com.KL1verse.Waggle.dto.req.WaggleLikeDTO;
import com.KL1verse.Waggle.repository.WaggleLikeRepository;
import com.KL1verse.Waggle.repository.WaggleRepository;
import com.KL1verse.Waggle.repository.entity.Waggle;
import com.KL1verse.Waggle.repository.entity.WaggleLike;

import java.util.List;
import java.util.Optional;

import com.KL1verse.kafka.dto.res.BoardNotificationResDto;
import com.KL1verse.kafka.producer.KafkaBoardNotificationProducer;
import org.springframework.stereotype.Service;

@Service
public class WaggleLikeServiceImpl implements WaggleLikeService {

    private final KafkaBoardNotificationProducer kafkaBoardNotificationProducer;
    private final WaggleRepository waggleRepository;
    private final WaggleLikeRepository waggleLikeRepository;
    private  final WaggleService waggleService;

    public WaggleLikeServiceImpl(KafkaBoardNotificationProducer kafkaBoardNotificationProducer, WaggleRepository waggleRepository, WaggleLikeRepository waggleLikeRepository,
        WaggleService waggleService) {
        this.kafkaBoardNotificationProducer = kafkaBoardNotificationProducer;
        this.waggleRepository = waggleRepository;
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

        Waggle waggle = waggleRepository.findById(waggleId).get();
        Long boardId = waggle.getBoard().getBoardId();

        List<Object[]> nicknameAndProfile = waggleLikeRepository.findNicknameAndProfileByUserId(userId);
        String userNickname = (String) nicknameAndProfile.get(0)[0];
        String userProfile = (String) nicknameAndProfile.get(0)[1];

        if(!waggle.getBoard().getUserId().equals(userId)) {
            kafkaBoardNotificationProducer.boardNotification(
                    BoardNotificationResDto.builder()
                            .type(BoardNotificationResDto.BoardNotificationType.LIKE)
                            .userId(userId)
                            .profile(userProfile)
                            .nickname(userNickname)
                            .uri("/" + waggle.getBoard().getBoardType().toString().toLowerCase() + "/" + String.valueOf(boardId))
                            .message("님이 좋아요를 누르셨습니다.")
                            .build()
            );
        }
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
