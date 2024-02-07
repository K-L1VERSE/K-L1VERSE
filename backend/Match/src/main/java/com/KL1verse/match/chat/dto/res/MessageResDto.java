package com.KL1verse.match.chat.dto.res;

import com.KL1verse.match.chat.dto.req.MessageReqDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MessageResDto {

    public enum MessageType {
        TALK, REJECT
    }

    private MessageResDto.MessageType type;
    private Long messageId;
    private Long roomId;
    private String sender;
    private String message;
    private String date;
    private String profile;

}
