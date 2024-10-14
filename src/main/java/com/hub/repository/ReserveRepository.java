package com.hub.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hub.domain.Reserve;
import com.hub.domain.User;

public interface ReserveRepository extends JpaRepository<Reserve, Long>{
	
	// urId로 데이터 조회하는 메서드 추가
    Page<Reserve> findByUser(User user, Pageable pageable);

}
