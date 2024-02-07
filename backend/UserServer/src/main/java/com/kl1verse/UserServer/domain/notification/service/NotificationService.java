package com.kl1verse.UserServer.domain.notification.service;

import com.kl1verse.UserServer.domain.auth.JwtUtil;
import com.kl1verse.UserServer.domain.kafka.dto.req.NotificationListReqDto;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto.NotificationType;
import com.kl1verse.UserServer.domain.notification.dto.res.NotificationResDto;
import com.kl1verse.UserServer.domain.notification.repository.NotificationRepository;
import com.kl1verse.UserServer.domain.notification.repository.entity.Notification;
import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import com.kl1verse.UserServer.global.ResponseCode;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final SimpMessageSendingOperations sendingOperations;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Transactional
    public void sendNotification(MessageReqDto messageReqDto) {

        log.info("Notification Event: {}", messageReqDto.getType().toString() + " / " + messageReqDto.getMessage());

        User user = userRepository.findById(messageReqDto.getUserId()).orElseThrow(() ->
            new UserException(ResponseCode.INVALID_USER_INFO));

        Notification notification = Notification.builder()
            .user(user)
            .content(messageReqDto.getMessage())
            .uri(messageReqDto.getUri())
            .readFlag(false)
            .type(messageReqDto.getType())
            .createdAt(messageReqDto.getDate())
            .build();

        notificationRepository.save(notification);
        NotificationResDto notificationResDto = NotificationResDto.builder()
            .uri(messageReqDto.getUri())
            .content(messageReqDto.getMessage())
            .readFlag(false)
            .type(messageReqDto.getType())
            .build();

        sendingOperations.convertAndSend("/topic/notification/" + user.getEmail()+":"+user.getDomain(), notificationResDto);
    }

    /*
    * Notification.save() Transaction을 한꺼번에 처리하기 위해 복수 알림 처리를 위한 메소드
    */
    @Transactional
    public void sendNotifications(List<MessageReqDto> messageReqDtoList) {

        for(MessageReqDto messageReqDto : messageReqDtoList) {
            log.info("Notification Event: {}", messageReqDto.getType().toString() + " / " + messageReqDto.getMessage());

            Optional<User> userOptional = userRepository.findById(messageReqDto.getUserId());
            if(userOptional.isEmpty()) {
                continue;
            }
            User user = userOptional.get();

            Notification notification = Notification.builder()
                .user(user)
                .content(messageReqDto.getMessage())
                .uri(messageReqDto.getUri())
                .readFlag(false)
                .type(messageReqDto.getType())
                .createdAt(messageReqDto.getDate())
                .build();

            log.info("type = {}", messageReqDto.getType().toString());
            notificationRepository.save(notification);
            NotificationResDto notificationResDto = NotificationResDto.builder()
                .uri(messageReqDto.getUri())
                .content(messageReqDto.getMessage())
                .readFlag(false)
                .type(messageReqDto.getType())
                .build();

            sendingOperations.convertAndSend("/topic/notification/" + user.getEmail()+":"+user.getDomain(), notificationResDto);
        }
    }

    public List<NotificationResDto> getNotifications(HttpServletRequest request) {
        /*
         * accessToken으로 유저 정보를 가져온다.
         */
        String requestToken = jwtUtil.resolveToken(request);
        String email = jwtUtil.extractUserNameFromExpiredToken(requestToken);
        String domain = jwtUtil.extractUserDomainFromExpiredToken(requestToken);

        User user = userRepository.findByEmailAndDomain(email, domain).orElseThrow(
            () -> new UserException(ResponseCode.INVALID_USER_INFO));

        List<Notification> notifications = notificationRepository.findByUserId(user.getId());
        List<NotificationResDto> notificationResDtos = new ArrayList<>();
        for (Notification notification : notifications) {
            notificationResDtos.add(NotificationResDto.builder()
                .content(notification.getContent())
//                .createdAt(notification.getCreatedAt())
                .readFlag(notification.getReadFlag())
                .type(notification.getType())
                .uri(notification.getUri())
                .build());
        }

        return notificationResDtos;
    }

    @Transactional
    public void readNotifications(HttpServletRequest request) {
        /*
         * accessToken으로 유저 정보를 가져온다.
         */
        String requestToken = jwtUtil.resolveToken(request);
        String email = jwtUtil.extractUserNameFromExpiredToken(requestToken);
        String domain = jwtUtil.extractUserDomainFromExpiredToken(requestToken);

        User user = userRepository.findByEmailAndDomain(email, domain).orElseThrow(
            () -> new UserException(ResponseCode.INVALID_USER_INFO));

        List<Notification> notifications = notificationRepository.findByUserId(user.getId());
        for (Notification notification : notifications) {
            if(!notification.getReadFlag()) {
                notification.setReadFlag(true);
                notificationRepository.save(notification);
            }
        }

        log.info("user {}:{} read notifications", user.getEmail(), user.getDomain());
    }

}
