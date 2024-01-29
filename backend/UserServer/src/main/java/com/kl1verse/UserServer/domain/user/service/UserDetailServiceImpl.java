package com.kl1verse.UserServer.domain.user.service;

import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import com.kl1verse.UserServer.global.ResponseCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        // username을 email과 domain으로 나누어서 추출
        String[] parts = username.split(":");
        if (parts.length != 2) {
            throw new UserException(ResponseCode.INVALID_USER_FORM);
        }

        User user = userRepository.findByEmailAndDomain(parts[0], parts[1]).orElseThrow(() -> new UserException(ResponseCode.INVALID_USER_INFO));
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        return new CustomUserDetails(user.getEmail(), user.getPassword(), user.getDomain() ,grantedAuthorities);
    }

    public static class CustomUserDetails extends org.springframework.security.core.userdetails.User {
        private final String domain;

        public CustomUserDetails(String username, String password, String domain, Collection<? extends GrantedAuthority> authorities) {
            super(username, password, authorities);
            this.domain = domain;
        }

        public String getDomain() {
            return domain;
        }
    }
}
