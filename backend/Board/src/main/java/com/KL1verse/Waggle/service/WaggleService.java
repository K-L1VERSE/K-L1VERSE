package com.KL1verse.Waggle.service;

import com.KL1verse.Board.dto.req.SearchBoardConditionDto;
import com.KL1verse.Waggle.dto.req.WaggleDTO;
import java.util.List;

public interface WaggleService {

    WaggleDTO getWaggleById(Long BoardId);
    WaggleDTO createWaggle(WaggleDTO waggleDto);
    WaggleDTO updateWaggle(Long BoardId, WaggleDTO waggleDto);
    void deleteWaggle(Long BoardId);

    List<WaggleDTO> searchWaggles(SearchBoardConditionDto searchCondition);
    List<WaggleDTO> getAllWaggleList();

    List<WaggleDTO> getMostRecentWaggles(int count);
}

