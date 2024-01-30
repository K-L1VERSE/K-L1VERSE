package com.kl1verse.UserServer.domain.s3.service;

import com.kl1verse.UserServer.domain.s3.repository.UserImageRepository;
import com.kl1verse.UserServer.domain.s3.repository.entity.File;
import com.kl1verse.UserServer.domain.s3.repository.entity.UserImage;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserImageService {

    private final UserImageRepository userImageRepository;

    public void saveUserImage(User user, File file) {
        userImageRepository.save(UserImage.builder()
                .user(user)
                .file(file)
                .build());
    }
}
