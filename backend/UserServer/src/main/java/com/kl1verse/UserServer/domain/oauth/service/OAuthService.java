package com.kl1verse.UserServer.domain.oauth.service;


import com.kl1verse.UserServer.domain.auth.dto.res.SignInResDto;

public interface OAuthService {
    public SignInResDto socialLogin(String code, String registrationId);
}
