package com.KL1verse.Product.controller;

import com.KL1verse.Product.dto.req.ProductDTO;
import com.KL1verse.Product.service.ProductService;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/recent/{count}")
    public ResponseEntity<List<ProductDTO>> getMostRecentProducts(@PathVariable int count) {
        List<ProductDTO> recentProducts = productService.getMostRecentProducts(count);
        return ResponseEntity.ok(recentProducts);
    }
}
