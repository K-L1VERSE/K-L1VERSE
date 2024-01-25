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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
        List<Waggle> waggles = waggleRepository.findByBoard_BoardId(boardId);

        if (waggles.isEmpty()) {
            throw new RuntimeException("해당 ID의 Waggle을 찾을 수 없습니다: " + boardId);
        }

        Waggle waggle = waggles.get(0);
        return convertToDTO(waggle);
    }



    @Override
    public WaggleDTO createWaggle(WaggleDTO waggleDto) {
        Waggle waggle = convertToEntity(waggleDto);

        Board board = waggle.getBoard();
        board = boardRepository.save(board);

        waggle.setBoard(board);
        Waggle createdWaggle = waggleRepository.save(waggle);
        return convertToDTO(createdWaggle);
    }

    @Override
    public WaggleDTO updateWaggle(Long boardId, WaggleDTO waggleDto) {
        List<Waggle> waggles = waggleRepository.findByBoard_BoardId(boardId);

        if (waggles.isEmpty()) {
            throw new RuntimeException("Waggle not found with boardId: " + boardId);
        }
        Waggle existingWaggle = waggles.get(0);

        existingWaggle.getBoard().setTitle(waggleDto.getBoard().getTitle());
        existingWaggle.getBoard().setContent(waggleDto.getBoard().getContent());

        Waggle updatedWaggle = waggleRepository.save(existingWaggle);

        return convertToDTO(updatedWaggle);
    }


    @Override
    public void deleteWaggle(Long boardId) {
        List<Waggle> waggles = waggleRepository.findByBoard_BoardId(boardId);

        if (waggles.isEmpty()) {
            throw new RuntimeException("해당 ID의 Waggle을 찾을 수 없습니다: " + boardId);
        }

        Waggle waggleToDelete = waggles.get(0);
        waggleRepository.deleteById(waggleToDelete.getWaggleId());
    }


    @Override
    public List<WaggleDTO> getAllWaggleList() {
        List<Waggle> waggles = waggleRepository.findByBoard_BoardType(Board.BoardType.WAGGLE);
        return waggles.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
}

    @Override
    public List<WaggleDTO> searchWaggles(SearchBoardConditionDto searchCondition) {
        List<Waggle> waggles;

        if (searchCondition != null && searchCondition.getKeyword() != null) {
            // If keyword is provided, search for posts containing the keyword
            waggles = waggleRepository.findByBoard_TitleContainingOrBoard_ContentContaining(searchCondition.getKeyword(), searchCondition.getKeyword());
        } else {
            // If no keyword provided, get all posts
            waggles = waggleRepository.findAll();
        }

        // Convert the entities to DTOs
        return waggles.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
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

    @Override
    public List<WaggleDTO> getMostRecentWaggles(int count) {
        List<Waggle> recentWaggles = waggleRepository.findAll(
            PageRequest.of(0, count, Sort.by(Sort.Direction.DESC, "board.createAt"))
        ).getContent();

        return recentWaggles.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
}
