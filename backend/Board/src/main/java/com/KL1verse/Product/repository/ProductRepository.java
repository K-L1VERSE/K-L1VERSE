package com.KL1verse.Product.repository;

import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Product.repository.entity.Product;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByBoard_BoardType(Board.BoardType boardType, Pageable pageable);

    Page<Product> findByBoard_BoardId(Long boardId, Pageable pageable);

    Page<Product> findByBoard_TitleContainingOrBoard_ContentContaining(String titleKeyword,
        String contentKeyword, Pageable pageable);

    @Query(value = "SELECT u.nickname FROM user u JOIN board b ON b.user_id = u.user_id WHERE b.user_id = :userId", nativeQuery = true)
    List<Object[]> findUserNickname(@Param("userId") Integer userId);

    Page<Product> findByBoard_UserId(Integer userId, Pageable pageable);

    @Query(value = "SELECT u.nickname, u.profile, bd.code FROM user u JOIN badge b ON u.badge_id = b.badge_id JOIN badge_detail bd ON b.badge_detail_id = bd.badge_detail_id WHERE u.user_id = :userId", nativeQuery = true)
    List<Object[]> findUserNicknameAndProfileAndMainBadge(@Param("userId") Integer userId);

}
