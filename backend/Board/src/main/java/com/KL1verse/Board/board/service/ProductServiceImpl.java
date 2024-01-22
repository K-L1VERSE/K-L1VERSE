package com.KL1verse.Board.board.service.impl;

import com.KL1verse.Board.board.dto.BoardDTO;
import com.KL1verse.Board.board.repository.BoardRepository;
import com.KL1verse.Board.board.repository.entity.Board;
import com.KL1verse.Board.board.service.BoardService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    // PRODUCT 게시글 생성
    @Override
    public Long createProduct(ProductDTO productDTO) {
        Product product = Product.builder()
            // DTO 필드를 엔터티 필드로 매핑
            .build();

        productRepository.save(product);
        return product.getProductId();
    }
}
