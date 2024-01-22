package com.KL1verse.Board.board.service;

import com.KL1verse.Survey.survey.dto.req.SurveyDTO;
import java.util.List;


public interface ProductService {

    ProductDto getProductById(Long ProductDto);
    ProductDto createProduct(ProductDto productDto);
    ProductDto updateProduct(Long productId, ProductDto productDto);
    void deleteProduct(Long productId);
    List<ProductDto> getProductsByBoardId(Long boardId);

}

