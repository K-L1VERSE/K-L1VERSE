package com.KL1verse.Board.board.dto;

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
class MateDTO {

    private Long mateId;
    private Long boardId;
    private int total;
    private boolean fullFlag;
    private String matchId;


}
