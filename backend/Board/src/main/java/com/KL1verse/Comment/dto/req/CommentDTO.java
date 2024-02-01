package com.KL1verse.Comment.dto.req;

import java.time.LocalDateTime;
import java.util.List;
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
public class CommentDTO {

    private Long commentId;
    private Long userId;
    private String content;
    private Long boardId;
    private Long parentId;
    private List<CommentDTO> replies;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private LocalDateTime deleteAt;
    private boolean isSecret;
    private int likesCount;
}
