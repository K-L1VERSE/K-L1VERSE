package com.KL1verse.match.youtube.service;

import com.KL1verse.match.youtube.dto.req.YoutubeRankRequest;
import com.KL1verse.match.youtube.dto.res.YoutubeTimeResponse;
import com.KL1verse.match.youtube.repository.entity.Youtube;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface YoutubeService {

    YoutubeTimeResponse getSavedAt();

    void saveOrUpdate(List<YoutubeRankRequest> youtubeList);

    List<Youtube> getYoutubeList();
}
