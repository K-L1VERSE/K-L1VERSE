package com.kl1verse.UserServer.domain.notification.dto.res;

import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationResDto {

    NotificationType type;
    String content;
    String uri;
    Boolean readFlag;
}
