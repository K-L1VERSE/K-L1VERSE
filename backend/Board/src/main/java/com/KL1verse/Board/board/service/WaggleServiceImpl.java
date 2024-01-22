package com.KL1verse.Board.board.service.impl;

<<<<<<< HEAD
import com.KL1verse.Board.board.dto.req.WaggleDTO;
import com.KL1verse.Board.board.repository.WaggleRepository;
import com.KL1verse.Board.board.repository.entity.Waggle;
import com.KL1verse.Board.board.service.WaggleService;
import org.springframework.beans.BeanUtils;
=======
import com.KL1verse.Board.board.dto.BoardDTO;
import com.KL1verse.Board.board.repository.BoardRepository;
import com.KL1verse.Board.board.repository.entity.Board;
import com.KL1verse.Board.board.service.BoardService;
import org.modelmapper.ModelMapper;
>>>>>>> 2a1ca48f30b698bd88701ef600a4b3e60f3262fd
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WaggleServiceImpl implements WaggleService {


    private final WaggleRepository waggleRepository;

    public WaggleServiceImpl(WaggleRepository waggleRepository) {
        this.waggleRepository = waggleRepository;
    }

    @Override
    public WaggleDTO getWaggleById(Long waggleId) {
        Waggle waggle = waggleRepository.findById(waggleId)
            .orElseThrow(() -> new RuntimeException("Waggle not found with id: " + waggleId));
        return convertToDTO(waggle);
    }

    @Override
    public WaggleDTO createWaggle(WaggleDTO waggleDTO) {
        Waggle waggle = convertToEntity(waggleDTO);
//        waggle.setWaggleId(waggleDTO.getWaggleId());
//        waggle.setBoardId(waggleDTO.getBoardId()); 대신 convertToEntity를 사용
        Waggle savedWaggle = waggleRepository.save(waggle);
        return convertToDTO(savedWaggle);
    }

    @Override
    public WaggleDTO updateWaggle(Long waggleId, WaggleDTO waggleDTO) {
        Waggle existingWaggle = waggleRepository.findById(waggleId)
            .orElseThrow(() -> new RuntimeException("Waggle not found with id: " + waggleId));

        BeanUtils.copyProperties(waggleDTO, existingWaggle);
        Waggle updatedWaggle = waggleRepository.save(existingWaggle);
        return convertToDTO(updatedWaggle);
    }

    @Override
    public void deleteWaggle(Long waggleId) {
        waggleRepository.deleteById(waggleId);
    }

    @Override
    public List<WaggleDTO> getWagglesByBoardId(Long boardId) {
        List<Waggle> waggles = waggleRepository.findByBoardId(boardId);
        return waggles.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    private WaggleDTO convertToDTO(Waggle waggle) {
        WaggleDTO waggleDTO = new WaggleDTO();
        BeanUtils.copyProperties(waggle, waggleDTO);
        return waggleDTO;
    }

    private Waggle convertToEntity(WaggleDTO waggleDTO) {
        Waggle waggle = new Waggle();
        BeanUtils.copyProperties(waggleDTO, waggle);
        return waggle;
    }

}
