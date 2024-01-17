package com.kl1verse.UserServer.domain.s3.controller;

import com.kl1verse.UserServer.domain.s3.dto.res.S3ResDto;
import com.kl1verse.UserServer.domain.s3.service.S3Service;
import com.kl1verse.UserServer.global.dto.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class S3Controller {

    private final S3Service s3Service;

    @PostMapping("/upload")
    public ResponseEntity<S3ResDto> uploadFile(@RequestParam(value = "file") List<MultipartFile> file) {
        log.info("file Upload");
        String url = "";
        if (file.size() == 1) {
            url = s3Service.uploadFile(file.get(0));
        } else if (file.size() > 1) {
            url =  s3Service.uploadFiles(file);
        }

        return ResponseEntity.ok().body(new S3ResDto(url));
    }

}