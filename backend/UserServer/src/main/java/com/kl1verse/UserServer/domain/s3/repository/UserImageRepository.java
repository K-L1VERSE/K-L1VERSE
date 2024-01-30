package com.kl1verse.UserServer.domain.s3.repository;

import com.kl1verse.UserServer.domain.s3.repository.entity.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserImageRepository extends JpaRepository<UserImage, Long> {

}
