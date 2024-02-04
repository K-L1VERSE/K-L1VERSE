package com.KL1verse.kafka.dto.res;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class BoardNotificationResDto {

    public static enum BoardNotificationType {
        COMMENT, LIKE
    }

    String userId;
    String message;
    String uri;
    BoardNotificationType type;
}
