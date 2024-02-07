//package com.kl1verse.UserServer.domain.auth;
//
//import com.kl1verse.UserServer.domain.auth.repository.TokenRepository;
//import com.kl1verse.UserServer.domain.user.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.DefaultSecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@RequiredArgsConstructor
//public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
//
//    private final JwtUtil jwtUtil;
//    private final UserRepository userRepository;
//    private final TokenRepository tokenRepository;
//
//    @Override
//    public void configure(HttpSecurity httpSecurity) throws Exception {
//        JwtFilter filter = new JwtFilter(jwtUtil, userRepository, tokenRepository);
//        httpSecurity.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
//    }
//
//}
