package com.KL1verse.match.kafka.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CleanbotCheckResDto {

    Long messageId;
    Long roomId;
    Boolean result;
}