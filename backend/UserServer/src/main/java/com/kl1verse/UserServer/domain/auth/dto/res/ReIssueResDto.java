package com.kl1verse.UserServer.domain.auth.dto.res;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ReIssueResDto {
    private String accessToken;

    public ObjectNode toJson(){
        ObjectNode json = new ObjectMapper().createObjectNode();
        json.put("accessToken", String.valueOf(accessToken));
        return json;
    }
}
