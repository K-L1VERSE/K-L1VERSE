package com.KL1verse.Product.service;


import com.KL1verse.Board.dto.req.SearchBoardConditionDto;
import com.KL1verse.Product.dto.req.ProductDTO;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    ProductDTO getProductById(Long boardId);

    ProductDTO createProduct(ProductDTO productDto);

    ProductDTO updateProduct(Long boardId, ProductDTO productDto);

    void deleteProduct(Long boardId);

    Page<ProductDTO> searchProducts(SearchBoardConditionDto searchCondition, Pageable pageable);

    Page<ProductDTO> getAllProductList(Pageable pageable);

    List<ProductDTO> getMostRecentProducts(int count);

}









