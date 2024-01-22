package com.KL1verse.Board.board.service;

import com.KL1verse.Survey.survey.dto.req.SurveyDTO;
import java.util.List;

public interface WaggleLikeService {
    WaggleLikeDto createWaggleLike(WaggleLikeDto waggleLikeDto);
    void deleteWaggleLike(Long waggleId);
    List<WaggleLikeDto> getWaggleLikesByBoardId(Long boardId);
}

