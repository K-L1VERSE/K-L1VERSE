package com.kl1verse.UserServer.domain.s3.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

public interface S3Service {
    public String uploadFile(MultipartFile file);

    public String uploadFiles(List<MultipartFile> files);


    // public byte[] downloadFile(String image);


    public String deleteFile(String fileName);

    public File convertMultiPartFileToFile(MultipartFile file);

    public String getFileExtension(String originalFileName);
}
