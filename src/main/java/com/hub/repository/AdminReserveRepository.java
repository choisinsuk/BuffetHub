package com.hub.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hub.domain.Reserve;

// 데이터베이스와 상호작용하는 부분.
// JPARepository는 기본적인 CRUD (생성,조회,수정,삭제) 작업을 자동으로 제공한다.
// Spring Data JPA가 인터페이스를 구현하여 데이터베이스와의 상호작용을 효율적으로 처리

@Repository // 이 인터페이스가 데이터베이스 레포지토리임을 나타냄
public interface AdminReserveRepository extends JpaRepository<Reserve, Long>{
	
	//DB예약 정보를 내림차순 정렬을 하기 위해 사용
	List<Reserve> findAllByOrderByRsDtDesc();
	// 필요한 경우 쿼리 메서드를 추가할 수 있음

	List<Reserve> findByrsDt(LocalDate rsDt);

	List<Reserve> findByrsNm(String rsNm);
}

// -> 컨트롤러 
