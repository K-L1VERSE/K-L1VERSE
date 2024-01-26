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

        private BoardDTO board;

        private Long price;

        private boolean dealFlag;

}
