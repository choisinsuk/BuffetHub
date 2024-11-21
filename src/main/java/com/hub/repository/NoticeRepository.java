package com.hub.repository;

import com.hub.domain.NoticeBoard;


import org.springframework.data.jpa.repository.JpaRepository;


public interface NoticeRepository extends JpaRepository<NoticeBoard, Long> {

}
