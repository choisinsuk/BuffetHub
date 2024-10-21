package com.hub.service;
import com.hub.dto.PriceTableDTO;

public interface PriceTableAdminService {
	
	// 여러 가격 레코드를 조회하는 서비스
	PriceTableDTO getPriceTable();
    
	void updatePriceTable(Long id, PriceTableDTO priceTableDTO);
}
