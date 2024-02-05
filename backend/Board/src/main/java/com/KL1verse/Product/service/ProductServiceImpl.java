package com.KL1verse.Product.service;

import com.KL1verse.Board.dto.req.BoardDTO;
import com.KL1verse.Board.dto.req.SearchBoardConditionDto;
import com.KL1verse.Board.repository.BoardRepository;
import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Comment.repository.CommentRepository;
import com.KL1verse.Product.dto.req.ProductDTO;
import com.KL1verse.Product.repository.ProductRepository;
import com.KL1verse.Product.repository.entity.Product;
import com.KL1verse.kafka.dto.req.BoardCleanbotCheckReqDto;
import com.KL1verse.kafka.producer.KafkaBoardCleanbotProducer;
import com.KL1verse.s3.repository.entity.File;
import com.KL1verse.s3.service.BoardImageService;
import com.KL1verse.s3.service.FileService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final BoardRepository boardRepository;

    private final FileService fileService;

    private final BoardImageService boardImageService;

    private final CommentRepository commentRepository;
    private final KafkaBoardCleanbotProducer kafkaBoardCleanbotProducer;

    @Override
    public ProductDTO getProductById(Long boardId) {
        Product product = findProductByBoardId(boardId);

        ProductDTO productDTO = convertToDTO(product);

        int commentCount = commentRepository.countCommentsByBoardId(boardId);
        productDTO.getBoard().setCommentCount(commentCount);

        return convertToDTO(product);
    }

    @Override
    public ProductDTO createProduct(ProductDTO productDto) {
        Product product = convertToEntity(productDto);
        Board board = saveBoard(product.getBoard());
        product.setBoard(board);

        File file = fileService.saveFile(productDto.getBoard().getBoardImage());
        boardImageService.saveBoardImage(board, file);

        Product createdProduct = productRepository.save(product);

        BoardCleanbotCheckReqDto boardCleanbotCheckReqDto = BoardCleanbotCheckReqDto.builder()
            .id(createdProduct.getBoard().getBoardId())
            .content(createdProduct.getBoard().getContent())
            .domain("board")
            .build();
        kafkaBoardCleanbotProducer.boardCleanbotCheck(boardCleanbotCheckReqDto);

        return convertToDTO(createdProduct);
    }

    @Override
    public ProductDTO updateProduct(Long boardId, ProductDTO productDto) {
        Product existingProduct = findProductByBoardId(boardId);
        updateExistingProduct(existingProduct, productDto);

        Board board = existingProduct.getBoard();
//        board.setBoardImage(productDto.getBoard().getBoardImage());

        Product updatedProduct = productRepository.save(existingProduct);

        File file = fileService.saveFile(productDto.getBoard().getBoardImage());
        boardImageService.saveBoardImage(board, file);


        BoardCleanbotCheckReqDto boardCleanbotCheckReqDto = BoardCleanbotCheckReqDto.builder()
            .id(boardId)
            .content(productDto.getBoard().getContent())
            .domain("board")
            .build();
        kafkaBoardCleanbotProducer.boardCleanbotCheck(boardCleanbotCheckReqDto);

        return convertToDTO(updatedProduct);
    }

    @Override
    public void deleteProduct(Long boardId) {
        Product productToDelete = findProductByBoardId(boardId);

        if (productToDelete != null) {
            productToDelete.getBoard().setDeleteAt(LocalDateTime.now());
        }

        productRepository.deleteById(productToDelete.getProductId());
    }


    @Override
    public Page<ProductDTO> searchProducts(SearchBoardConditionDto searchCondition,
        Pageable pageable) {
        Page<Product> products;

        if (searchCondition != null && searchCondition.getKeyword() != null) {
            products = productRepository.findByBoard_TitleContainingOrBoard_ContentContaining(
                searchCondition.getKeyword(),
                searchCondition.getKeyword(),
                pageable
            );
        } else {
            products = productRepository.findAll(pageable);
        }

        return products.map(product -> {
            ProductDTO productDTO = convertToDTO(product);

            if (product.getBoard() != null) {

                Long boardId = product.getBoard().getBoardId();
                Integer commentCount = commentRepository.countCommentsByBoardId(boardId);

                productDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);
            }

            return productDTO;
        });
    }

    @Override
    public Page<ProductDTO> getAllProductList(Pageable pageable) {
        Page<Product> products = productRepository.findAll(pageable);

        return products.map(product -> {
            ProductDTO productDTO = convertToDTO(product);

            if (product.getBoard() != null) {

                Long boardId = product.getBoard().getBoardId();
                Integer commentCount = commentRepository.countCommentsByBoardId(boardId);

                productDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);
            }

            return productDTO;
        });
    }

    @Override
    public List<ProductDTO> getMostRecentProducts(int count) {
        List<Product> recentProducts = productRepository.findByBoard_BoardType(
            Board.BoardType.PRODUCT,
            PageRequest.of(0, count, Sort.by(Sort.Direction.DESC, "board.createAt"))
        ).getContent();

        return recentProducts.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    private Product findProductByBoardId(Long boardId) {
        Page<Product> products = productRepository.findByBoard_BoardId(boardId, Pageable.unpaged());
        if (products.isEmpty()) {
            throw new RuntimeException("Product not found with boardId: " + boardId);
        }
        return products.getContent().get(0);
    }

    private Board saveBoard(Board board) {
        return boardRepository.save(board);
    }

    private void updateExistingProduct(Product existingProduct, ProductDTO productDto) {
        existingProduct.getBoard().setTitle(productDto.getBoard().getTitle());
        existingProduct.getBoard().setContent(productDto.getBoard().getContent());
        existingProduct.setPrice(productDto.getPrice());
        existingProduct.setDealFlag(productDto.isDealFlag());
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();
        BeanUtils.copyProperties(product, productDTO);
        productDTO.setBoard(BoardDTO.builder()
            .boardId(product.getBoard().getBoardId())
            .boardType(product.getBoard().getBoardType())
            .title(product.getBoard().getTitle())
            .content(product.getBoard().getContent())
            .createAt(product.getBoard().getCreateAt())
            .updateAt(product.getBoard().getUpdateAt())
            .deleteAt(product.getBoard().getDeleteAt())
            .userId(product.getBoard().getUserId())
//            .boardImage(product.getBoard().getBoardImage())
            .commentCount(commentRepository.countCommentsByBoardId(product.getBoard().getBoardId()))
            .build());
        return productDTO;
    }

    private Product convertToEntity(ProductDTO productDTO) {
        Product product = new Product();
        BeanUtils.copyProperties(productDTO, product);
        product.setBoard(Board.builder()
            .boardId(productDTO.getBoard().getBoardId())
            .boardType(productDTO.getBoard().getBoardType())
            .title(productDTO.getBoard().getTitle())
            .content(productDTO.getBoard().getContent())
            .createAt(productDTO.getBoard().getCreateAt())
            .updateAt(productDTO.getBoard().getUpdateAt())
            .deleteAt(productDTO.getBoard().getDeleteAt())
            .userId(productDTO.getBoard().getUserId())
//            .boardImage(productDTO.getBoard().getBoardImage())
            .build());
        return product;
    }
}
