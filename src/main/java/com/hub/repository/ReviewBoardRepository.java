package com.hub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hub.domain.ReviewBoard;

public interface ReviewBoardRepository extends JpaRepository<ReviewBoard, Long>{

}
