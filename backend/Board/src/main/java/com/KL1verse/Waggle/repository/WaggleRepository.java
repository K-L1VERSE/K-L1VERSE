package com.KL1verse.Waggle.repository;

import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Waggle.repository.entity.Waggle;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaggleRepository extends JpaRepository<Waggle, Long> {
    List<Waggle> findByBoard_BoardType(Board.BoardType boardType);

    List<Waggle> findByBoard_BoardId(Long boardId);
    List<Waggle> findByBoard_TitleContainingOrBoard_ContentContaining(String titleKeyword, String contentKeyword);
}
