package com.kl1verse.UserServer.domain.user.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NostradamusResponse {

    private String nickname;
    private int winBet;
    private int accurate;
}
