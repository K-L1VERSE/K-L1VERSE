package com.kl1verse.UserServer.domain.s3.controller;

import com.kl1verse.UserServer.domain.s3.service.S3Service;
import com.kl1verse.UserServer.global.dto.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class S3Controller {
    private final S3Service s3Service;

    @GetMapping("/test")
    public BaseResponse<Void> test() {
        return BaseResponse.success(null);
    }

    @PostMapping("/upload")
    public BaseResponse<String> uploadFile(@RequestParam(value = "file") MultipartFile file) {
        log.info("file Upload");
        return BaseResponse.success(s3Service.uploadFile(file));
    }

    @PostMapping("/uploads")
    public BaseResponse<String> uploadFiles(@RequestParam(value = "files") List<MultipartFile> files) {
        log.info("files Upload");
        return BaseResponse.success(s3Service.uploadFiles(files));
    }
}