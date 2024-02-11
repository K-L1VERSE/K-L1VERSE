package com.KL1verse.Comment.dto.req;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CommentDTO {

    private Long commentId;
    private Integer userId;
    private String content;
    private Long boardId;
    private Long parentId;
    private List<CommentDTO> replies;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private LocalDateTime deleteAt;
    private Boolean isSecret;
    private int likesCount;
    private String nickname;
    private boolean isLiked;
    private String profile;
    private String mainBadge;
}
