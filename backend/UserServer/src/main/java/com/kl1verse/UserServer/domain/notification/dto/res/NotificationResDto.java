package com.kl1verse.UserServer.domain.notification.dto.res;

import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
public class NotificationResDto {

    NotificationType type;
    Integer notificationId;
    String profile;
    String nickname;
    String homeTeamId;
    String awayTeamId;
    String content;
    String uri;
    Boolean readFlag;
}
