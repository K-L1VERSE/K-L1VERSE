package com.KL1verse.Board.board.service;

import com.KL1verse.Survey.survey.dto.req.SurveyDTO;
import java.util.List;


public interface MateService {
    MateDto getMateById(Long MateDto);
    MateDto createMate(MateDto mateDto);
    MateDto updateMate(Long mateId, MateDto mateDto);
    void deleteMate(Long mateId);
    List<MateDto> getMatesByBoardId(Long boardId);
}

