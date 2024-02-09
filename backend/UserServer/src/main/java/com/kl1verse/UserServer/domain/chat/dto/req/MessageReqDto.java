package com.kl1verse.UserServer.domain.chat.dto.req;

import lombok.Getter;

@Getter
public class MessageReqDto {

    public enum MessageType {
        ENTER, TALK
    }

    private MessageType type;
    private Long roomId;
    private String sender;
    private String message;
    private String date;

}
