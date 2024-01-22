package com.KL1verse.Board.board.service;

import com.KL1verse.Board.board.dto.req.BoardDTO;
import java.util.List;


public interface BoardService {
    List<BoardDTO> getAllBoards();

    BoardDTO getBoardById(Long boardId);

    BoardDTO createBoard(BoardDTO boardDTO);

    BoardDTO updateBoard(Long boardId, BoardDTO boardDTO);

    void deleteBoard(Long boardId);


}









