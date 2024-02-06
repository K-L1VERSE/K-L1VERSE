package com.KL1verse.Mate.repository;

import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Mate.repository.entity.Mate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MateRepository extends JpaRepository<Mate, Long> {

    Page<Mate> findByBoard_BoardType(Board.BoardType boardType, Pageable pageable);

    Page<Mate> findByBoard_BoardId(Long boardId, Pageable pageable);

    Page<Mate> findByBoard_TitleContainingOrBoard_ContentContaining(String titleKeyword,
        String contentKeyword, Pageable pageable);

    Page<Mate> findByFullFlagFalse(Pageable pageable);

    Page<Mate> findByBoard_CreateAtBetween(LocalDateTime startDate, LocalDateTime endDate,
        Pageable pageable);

    Page<Mate> findByMatchIdIn(List<Integer> matchIds, Pageable pageable);

    @Query(value = "SELECT u.nickname FROM user u JOIN board b ON b.user_id = u.user_id WHERE b.user_id = :userId", nativeQuery = true)
    List<Object[]> findUserNickname(@Param("userId") Integer userId);





}
