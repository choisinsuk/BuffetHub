package com.hub.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hub.domain.Reserve;

import lombok.extern.log4j.Log4j2;

@Log4j2
@SpringBootTest
public class ReserveRepositoryTests {

	@Autowired
	private ReserveRepository reserveRepository;
	
	@Test
	public void testInsert() {
		
		
		
		for (int i = 1; i <= 10; i++) {
			Reserve reserve = Reserve.builder().rs_total_person_cnt(i).
					rs_adult_person_cnt(i).rs_child_person_cnt(0).rs_preage_person_cnt(0).
					rs_visit_adult_cnt(i).rs_visit_child_cnt(0).rs_visit_preage_cnt(0).
					rs_visit_total_cnt(i).rs_visit_yn(true).rs_payment_complete_yn(true).
					rs_realpeople_cnt(i).build();
			
			reserveRepository.save(reserve);
			
			
		}
	}
}
