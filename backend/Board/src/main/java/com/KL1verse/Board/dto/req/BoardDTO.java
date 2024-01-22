package com.KL1verse.Board.dto.req;

import com.KL1verse.Board.repository.entity.Board.BoardType;
import java.util.Date;
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
public class BoardDTO {

    private Long boardId;
    private BoardType boardType;
    private String title;
    private String content;
    private Date createAt;
    private Date updateAt;
    private Date deleteAt;
}


