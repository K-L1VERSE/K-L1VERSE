package com.kl1verse.UserServer.domain.kafka.dto.req;

import lombok.Getter;

import java.util.List;

@Getter
public class NewsNotificationListReqDto {
    String badgeDetailId;
    List<String> title;
    List<String> uri;
}
