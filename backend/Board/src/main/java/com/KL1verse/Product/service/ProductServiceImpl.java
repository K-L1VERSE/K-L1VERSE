//package com.KL1verse.Product.service;
//
//import com.KL1verse.Board.dto.req.BoardDTO;
//import com.KL1verse.Board.service.BoardService;
//import com.KL1verse.Product.dto.req.ProductDTO;
//import com.KL1verse.Product.repository.ProductRepository;
//
//import com.KL1verse.Waggle.repository.entity.Product;
//import java.util.List;
//import java.util.stream.Collectors;
//import org.springframework.beans.BeanUtils;
//import org.springframework.stereotype.Service;
//
//@Service
//public class ProductServiceImpl implements ProductService {
//
//  private final ProductRepository productRepository;
//  private final BoardService boardService;
//
//  public ProductServiceImpl(ProductRepository productRepository, BoardService boardService) {
//    this.productRepository = productRepository;
//    this.boardService = boardService;
//  }
//
//  @Override
//  public List<ProductDTO> getProductById() {
//    // Implement your logic here if needed
//    return null;
//  }
//
//  @Override
//  public ProductDTO getProductById(Long productId) {
//    Product product = productRepository.findById(productId)
//        .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
//    return convertToDTO(product);
//  }
//
//  @Override
//  public ProductDTO createProduct(ProductDTO productDTO) {
//    Product product = convertToEntity(productDTO);
//    Product savedProduct = productRepository.save(product);
//    return convertToDTO(savedProduct);
//  }
//
//  @Override
//  public ProductDTO updateProduct(Long productId, ProductDTO productDTO) {
//    Product existingProduct = productRepository.findById(productId)
//        .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
//
//    BeanUtils.copyProperties(productDTO, existingProduct);
//    Product updatedProduct = productRepository.save(existingProduct);
//    return convertToDTO(updatedProduct);
//  }
//
//  @Override
//  public void deleteProduct(Long productId) {
//    productRepository.deleteById(productId);
//  }
//
//  @Override
//  public List<ProductDTO> getAllProductList() {
//    List<Product> productList = productRepository.findAll();
//    return productList.stream()
//        .map(this::convertToDTO)
//        .collect(Collectors.toList());
//  }
//
//  private ProductDTO convertToDTO(Product product) {
//    ProductDTO productDTO = new ProductDTO();
//    BeanUtils.copyProperties(product, productDTO);
//    // Assuming boardService.getBoardById() returns a BoardDTO
//    BoardDTO boardDTO = boardService.getBoardById(product.getBoard().getBoardId());
//    productDTO.setBoard(boardDTO);
//    return productDTO;
//  }
//
//  private Product convertToEntity(ProductDTO productDTO) {
//    Product product = new Product();
//    BeanUtils.copyProperties(productDTO, product);
//    // Assuming boardService.getBoardById() returns a BoardDTO
//    BoardDTO boardDTO = productDTO.getBoard();
//
//    return product;
//  }
//}
