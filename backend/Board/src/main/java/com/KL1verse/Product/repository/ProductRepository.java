package com.KL1verse.Product.repository;

import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Waggle.repository.entity.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByBoard_BoardType(Board.BoardType boardType);

    List<Product> findByBoard_BoardId(Long boardId);
}
