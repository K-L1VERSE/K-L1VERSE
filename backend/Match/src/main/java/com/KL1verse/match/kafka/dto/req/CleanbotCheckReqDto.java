package com.KL1verse.match.kafka.dto.req;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CleanbotCheckReqDto {

    private Long roomId;
    private Long messageId;
    private String content;
    private String domain;
}
