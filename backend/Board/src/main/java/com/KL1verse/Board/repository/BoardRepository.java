package com.KL1verse.Board.repository;

import com.KL1verse.Board.repository.entity.Board;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long>{
    List<Board> findByBoardIdAndBoardType(Long boardId, Board.BoardType boardType);
}
