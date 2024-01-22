package com.KL1verse.Board.board.service;

import com.KL1verse.Survey.survey.dto.req.SurveyDTO;
import java.util.List;

public interface WaggleService {

    WaggleDto getWaggleById(Long waggleId);
    WaggleDto createWaggle(WaggleDto waggleDto);
    WaggleDto updateWaggle(Long waggleId, WaggleDto waggleDto);
    void deleteWaggle(Long waggleId);
    List<WaggleDto> getWagglesByBoardId(Long boardId);

}

