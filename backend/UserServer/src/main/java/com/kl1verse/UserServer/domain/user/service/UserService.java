package com.kl1verse.UserServer.domain.user.service;

import com.kl1verse.UserServer.domain.kafka.dto.req.BoardNotificationReqDto;
import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import com.kl1verse.UserServer.global.ResponseCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void addTenGoal(Integer userId) {

        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isEmpty()) {
            throw new UserException(ResponseCode.INVALID_USER_INFO);
        }

        User user = userOptional.get();
        user.setGoal(user.getGoal() + 10);
        userRepository.save(user);
    }
}
