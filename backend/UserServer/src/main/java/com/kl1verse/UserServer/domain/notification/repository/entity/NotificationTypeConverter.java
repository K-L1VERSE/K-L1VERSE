package com.kl1verse.UserServer.domain.notification.repository.entity;

import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import static com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto.*;

@Converter
public class NotificationTypeConverter implements AttributeConverter<NotificationType, String> {
    @Override
    public String convertToDatabaseColumn(NotificationType attribute) {
        if(attribute != null) {
            return attribute.getValue();
        }
        return null;
    }

    @Override
    public NotificationType convertToEntityAttribute(String dbData) {
        if(dbData != null) {
            return NotificationType.ofValue(dbData);
        }
        return null;
    }
}
