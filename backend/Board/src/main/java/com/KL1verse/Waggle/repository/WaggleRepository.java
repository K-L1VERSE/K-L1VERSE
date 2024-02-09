package com.KL1verse.Waggle.repository;

import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Waggle.repository.entity.Waggle;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WaggleRepository extends JpaRepository<Waggle, Long> {

  Page<Waggle> findByBoard_BoardType(Board.BoardType boardType, Pageable pageable);

  Page<Waggle> findByBoard_BoardId(Long boardId, Pageable pageable);

  Page<Waggle> findByBoard_TitleContainingOrBoard_ContentContaining(String titleKeyword,
      String contentKeyword, Pageable pageable);


  @Query("SELECT w, COUNT(l.likesId) " +
      "FROM waggle w " +
      "LEFT JOIN WaggleLike l ON w.waggleId = l.waggleId.waggleId " +
      "GROUP BY w.waggleId")
  List<Object[]> getLikesCountForEachWaggle();


  @Query(value = "SELECT u.nickname FROM user u JOIN board b ON b.user_id = u.user_id WHERE b.user_id = :userId", nativeQuery = true)
  List<Object[]> findUserNickname(@Param("userId") Integer userId);


  Page<Waggle> findByHashtagsContaining(String hashtag, Pageable pageable);


}





