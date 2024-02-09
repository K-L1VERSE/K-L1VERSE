package com.KL1verse.Waggle.dto.req;

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
public class WaggleLikeDTO {

    private Long likesId;

    private Integer userId;

    private Long waggleId;

}