package com.KL1verse.Mate.repository;

import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Mate.repository.entity.Mate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MateRepository extends JpaRepository<Mate, Long> {
    List<Mate> findByBoard_BoardType(Board.BoardType boardType);

    List<Mate> findByBoard_BoardId(Long boardId);

}
