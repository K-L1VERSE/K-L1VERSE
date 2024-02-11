package com.kl1verse.UserServer.domain.kafka.dto.req;

import lombok.Getter;

@Getter
public class BoardNotificationReqDto {

    public static enum BoardNotificationType {
        COMMENT, LIKE, GOAL
    }

    Integer userId;
    String profile;
    String nickname;
    String message;
    String uri;
    BoardNotificationType type;
}
