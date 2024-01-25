// WaggleServiceImpl
package com.KL1verse.Waggle.service;

import com.KL1verse.Board.dto.req.BoardDTO;
import com.KL1verse.Board.dto.req.SearchBoardConditionDto;
import com.KL1verse.Board.repository.BoardRepository;
import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Waggle.dto.req.WaggleDTO;
import com.KL1verse.Waggle.repository.WaggleRepository;
import com.KL1verse.Waggle.repository.entity.Waggle;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class WaggleServiceImpl implements WaggleService {

    private final WaggleRepository waggleRepository;
    private final BoardRepository boardRepository;

    public WaggleServiceImpl(WaggleRepository waggleRepository, BoardRepository boardRepository) {
        this.waggleRepository = waggleRepository;
        this.boardRepository = boardRepository;
    }

    @Override
    public WaggleDTO getWaggleById(Long boardId) {
        Waggle waggle = findWaggleByBoardId(boardId);
        return convertToDTO(waggle);
    }

    @Override
    public WaggleDTO createWaggle(WaggleDTO waggleDto) {
        Waggle waggle = convertToEntity(waggleDto);
        Board board = saveBoard(waggle.getBoard());
        waggle.setBoard(board);
        Waggle createdWaggle = waggleRepository.save(waggle);
        return convertToDTO(createdWaggle);
    }

    @Override
    public WaggleDTO updateWaggle(Long boardId, WaggleDTO waggleDto) {
        Waggle existingWaggle = findWaggleByBoardId(boardId);
        updateExistingWaggle(existingWaggle, waggleDto);
        Waggle updatedWaggle = waggleRepository.save(existingWaggle);
        return convertToDTO(updatedWaggle);
    }

    @Override
    public void deleteWaggle(Long boardId) {
        Waggle waggleToDelete = findWaggleByBoardId(boardId);
        waggleRepository.deleteById(waggleToDelete.getWaggleId());
    }

    @Override
    public Page<WaggleDTO> searchWaggles(SearchBoardConditionDto searchCondition, Pageable pageable) {
        Page<Waggle> waggles;

        if (searchCondition != null && searchCondition.getKeyword() != null) {
            waggles = waggleRepository.findByBoard_TitleContainingOrBoard_ContentContaining(
                searchCondition.getKeyword(),
                searchCondition.getKeyword(),
                pageable
            );
        } else {
            waggles = waggleRepository.findAll(pageable);
        }

        return waggles.map(this::convertToDTO);
    }

    @Override
    public Page<WaggleDTO> getAllWaggleList(Pageable pageable) {
        Page<Waggle> waggles = waggleRepository.findByBoard_BoardType(Board.BoardType.WAGGLE, pageable);
        return waggles.map(this::convertToDTO);
    }

    private Waggle findWaggleByBoardId(Long boardId) {
        List<Waggle> waggles = (List<Waggle>) waggleRepository.findByBoard_BoardId(boardId, Pageable.unpaged());
        if (waggles.isEmpty()) {
            throw new RuntimeException("Waggle not found with boardId: " + boardId);
        }
        return waggles.get(0);
    }

    private Board saveBoard(Board board) {
        return boardRepository.save(board);
    }

    private void updateExistingWaggle(Waggle existingWaggle, WaggleDTO waggleDto) {
        existingWaggle.getBoard().setTitle(waggleDto.getBoard().getTitle());
        existingWaggle.getBoard().setContent(waggleDto.getBoard().getContent());
    }

    private WaggleDTO convertToDTO(Waggle waggle) {
        WaggleDTO waggleDTO = new WaggleDTO();
        BeanUtils.copyProperties(waggle, waggleDTO);
        waggleDTO.setBoard(BoardDTO.builder()
            .boardId(waggle.getBoard().getBoardId())
            .boardType(waggle.getBoard().getBoardType())
            .title(waggle.getBoard().getTitle())
            .content(waggle.getBoard().getContent())
            .createAt(waggle.getBoard().getCreateAt())
            .updateAt(waggle.getBoard().getUpdateAt())
            .deleteAt(waggle.getBoard().getDeleteAt())
            .build());
        return waggleDTO;
    }

    private Waggle convertToEntity(WaggleDTO waggleDTO) {
        Waggle waggle = new Waggle();
        BeanUtils.copyProperties(waggleDTO, waggle);
        waggle.setBoard(Board.builder()
            .boardId(waggleDTO.getBoard().getBoardId())
            .boardType(waggleDTO.getBoard().getBoardType())
            .title(waggleDTO.getBoard().getTitle())
            .content(waggleDTO.getBoard().getContent())
            .createAt(waggleDTO.getBoard().getCreateAt())
            .updateAt(waggleDTO.getBoard().getUpdateAt())
            .deleteAt(waggleDTO.getBoard().getDeleteAt())
            .build());
        return waggle;
    }
}