package com.KL1verse.Board.board.repository;

import com.KL1verse.Survey.survey.repository.entity.Answer;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaggleLikeRepository extends JpaRepository<WaggleLike, Long> {


}
