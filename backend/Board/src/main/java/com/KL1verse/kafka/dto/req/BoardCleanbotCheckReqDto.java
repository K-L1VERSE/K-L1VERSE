package com.KL1verse.kafka.dto.req;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardCleanbotCheckReqDto {

    Long id;
    String domain;
    String content;
}
