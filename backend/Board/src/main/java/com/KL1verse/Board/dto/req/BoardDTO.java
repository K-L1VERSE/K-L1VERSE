package com.KL1verse.Board.dto.req;

import com.KL1verse.Board.repository.entity.Board.BoardType;
import java.time.LocalDateTime;
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
    private Integer userId;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private LocalDateTime deleteAt;
    private Integer commentCount;
    private String boardImage;



}
