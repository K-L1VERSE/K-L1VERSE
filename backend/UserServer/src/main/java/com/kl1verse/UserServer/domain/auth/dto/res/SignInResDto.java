package com.kl1verse.UserServer.domain.auth.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignInResDto {
    private String email;
    private String accessToken;
    private String name;
    private String profile;
}
