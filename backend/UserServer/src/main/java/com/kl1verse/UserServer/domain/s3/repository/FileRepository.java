package com.kl1verse.UserServer.domain.s3.repository;

import com.kl1verse.UserServer.domain.s3.repository.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {

}
