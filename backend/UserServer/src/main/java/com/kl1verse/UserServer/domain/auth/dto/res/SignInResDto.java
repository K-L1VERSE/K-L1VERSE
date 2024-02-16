package com.kl1verse.UserServer.domain.auth.dto.res;

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
public class SignInResDto {
    private String email;
    private String accessToken;
    private String nickname;
    private String profile;
    private String domain;
    private Integer userId;
    private String mainBadge;
    private Boolean notificationFlag;
    private Integer goal;
}
