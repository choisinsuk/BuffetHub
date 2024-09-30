package com.hub.service;

import com.hub.dto.BuffetVoucherDTO;

public interface BuffetVoucherService {

	// 데이터 삽입
	Long register(BuffetVoucherDTO buffetVoucherDTO);
	
	// 데이터 조회
	BuffetVoucherDTO get(Long bv_nb);
	
	// 데이터 수정
	void modify(BuffetVoucherDTO buffetVoucherDTO);
	
	// 데이터 삭제
	void remove(Long bv_nb);
}
