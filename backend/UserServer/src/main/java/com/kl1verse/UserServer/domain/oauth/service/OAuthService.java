package com.kl1verse.UserServer.domain.oauth.service;


public interface OAuthService {
    public void socialLogin(String code, String registrationId);
}
