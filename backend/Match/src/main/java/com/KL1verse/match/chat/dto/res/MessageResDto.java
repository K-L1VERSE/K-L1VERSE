package com.KL1verse.match.chat.dto.res;

import com.KL1verse.match.chat.dto.req.MessageReqDto;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MessageResDto {

    public enum MessageType {
        TALK, REJECT
    }

    private String type;
    private Long messageId;
    private Long roomId;
    private String sender;
    private String message;
    private String date;
    private String profile;
    private String mainBadge;

}
