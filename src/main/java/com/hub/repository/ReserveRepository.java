package com.hub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hub.domain.Reserve;
import com.hub.dto.ReserveListDTO;

public interface ReserveRepository extends JpaRepository<Reserve, Long>{
	
//	@Query("select tbl")
//	public List<ReserveListDTO> get

}
