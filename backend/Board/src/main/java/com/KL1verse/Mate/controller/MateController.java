package com.KL1verse.Mate.controller;

import com.KL1verse.Mate.dto.req.MateDTO;
import com.KL1verse.Mate.repository.entity.Mate;
import com.KL1verse.Mate.service.MateService;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/mateboard")
public class MateController {

    private final MateService mateService;

    public MateController(MateService mateService) {
        this.mateService = mateService;
    }

    @GetMapping("/recent/{count}")
    public ResponseEntity<List<MateDTO>> getMostRecentWaggles(@PathVariable int count) {
        List<MateDTO> recentMates = mateService.getMostRecentMates(count);
        return ResponseEntity.ok(recentMates);
    }


}
