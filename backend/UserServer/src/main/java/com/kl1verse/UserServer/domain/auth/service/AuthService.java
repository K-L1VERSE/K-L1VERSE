package com.kl1verse.UserServer.domain.auth.service;

import com.kl1verse.UserServer.domain.auth.JwtUtil;
import com.kl1verse.UserServer.domain.auth.dto.req.SignInReqDto;
import com.kl1verse.UserServer.domain.auth.dto.req.SignUpReqDto;
import com.kl1verse.UserServer.domain.auth.dto.res.SignInResDto;
import com.kl1verse.UserServer.domain.auth.repository.TokenRepository;
import com.kl1verse.UserServer.domain.auth.repository.entity.Token;
import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import com.kl1verse.UserServer.global.ResponseCode;
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

    // 회원가입
    public void signUp(SignUpReqDto signUpReqDto) {
        boolean exsitUser = userRepository.findByEmail(signUpReqDto.getEmail()).isPresent();
        if(exsitUser){
            throw new UserException(ResponseCode.USER_ALREADY_EXIST_ERROR);
        }

        User user = User.builder()
            .email(signUpReqDto.getEmail())
            .password(passwordEncoder.encode("1234"))
            .name(signUpReqDto.getName())
            .build();
        userRepository.save(user);
    }

    // 로그인
    @Transactional
    public SignInResDto signIn(SignInReqDto signInDto) {
        User user = userRepository.findByEmail(signInDto.getEmail())
            .orElseThrow(() -> new UserException(ResponseCode.INVALID_USER_INFO));
        log.info("email = {}", user.getEmail());
        Optional<Token> token = tokenRepository.findByUserId(user.getId());

        // 로그인 시에는 무조건 서버의 refreshToken 삭제
        if (token.isPresent()) {
            Long tokenId = token.get().getId();
//            user.setToken(null);
            tokenRepository.deleteById(tokenId);
        }

        // accessToken 생성
        Authentication authentication = null;
        log.info("authentication before");
        authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(signInDto.getEmail(), "1234")
        );
        log.info("authentication = {}", authentication);
        String accessToken = jwtUtil.createAccessToken(authentication);
        log.info("accessToken = {}", accessToken);

        // refreshToken 생성
        jwtUtil.createRefreshToken(authentication, user);

        return new SignInResDto(user.getEmail(), accessToken, user.getName());
    }
}
