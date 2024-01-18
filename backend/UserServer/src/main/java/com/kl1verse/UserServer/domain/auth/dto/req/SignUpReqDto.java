package com.kl1verse.UserServer.domain.auth.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpReqDto {

    private String email;
    private String name;
    private String profile;
    private String domain;

}
