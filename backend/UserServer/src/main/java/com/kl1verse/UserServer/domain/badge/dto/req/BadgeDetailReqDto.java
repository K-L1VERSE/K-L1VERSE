package com.kl1verse.UserServer.domain.badge.dto.req;

import lombok.Getter;

@Getter
public class BadgeDetailReqDto {

    private String code;
    private String description;
    private Integer price;
}
