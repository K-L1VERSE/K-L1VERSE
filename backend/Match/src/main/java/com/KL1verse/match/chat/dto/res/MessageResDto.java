package com.KL1verse.match.chat.dto.res;

import com.KL1verse.match.chat.dto.req.MessageReqDto;
import lombok.Builder;

@Builder
public class MessageResDto {

    public enum MessageType {
        ENTER, TALK
    }

    private MessageReqDto.MessageType type;
    private Long messageId;
    private Long roomId;
    private String sender;
    private String message;
    private String date;
    private String profile;

}
