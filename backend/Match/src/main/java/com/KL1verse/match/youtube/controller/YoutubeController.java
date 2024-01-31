package com.KL1verse.match.youtube.controller;


import com.KL1verse.match.youtube.dto.req.YoutubeRankRequest;
import com.KL1verse.match.youtube.dto.res.YoutubeTimeResponse;
import com.KL1verse.match.youtube.repository.entity.Youtube;
import com.KL1verse.match.youtube.service.YoutubeService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/youtubes")
@RequiredArgsConstructor
@Slf4j
public class YoutubeController {

    private final YoutubeService youtubeService;

    @GetMapping
    public ResponseEntity<YoutubeTimeResponse> getSavedAt() {
        YoutubeTimeResponse youtubeRes = youtubeService.getSavedAt();
        return new ResponseEntity<>(youtubeRes, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> postYoutube(@RequestBody Map<String, List<YoutubeRankRequest>> youtubeList) {
        List<YoutubeRankRequest> youtubes = youtubeList.get("items");
        youtubeService.saveOrUpdate(youtubes);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Youtube>> getYoutubeList() {
        List<Youtube> youtubeList = youtubeService.getYoutubeList();
        return new ResponseEntity<>(youtubeList, HttpStatus.OK);
    }

}
