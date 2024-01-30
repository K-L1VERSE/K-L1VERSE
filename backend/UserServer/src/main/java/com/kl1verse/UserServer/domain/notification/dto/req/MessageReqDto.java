package com.kl1verse.UserServer.domain.notification.dto.req;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class MessageReqDto {

    public static enum NotificationType {
        COMMENT, LIKE, GOAL, MATCH
    }

    private NotificationType type;
    private Integer userId;
    private String message;
    private String uri;
    private LocalDateTime date;

}
