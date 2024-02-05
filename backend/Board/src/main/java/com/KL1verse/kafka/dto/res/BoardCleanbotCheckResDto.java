package com.KL1verse.kafka.dto.res;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardCleanbotCheckResDto {

    Long id;
    String domain;
    String content;
}
