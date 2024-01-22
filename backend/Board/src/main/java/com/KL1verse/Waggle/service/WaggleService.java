package com.KL1verse.Waggle.service;

import com.KL1verse.Waggle.dto.req.WaggleDTO;

public interface WaggleService {

    WaggleDTO getWaggleById(Long waggleId);
    WaggleDTO createWaggle(WaggleDTO waggleDto);
    WaggleDTO updateWaggle(Long waggleId, WaggleDTO waggleDto);
    void deleteWaggle(Long waggleId);
//    List<WaggleDTO> getWagglesByBoardId(Long boardId);

}

