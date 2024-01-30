package com.kl1verse.UserServer.domain.s3.service;

import com.kl1verse.UserServer.domain.s3.repository.FileRepository;
import com.kl1verse.UserServer.domain.s3.repository.entity.File;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    public File saveFile(String uri) {
        return fileRepository.save(File.builder()
                .uri(uri)
                .createdAt(LocalDateTime.now())
                .build());
    }
}
