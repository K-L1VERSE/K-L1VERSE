package com.KL1verse.Comment.dto.req;

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
public class CommentLikeDTO {

    private Long commentLikeId;
    private Long userId;
    private Long commentId;

}
