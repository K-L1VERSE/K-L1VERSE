package com.KL1verse.match.team.repository.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "member")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@ToString
public class Member {

    @Id
    @Column(name = "member_id")
    private int memberId;

    @ManyToOne
    private Team team;

    private String name;

    @Column(name = "back_number")
    private String backNumber;

    private String position;

    private String profile;


}
