package com.KL1verse.s3.repository;

import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.s3.repository.entity.BoardImage;
import com.KL1verse.s3.repository.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardImageRepository extends JpaRepository<BoardImage, Long> {

}
