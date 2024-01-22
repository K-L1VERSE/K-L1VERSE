package com.KL1verse.Board.board.dto.req;

import com.KL1verse.Board.board.repository.entity.BoardType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

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
}


