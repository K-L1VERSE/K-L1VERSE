package com.KL1verse.Mate.controller;

import com.KL1verse.Board.dto.req.SearchBoardConditionDto;
import com.KL1verse.Mate.dto.req.MateDTO;
import com.KL1verse.Mate.service.MateService;
import com.KL1verse.Product.dto.req.ProductDTO;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mates")
public class MateController {

    private final MateService mateService;

    public MateController(MateService mateService) {
        this.mateService = mateService;
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<MateDTO> getMateById(@PathVariable Long boardId) {
        MateDTO mate = mateService.getMateById(boardId);
        return ResponseEntity.ok(mate);
    }

    @PostMapping
    public ResponseEntity<MateDTO> createMate(@RequestBody MateDTO mateDto)
        throws URISyntaxException {
        MateDTO createdMate = mateService.createMate(mateDto);
        return ResponseEntity.created(new URI("/mates/" + createdMate.getMateId()))
            .body(createdMate);
    }


    @PutMapping("/{boardId}")
    public ResponseEntity<MateDTO> updateMate(@PathVariable Long boardId,
        @RequestBody MateDTO mateDto) {
        MateDTO updatedMate = mateService.updateMate(boardId, mateDto);
        return ResponseEntity.ok(updatedMate);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> deleteMate(@PathVariable Long boardId) {
        mateService.deleteMate(boardId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pages")
    public ResponseEntity<Page<MateDTO>> getAllMatesPaged(Pageable pageable) {
        Page<MateDTO> mates = mateService.getAllMateList(pageable);
        return ResponseEntity.ok(mates);
    }

    @GetMapping("/searchPaged")
    public ResponseEntity<Page<MateDTO>> searchMatesPaged(
        @RequestParam(required = false) String keyword,
        Pageable pageable
    ) {
        SearchBoardConditionDto searchCondition = SearchBoardConditionDto.builder()
            .keyword(keyword)
            .build();
        Page<MateDTO> mates = mateService.searchMates(searchCondition, pageable);
        return ResponseEntity.ok(mates);
    }

    @GetMapping("/openMates")
    public ResponseEntity<Page<MateDTO>> getOpenMates(Pageable pageable) {
        Page<MateDTO> openMates = mateService.getOpenMates(pageable);
        return ResponseEntity.ok(openMates);
    }

    @GetMapping("/lastWeek")
    public ResponseEntity<Page<MateDTO>> getLastWeekMates(Pageable pageable) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusWeeks(1);

        Page<MateDTO> mates = mateService.getMatesByDateRange(startDate, endDate, pageable);
        return ResponseEntity.ok(mates);
    }

    @GetMapping("/lastMonth")
    public ResponseEntity<Page<MateDTO>> getLastMonthMates(Pageable pageable) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusMonths(1);

        Page<MateDTO> mates = mateService.getMatesByDateRange(startDate, endDate, pageable);
        return ResponseEntity.ok(mates);
    }

    @GetMapping("/lastThreeMonths")
    public ResponseEntity<Page<MateDTO>> getLastThreeMonthsMates(Pageable pageable) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusMonths(3);

        Page<MateDTO> mates = mateService.getMatesByDateRange(startDate, endDate, pageable);
        return ResponseEntity.ok(mates);
    }

    @GetMapping("/recent/{count}")
    public ResponseEntity<List<MateDTO>> getMostRecentMates(@PathVariable int count) {
        List<MateDTO> recentMates = mateService.getMostRecentMates(count);
        return ResponseEntity.ok(recentMates);
    }

    @GetMapping("/matesByMatchList")
    public ResponseEntity<Page<MateDTO>> getMatesByMatchList(@RequestParam(required = false) List<Integer> matchIds, Pageable pageable) {
        Page<MateDTO> mates = mateService.getMatesByMatchList(matchIds, pageable);
        return ResponseEntity.ok(mates);
    }

}