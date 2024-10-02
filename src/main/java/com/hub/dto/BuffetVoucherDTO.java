package com.hub.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BuffetVoucherDTO {

	private Long bvNb; // 식사권 번호
	private LocalDateTime bvStartTm; // 식사 시작 시간
	private LocalDateTime bvEndTm; // 식사 종료 시간
}
