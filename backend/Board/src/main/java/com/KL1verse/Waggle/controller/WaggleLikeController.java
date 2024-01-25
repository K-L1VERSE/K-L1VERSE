package com.KL1verse.Waggle.controller;

import com.KL1verse.Waggle.dto.req.WaggleLikeDTO;
import com.KL1verse.Waggle.service.WaggleLikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/waggle")
public class WaggleLikeController {

    private final WaggleLikeService waggleLikeService;

    public WaggleLikeController(WaggleLikeService waggleLikeService) {
        this.waggleLikeService = waggleLikeService;
    }

    @PostMapping("/like/{waggleId}")
    public ResponseEntity<Void> likeWaggle(@PathVariable Long waggleId, @RequestBody WaggleLikeDTO requestDTO) {
        waggleLikeService.likeWaggle(waggleId, requestDTO.getUserId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/like/{waggleId}")
    public ResponseEntity<Void> unlikeWaggle(@PathVariable Long waggleId, @RequestBody WaggleLikeDTO requestDTO) {
        waggleLikeService.unlikeWaggle(waggleId, requestDTO.getUserId());
        return ResponseEntity.ok().build();
    }




}