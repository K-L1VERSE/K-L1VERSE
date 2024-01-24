package com.KL1verse.Comment.service;

import com.KL1verse.Mate.dto.req.MateDTO;
import java.util.List;


public interface MateService {

    MateDTO getMateById(Long mateId);
    MateDTO createMate(MateDTO mateDto);
    MateDTO updateMate(Long mateId, MateDTO mateDto);
    void deleteMate(Long mateId);
    List<MateDTO> getAllMateList();

//    List<MateDTO> getMatesByBoardId(Long boardId);

}

