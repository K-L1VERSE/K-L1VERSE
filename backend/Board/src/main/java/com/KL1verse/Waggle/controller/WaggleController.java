package com.KL1verse.Waggle.controller;

import com.KL1verse.Board.dto.req.BoardDTO;
import com.KL1verse.Board.dto.req.SearchBoardConditionDto;
import com.KL1verse.Comment.dto.req.CommentDTO;
import com.KL1verse.Waggle.dto.req.WaggleDTO;
import com.KL1verse.Waggle.service.WaggleService;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/waggles")
public class
WaggleController {

    private final WaggleService waggleService;


    public WaggleController(WaggleService waggleService) {
        this.waggleService = waggleService;
    }



//        @GetMapping("/hashtags/{loginUserId}")
//    public ResponseEntity<Page<WaggleDTO>> getWagglesByTopHashtags(@PathVariable Integer loginUserId, Pageable pageable) {
//        // 상위 3개 해시태그 가져오기
//        List<String> topHashtags = waggleService.getTopHashtags(loginUserId, 3);
//        log.info("topHashtags: {}", topHashtags);
//
//        // 각 해시태그를 가진 게시글들을 가져와서 리스트에 추가
//        Page<WaggleDTO> waggles = waggleService.getWagglesByHashtags(topHashtags, pageable);
//
//        // 결과 반환
//        return new ResponseEntity<>(waggles, HttpStatus.OK);
//    }


    @PostMapping("/hashtags")
    public ResponseEntity<Page<WaggleDTO>> getWagglesByTopHashtags(@RequestBody BoardDTO boardDTO, Pageable pageable) {
        // 상위 3개 해시태그 가져오기
        Integer loginUserId = boardDTO.getUserId();
        List<String> topHashtags = waggleService.getTopHashtags(loginUserId, 3);

        // 각 해시태그를 가진 게시글들을 가져와서 리스트에 추가
        Page<WaggleDTO> waggles = waggleService.getWagglesByHashtags(topHashtags, pageable);

        // 결과 반환
        return new ResponseEntity<>(waggles, HttpStatus.OK);
    }


    @PostMapping("/{boardId}")
    public ResponseEntity<WaggleDTO> getWaggleById(@PathVariable Long boardId,
        @RequestBody WaggleDTO waggleDto) {
        Integer loginUserId = waggleDto.getBoard().getUserId();
        WaggleDTO waggle = waggleService.getWaggleById(boardId, loginUserId);
        return ResponseEntity.ok(waggle);
    }


    @PostMapping
    public ResponseEntity<WaggleDTO> createWaggle(@RequestBody WaggleDTO waggleDto) {
        WaggleDTO createdWaggle = waggleService.createWaggle(waggleDto);
        return ResponseEntity.ok(createdWaggle);
    }


    @PutMapping("/{boardId}")
    public ResponseEntity<WaggleDTO> updateWaggle(@PathVariable Long boardId,
        @RequestBody WaggleDTO waggleDto) {

        WaggleDTO updatedWaggle = waggleService.updateWaggle(boardId, waggleDto);
        return ResponseEntity.ok(updatedWaggle);
    }


    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> deleteWaggle(@PathVariable Long boardId) {

        waggleService.deleteWaggle(boardId);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/searchPaged")
    public ResponseEntity<Page<WaggleDTO>> searchWagglesPaged(
        @RequestParam(required = false) String keyword,
        Pageable pageable
    ) {
        SearchBoardConditionDto searchCondition = SearchBoardConditionDto.builder()
            .keyword(keyword)
            .build();
        Page<WaggleDTO> waggles = waggleService.searchWagglesWithLikes(searchCondition, pageable);
        return ResponseEntity.ok(waggles);
    }

    @GetMapping("/pages")
    public ResponseEntity<Page<WaggleDTO>> getAllWagglesPaged(Pageable pageable) {
        Page<WaggleDTO> waggles = waggleService.getAllWagglesWithLikes(pageable);
        return ResponseEntity.ok(waggles);
    }

    @GetMapping("/recent/{count}")
    public ResponseEntity<List<WaggleDTO>> getMostRecentWaggles(@PathVariable int count) {
        List<WaggleDTO> recentWaggles = waggleService.getMostRecentWaggles(count);
        return ResponseEntity.ok(recentWaggles);
    }

}