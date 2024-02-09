package com.KL1verse.match.youtube.service;

import com.KL1verse.match.youtube.dto.req.YoutubeRankRequest;
import com.KL1verse.match.youtube.dto.res.YoutubeTimeResponse;
import com.KL1verse.match.youtube.repository.YoutubeRepository;
import com.KL1verse.match.youtube.repository.entity.Youtube;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class YoutubeServiceImpl implements YoutubeService {

    private final YoutubeRepository youtubeRepository;

    @Override
    public YoutubeTimeResponse getSavedAt() {
        Youtube video = youtubeRepository.findById(1).orElseThrow();
        return YoutubeTimeResponse.builder()
            .savedAt(video.getSavedAt())
            .build();
    }

    @Override
    public void saveOrUpdate(List<YoutubeRankRequest> youtubeList) {
        for (YoutubeRankRequest request : youtubeList) {
            Youtube youtube = youtubeRepository.findById(request.getRank())
                .orElse(new Youtube());
            youtube.setRank(request.getRank());
            youtube.setYoutubeId(request.getYoutubeId());
            youtube.setSavedAt(LocalDateTime.now());
            youtube.setThumbnail(request.getThumbnail());
            youtubeRepository.save(youtube);
        }
    }

    @Override
    public List<Youtube> getYoutubeList() {
        List<Youtube> list = youtubeRepository.findAll();
        return list;
    }

}
