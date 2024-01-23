package com.kl1verse.UserServer.domain.user.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MypageResponseDto {

    Integer userId;
    String nickname;
    String profile;
    String mainBadge;
    Integer goal;
    Float accurate;
    Integer totalBet;
    Integer winBet;
}

