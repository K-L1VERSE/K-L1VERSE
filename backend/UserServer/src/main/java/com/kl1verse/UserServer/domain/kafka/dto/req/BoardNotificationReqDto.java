package com.kl1verse.UserServer.domain.kafka.dto.req;

import lombok.Getter;

@Getter
public class BoardNotificationReqDto {

    public static enum BoardNotificationType {
        COMMENT, LIKE
    }

    String userId;
    String message;
    String uri;
    BoardNotificationType type;
}
