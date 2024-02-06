package com.KL1verse.match.chat.dto.req;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
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
    private String profile;

}
