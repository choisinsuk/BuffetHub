package com.hub.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hub.domain.Reserve;
import com.hub.domain.User;

public interface ReserveRepository extends JpaRepository<Reserve, Long> {

	// urId로 데이터 조회하는 메서드
	Page<Reserve> findByUser(User user, Pageable pageable);

	// 진행중인 예약 조회
	@Query("SELECT r FROM Reserve r WHERE r.user.urId = :urId AND r.rsDt >= :today")
	Page<Reserve> findActiveReservationsByUrId(@Param("urId") String urId, @Param("today") LocalDateTime today,
			Pageable pageable);

	// 결제 완료된 예약 조회
	@Query("SELECT r FROM Reserve r WHERE r.user.urId = :urId AND r.rsPaymentCompleteYn = true")
	Page<Reserve> findPaidReservationsByUrId(@Param("urId") String urId, Pageable pageable);
}
