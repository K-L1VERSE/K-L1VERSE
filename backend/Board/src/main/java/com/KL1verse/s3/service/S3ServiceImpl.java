//package com.KL1verse.s3.service;
//
//import com.KL1verse.Board.repository.entity.Board;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.model.PutObjectRequest;
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.util.List;
//import java.util.UUID;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class S3ServiceImpl implements S3Service {
//
//    @Value("${cloud.aws.s3.bucket}")
//    private String bucketName;
//
//    private final AmazonS3 s3Client;
//
//    @Override
//    public String uploadFile(MultipartFile file) {
//
//        if(file == null || file.isEmpty())
//            return "";
//        File fileObj = convertMultiPartFileToFile(file);
//        String originalFilename = file.getOriginalFilename();
//        String extension = getFileExtension(originalFilename);
//        String fileName = UUID.randomUUID() + "." + extension;
//
//        log.info("uploadFile fileName: {}", fileName);
//        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
//        fileObj.delete();
//        return s3Client.getUrl(bucketName, fileName).toString();
//    }
//
//    @Override
//    public String uploadFiles(List<MultipartFile> files) {
//        // 다중 업로드 && 리스트 ","을 기준으로 하나의 문자열 반환
//        // files 갯수 0 이면 반환 ""
//        if(files == null || files.size() == 0)
//            return "";
//
//        StringBuilder mergedUrl = new StringBuilder();
//        for (int i = 0; i < files.size(); i++) {
//            mergedUrl.append(uploadFile(files.get(i)));
//            if(i < files.size() - 1) {
//                mergedUrl.append(",");
//            }
//        }
//
//      if (!mergedUrl.isEmpty()) {
//        Board board = // 여기에 적절한 Board 객체를 가져오는 코드를 추가하세요.
//            boardImageRepository.saveBoardImages(board, mergedUrl);
//      }
//
//        log.info("uploadFiles mergedUrl: {}", mergedUrl);
//        return mergedUrl.toString();
//    }
//
//
//    @Override
//    public File convertMultiPartFileToFile(MultipartFile file) {
//        File convertedFile = new File(file.getOriginalFilename());
//        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
//            fos.write(file.getBytes());
//        } catch (IOException e) {
//            log.error("Error converting multipartFile to file", e);
//        }
//        return convertedFile;
//    }
//
//    @Override
//    public String getFileExtension(String originalFileName) {
//        return originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
//    }
//}
