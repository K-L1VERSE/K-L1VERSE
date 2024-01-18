package com.kl1verse.UserServer.domain.auth.service;

import com.kl1verse.UserServer.domain.auth.JwtUtil;
import com.kl1verse.UserServer.domain.auth.dto.req.SignInReqDto;
import com.kl1verse.UserServer.domain.auth.dto.req.SignUpReqDto;
import com.kl1verse.UserServer.domain.auth.dto.res.SignInResDto;
import com.kl1verse.UserServer.domain.auth.exception.TokenException;
import com.kl1verse.UserServer.domain.auth.repository.TokenRepository;
import com.kl1verse.UserServer.domain.auth.repository.entity.Token;
import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import com.kl1verse.UserServer.global.ResponseCode;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    // 회원 가입 여부 확인
    public boolean isExistUser(String email, String domain) {
        return userRepository.findByEmailAndDomain(email, domain).isPresent();
    }

    // 회원가입
    public void signUp(SignUpReqDto signUpReqDto) {

        log.info("new User SignUp = {} / {}", signUpReqDto.getEmail(), signUpReqDto.getDomain());

        boolean exsitUser = userRepository.findByEmailAndDomain(signUpReqDto.getEmail(), signUpReqDto.getDomain()).isPresent();
        if(exsitUser){
            throw new UserException(ResponseCode.USER_ALREADY_EXIST_ERROR);
        }

        User user = User.builder()
            .email(signUpReqDto.getEmail())
            .password(passwordEncoder.encode("1234"))
            .name(signUpReqDto.getName())
            .profile(signUpReqDto.getProfile())
            .domain(signUpReqDto.getDomain())
            .build();
        userRepository.save(user);
    }

    // 로그인
    @Transactional
    public SignInResDto signIn(SignInReqDto signInDto) {
        User user = userRepository.findByEmailAndDomain(signInDto.getEmail(), signInDto.getDomain())
            .orElseThrow(() -> new UserException(ResponseCode.INVALID_USER_INFO));
        Optional<Token> token = tokenRepository.findByUserId(user.getId());

        // accessToken 생성
        Authentication authentication = null;
        authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(signInDto.getEmail(), "1234")
        );
        String accessToken = jwtUtil.createAccessToken(authentication, signInDto.getDomain());

        // refreshToken 생성
        jwtUtil.createRefreshToken(authentication, user);

        return SignInResDto.builder()
            .email(user.getEmail())
            .accessToken(accessToken)
            .name(user.getName())
            .profile(user.getProfile())
            .domain(user.getDomain())
            .build();
    }

    // 로그아웃
    @Transactional
    public void signOut(HttpServletRequest request) {
        String requestToken = jwtUtil.resolveToken(request);
        String email = jwtUtil.extractUserNameFromExpiredToken(requestToken);
        String domain = jwtUtil.extractUserDomainFromExpiredToken(requestToken);
        log.info("signOut = {} / {}", email, domain);

        User user = userRepository.findByEmailAndDomain(email, domain).orElseThrow(() -> new UserException(
            ResponseCode.INVALID_USER_INFO));
        Token token = tokenRepository.findByUserId(user.getId()).orElseThrow(() -> new TokenException(
            ResponseCode.INVALID_TOKEN_INFO));
        tokenRepository.delete(token);
    }
}
