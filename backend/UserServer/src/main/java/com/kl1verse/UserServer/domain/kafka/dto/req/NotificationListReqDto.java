package com.kl1verse.UserServer.domain.kafka.dto.req;

import java.util.List;
import lombok.Getter;

@Getter
public class NotificationListReqDto {

    List<Integer> userIdList;
    String uri;
}
