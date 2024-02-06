package com.KL1verse.kafka.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CleanbotCheckResDto {

    Long id;
    String domain;
    Boolean result;
}
