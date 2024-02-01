package com.KL1verse.Waggle.service;

import com.KL1verse.Board.dto.req.SearchBoardConditionDto;
import com.KL1verse.Waggle.dto.req.WaggleDTO;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WaggleService {

    WaggleDTO getWaggleById(Long BoardId);

    WaggleDTO createWaggle(WaggleDTO waggleDto);

    WaggleDTO updateWaggle(Long BoardId, WaggleDTO waggleDto);

    void deleteWaggle(Long boardId, int userId);


    Page<WaggleDTO> getAllWaggleList(Pageable pageable);

    Page<WaggleDTO> searchWagglesWithLikes(SearchBoardConditionDto searchCondition, Pageable pageable);

    Page<WaggleDTO> getAllWagglesWithLikes(Pageable pageable);

    List<WaggleDTO> getMostRecentWaggles(int count);

    boolean isWaggleOwner(Long boardId, int userId);

}

