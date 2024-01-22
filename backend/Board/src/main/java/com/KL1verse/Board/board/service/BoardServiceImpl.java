package com.KL1verse.Board.board.service.impl;

import com.KL1verse.Board.board.dto.BoardDTO;
import com.KL1verse.Board.board.repository.BoardRepository;
import com.KL1verse.Board.board.repository.entity.Board;
import com.KL1verse.Board.board.service.BoardService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final ModelMapper modelMapper;

    public BoardServiceImpl(BoardRepository boardRepository, ModelMapper modelMapper) {
        this.boardRepository = boardRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<BoardDTO> getAllBoards() {
        List<Board> boards = boardRepository.findAll();
        return boards.stream()
            .map(board -> modelMapper.map(board, BoardDTO.class))
            .collect(Collectors.toList());
    }

    @Override
    public BoardDTO getBoardById(Long boardId) {
        Board board = boardRepository.findById(boardId)
            .orElseThrow(() -> new RuntimeException("Board not found with id: " + boardId));
        return modelMapper.map(board, BoardDTO.class);
    }

    @Override
    public BoardDTO createBoard(BoardDTO boardDTO) {
        Board board = modelMapper.map(boardDTO, Board.class);
        Board savedBoard = boardRepository.save(board);
        return modelMapper.map(savedBoard, BoardDTO.class);
    }

    @Override
    public BoardDTO updateBoard(Long boardId, BoardDTO boardDTO) {
        Board existingBoard = boardRepository.findById(boardId)
            .orElseThrow(() -> new RuntimeException("Board not found with id: " + boardId));

        modelMapper.map(boardDTO, existingBoard);

        Board updatedBoard = boardRepository.save(existingBoard);
        return modelMapper.map(updatedBoard, BoardDTO.class);
    }

    @Override
    public void deleteBoard(Long boardId) {
        boardRepository.deleteById(boardId);
    }
}
