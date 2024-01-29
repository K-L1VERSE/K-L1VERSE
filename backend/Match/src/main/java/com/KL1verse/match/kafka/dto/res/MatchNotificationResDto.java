package com.KL1verse.match.kafka.dto.res;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class MatchNotificationResDto {

    List<Integer> userIdList;
    String uri;
}
