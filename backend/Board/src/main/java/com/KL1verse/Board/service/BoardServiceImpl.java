package com.KL1verse.Board.service;

import com.KL1verse.Board.dto.req.BoardDTO;
import com.KL1verse.Board.repository.BoardRepository;
import com.KL1verse.Board.repository.entity.Board;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;

    public BoardServiceImpl(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @Override
    public List<BoardDTO> getAllBoards() {
        List<Board> boards = boardRepository.findAll();
        return boards.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Override
    public BoardDTO getBoardById(Long boardId) {
        Board board = boardRepository.findById(boardId)
            .orElseThrow(() -> new RuntimeException("Board not found with id: " + boardId));
        return convertToDTO(board);
    }

    @Override
    public BoardDTO createBoard(BoardDTO boardDTO) {
        Board board = convertToEntity(boardDTO);
        Board savedBoard = boardRepository.save(board);
        return convertToDTO(savedBoard);
    }

    @Override
    public BoardDTO updateBoard(Long boardId, BoardDTO boardDTO) {
        Board existingBoard = boardRepository.findById(boardId)
            .orElseThrow(() -> new RuntimeException("Board not found with id: " + boardId));

        BeanUtils.copyProperties(boardDTO, existingBoard);
        Board updatedBoard = boardRepository.save(existingBoard);
        return convertToDTO(updatedBoard);
    }

    @Override
    public void deleteBoard(Long boardId) {
        boardRepository.deleteById(boardId);
    }

    private BoardDTO convertToDTO(Board board) {
        BoardDTO boardDTO = new BoardDTO();
        BeanUtils.copyProperties(board, boardDTO);
        return boardDTO;
    }

    private Board convertToEntity(BoardDTO boardDTO) {
        Board board = new Board();
        BeanUtils.copyProperties(boardDTO, board);
        return board;
    }

}
