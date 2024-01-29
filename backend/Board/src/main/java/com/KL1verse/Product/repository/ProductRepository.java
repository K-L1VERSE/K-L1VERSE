package com.KL1verse.Product.repository;

import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Product.repository.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByBoard_BoardType(Board.BoardType boardType, Pageable pageable);

    Page<Product> findByBoard_BoardId(Long boardId, Pageable pageable);

    Page<Product> findByBoard_TitleContainingOrBoard_ContentContaining(String titleKeyword,
        String contentKeyword, Pageable pageable);
}
