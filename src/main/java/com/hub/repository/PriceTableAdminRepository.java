package com.hub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hub.domain.PriceTable;

public interface PriceTableAdminRepository extends JpaRepository<PriceTable, Long>{

}
