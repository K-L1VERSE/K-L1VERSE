package com.KL1verse.Mate.service;

import com.KL1verse.Board.dto.req.SearchBoardConditionDto;
import com.KL1verse.Mate.dto.req.MateDTO;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MateService {

    MateDTO getMateById(Long boardId);

    MateDTO createMate(MateDTO mateDto);

    MateDTO updateMate(Long boardId, MateDTO mateDto);

    void deleteMate(Long boardId);

    Page<MateDTO> searchMates(SearchBoardConditionDto searchCondition, Pageable pageable);

    Page<MateDTO> getAllMateList(Pageable pageable);

    Page<MateDTO> getOpenMates(Pageable pageable);

    Page<MateDTO> getMatesByDateRange(LocalDateTime startDate, LocalDateTime endDate,
        Pageable pageable);

    List<MateDTO> getMostRecentMates(int count);

    Page<MateDTO> getMatesByMatchList(List<Integer> matchIds, Pageable pageable);

    Page<MateDTO> getMatesByUser(Integer userId, Pageable pageable);

}
