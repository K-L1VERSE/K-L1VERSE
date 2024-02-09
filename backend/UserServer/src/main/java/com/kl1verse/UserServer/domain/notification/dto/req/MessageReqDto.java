package com.kl1verse.UserServer.domain.notification.dto.req;

import java.time.LocalDateTime;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class MessageReqDto {

    @Getter
    @RequiredArgsConstructor
    public enum NotificationType {
        COMMENT("COMMENT"),
        LIKE("LIKE"),
        GOAL("GOAL"),
        MATCH("MATCH"),
        NEWS("NEWS");

        private final String value;

        public static NotificationType ofValue(String value) {
            for (NotificationType type : values()) {
                if (type.name().equals(value)) {
                    return type;
                }
            }
            return null;
        }
    }

    private NotificationType type;
    private Integer userId;
    private String profile;
    private String nickname;
    private String homeTeamId;
    private String awayTeamId;
    private String message;
    private String uri;
    private LocalDateTime date;

}
