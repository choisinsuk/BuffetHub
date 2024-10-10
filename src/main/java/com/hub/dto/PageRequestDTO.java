package com.hub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class PageRequestDTO {

	@Builder.Default
	private int page = 1;
	
	@Builder.Default
	private int size = 10;
}

/*
 목록 처리와 DTO
  - 페이징 처리가 되는 목록 데이터는 해당 페이지의 TodoDTO리스트와 페이지 번호, 전체 데이터 수, 이전/다음 페이지 처리에 필요한 부가적인 데이터로 구성된다.
    부사적인 데이터를 프론트 엔드에서 처리할 수 있지만 서버에서 데이터의 가공이 많을수록 프론트 엔드(리엑트)에서의 작업이 더 용이하다.
   -> PageResponseDTO
 */
 