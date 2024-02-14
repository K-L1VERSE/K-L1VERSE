package com.KL1verse.Product.controller;

import com.KL1verse.Board.dto.req.BoardDTO;
import com.KL1verse.Board.dto.req.SearchBoardConditionDto;
import com.KL1verse.Product.dto.req.ProductDTO;
import com.KL1verse.Product.service.ProductService;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/myPage")
    public ResponseEntity<List<ProductDTO>> getProductsByUser(@RequestBody BoardDTO boardDTO, Pageable pageable) {
        Integer userId = boardDTO.getUserId();
        List<ProductDTO> products = productService.getProductsByUser(userId, pageable);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long boardId) {
        ProductDTO product = productService.getProductById(boardId);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDto)
        throws URISyntaxException {
        ProductDTO createdProduct = productService.createProduct(productDto);
        return ResponseEntity.created(new URI("/products/" + createdProduct.getProductId()))
            .body(createdProduct);
    }

    @PutMapping("/{boardId}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long boardId,
        @RequestBody ProductDTO productDto) {

        ProductDTO updatedProduct = productService.updateProduct(boardId, productDto);
        return ResponseEntity.ok(updatedProduct);
    }


    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long boardId) {

        productService.deleteProduct(boardId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pages")
    public ResponseEntity<List<ProductDTO>> getAllProductsPaged(Pageable pageable) {
        List<ProductDTO> products = productService.getAllProductList(pageable);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/searchPaged")
    public ResponseEntity<Page<ProductDTO>> searchProductsPaged(
        @RequestParam(required = false) String keyword,
        Pageable pageable
    ) {
        SearchBoardConditionDto searchCondition = SearchBoardConditionDto.builder()
            .keyword(keyword)
            .build();
        Page<ProductDTO> products = productService.searchProducts(searchCondition, pageable);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/recent/{count}")
    public ResponseEntity<List<ProductDTO>> getMostRecentProducts(@PathVariable int count) {
        List<ProductDTO> recentProducts = productService.getMostRecentProducts(count);
        return ResponseEntity.ok(recentProducts);
    }
}
