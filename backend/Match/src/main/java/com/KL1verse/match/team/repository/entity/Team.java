package com.KL1verse.match.team.repository.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "team")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@ToString
public class Team {

    @Id
    @Column(name = "team_id")
    private int teamId;

    private String teamName;

    @Column(name = "team_description")
    private String teamDescription;

    @OneToMany
    private List<Member> member;

}
