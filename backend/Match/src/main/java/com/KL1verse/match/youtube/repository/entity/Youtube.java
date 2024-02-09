package com.KL1verse.match.youtube.repository.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@ToString
@DynamicUpdate
@Entity(name = "youtube")
public class Youtube {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rank")
    private int rank;

    @Column(name = "youtube_id")
    private String youtubeId;

    @Column(name = "saved_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime savedAt;

    @Column(name="thumbnail")
    private String thumbnail;
}
