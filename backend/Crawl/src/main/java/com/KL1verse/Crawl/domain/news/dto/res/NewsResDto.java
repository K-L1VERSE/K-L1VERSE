package com.KL1verse.Crawl.domain.news.dto.res;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class NewsResDto {

    private String badgeDetailId;
    private List<String> title;
    private List<String> uri;
}
