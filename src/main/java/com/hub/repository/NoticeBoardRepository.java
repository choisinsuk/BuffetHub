package com.hub.repository;

import com.hub.domain.NoticeBoard;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// 공지사항에 대한 CRUD 작업을 수행하기 위한 레포지토리 인터페이스
@Repository
public interface NoticeBoardRepository extends JpaRepository<NoticeBoard, Long> {
    // JpaRepository를 상속받아 기본 CRUD 메소드 제공
    // 추가적인 쿼리 메소드가 필요하다면 여기 추가
	
	List<NoticeBoard> findAll();
}
