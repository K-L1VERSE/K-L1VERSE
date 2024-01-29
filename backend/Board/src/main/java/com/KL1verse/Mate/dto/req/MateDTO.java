package com.KL1verse.Mate.dto.req;

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
public class MateDTO {

    private Long mateId;
    private BoardDTO board;
    private int total;
    private boolean fullFlag;
    private int matchId;

}
