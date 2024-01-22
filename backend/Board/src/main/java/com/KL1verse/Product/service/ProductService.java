package com.KL1verse.Product.service;

import com.KL1verse.Mate.dto.req.MateDTO;
import com.KL1verse.Product.dto.req.ProductDTO;
import java.util.List;


public interface ProductService {
    List<ProductDTO> getProductById();

    ProductDTO getProductById(Long productId);

    ProductDTO createProduct(ProductDTO productDTO);

    ProductDTO updateProduct(Long productId, ProductDTO ProductDto);

    void deleteProduct(Long productId);

    List<ProductDTO> getAllProductList();



}









