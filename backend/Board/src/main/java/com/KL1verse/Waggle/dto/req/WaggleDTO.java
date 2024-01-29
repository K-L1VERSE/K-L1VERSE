package com.KL1verse.Waggle.dto.req;

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
public class WaggleDTO {

    private Long waggleId;

    private BoardDTO board;


}


