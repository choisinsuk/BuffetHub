package com.hub.service;

import com.hub.dto.PriceTableDTO;

public interface PriceTableAdminService {
	
	// 여러 가격 레코드를 조회하는 서비스
	PriceTableDTO getPriceTable();
    
	// 가격 정보를 업데이트하고 업데이트된 PriceTableDTO를 반환하는 메서드
	PriceTableDTO updatePriceTable(Long id, PriceTableDTO priceTableDTO);
}
