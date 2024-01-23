package com.kl1verse.UserServer.domain.notification.dto.req;

import lombok.Getter;

@Getter
public class MessageReqDto {

    public static enum NotificationType {
        COMMENT, LIKE, GOAL, MATCH
    }

    private NotificationType type;
    private Integer userId;
    private String message;
    private String uri;
    private String date;

}
