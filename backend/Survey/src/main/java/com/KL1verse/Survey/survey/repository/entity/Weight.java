package com.KL1verse.Survey.survey.repository.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "Weight")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@ToString
public class Weight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long weightId;

    @ElementCollection
    private List<Integer> weights;


}
