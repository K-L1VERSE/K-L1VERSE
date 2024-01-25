package com.KL1verse.Board.controller;

import com.KL1verse.Board.dto.req.BoardDTO;
import com.KL1verse.Board.service.BoardService;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping
    public ResponseEntity<List<BoardDTO>> getAllBoards() {
        List<BoardDTO> boards = boardService.getAllBoards();
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<BoardDTO> getBoardById(@PathVariable Long boardId) {
        BoardDTO board = boardService.getBoardById(boardId);
        return new ResponseEntity<>(board, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<BoardDTO> createBoard(@RequestBody BoardDTO boardDTO) {
        BoardDTO createdBoard = boardService.createBoard(boardDTO);
        return new ResponseEntity<>(createdBoard, HttpStatus.CREATED);
    }

    @PutMapping("/{boardId}")
    public ResponseEntity<BoardDTO> updateBoard(@PathVariable Long boardId, @RequestBody BoardDTO boardDTO) {
        BoardDTO updatedBoard = boardService.updateBoard(boardId, boardDTO);
        return new ResponseEntity<>(updatedBoard, HttpStatus.OK);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long boardId) {
        boardService.deleteBoard(boardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}