package com.KL1verse.Product.dto.req;

import com.KL1verse.Board.dto.req.BoardDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

        private Long productId;
        private Long boardId;
        private double price;
        private boolean dealFlag;

        private BoardDTO board;
}


