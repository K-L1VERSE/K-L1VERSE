package com.KL1verse.s3.repository;

import com.KL1verse.s3.repository.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {

}
