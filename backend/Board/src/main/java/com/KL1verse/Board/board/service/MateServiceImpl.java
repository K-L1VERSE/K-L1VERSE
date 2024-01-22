package com.KL1verse.Board.board.service.impl;

<<<<<<< HEAD
import com.KL1verse.Board.board.dto.req.MateDTO;
import com.KL1verse.Board.board.repository.MateRepository;
import com.KL1verse.Board.board.repository.entity.Mate;
import com.KL1verse.Board.board.service.MateService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MateServiceImpl implements MateService {

    private final MateRepository mateRepository;

    public MateServiceImpl(MateRepository mateRepository) {
        this.mateRepository = mateRepository;
    }

    @Override
    public MateDTO getMateById(Long mateId) {
        Mate mate = mateRepository.findById(mateId)
            .orElseThrow(() -> new RuntimeException("Mate not found with id: " + mateId));
        return convertToDTO(mate);
    }

    @Override
    public MateDTO createMate(MateDTO mateDTO) {
        Mate mate = convertToEntity(mateDTO);
        Mate savedMate = mateRepository.save(mate);
        return convertToDTO(savedMate);
    }

    @Override
    public MateDTO updateMate(Long mateId, MateDTO mateDTO) {
        Mate existingMate = mateRepository.findById(mateId)
            .orElseThrow(() -> new RuntimeException("Mate not found with id: " + mateId));

        BeanUtils.copyProperties(mateDTO, existingMate);
        Mate updatedMate = mateRepository.save(existingMate);
        return convertToDTO(updatedMate);
    }

    @Override
    public void deleteMate(Long mateId) {
        mateRepository.deleteById(mateId);
    }

    @Override
    public List<MateDTO> getMatesByBoardId(Long boardId) {
        List<Mate> mates = mateRepository.findByBoardId(boardId);
        return mates.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    private MateDTO convertToDTO(Mate mate) {
        MateDTO mateDTO = new MateDTO();
        BeanUtils.copyProperties(mate, mateDTO);
        return mateDTO;
    }

    private Mate convertToEntity(MateDTO mateDTO) {
        Mate mate = new Mate();
        BeanUtils.copyProperties(mateDTO, mate);
        return mate;
    }
}
