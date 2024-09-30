package com.hub.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.hub.domain.BuffetVoucher;
import com.hub.dto.BuffetVoucherDTO;
import com.hub.repository.BuffetVoucherRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor // 생성자 자동 주입
public class BuffetVoucherServiceImpl implements BuffetVoucherService {

	// 자동주입 대상은 final로
	private final ModelMapper modelMapper;
	private final BuffetVoucherRepository buffetVoucherRepository;
	
	// 데이터 삽입 메서드
	@Override
	public Long register(BuffetVoucherDTO buffetVoucherDTO) {
		
		BuffetVoucher buffetVoucher = modelMapper.map(buffetVoucherDTO, BuffetVoucher.class);
		BuffetVoucher savedbuBuffetVoucher = buffetVoucherRepository.save(buffetVoucher);
		
		return savedbuBuffetVoucher.getBvNb();
	}

	// 데이터 조회 메서드
	@Override
	public BuffetVoucherDTO get(Long bv_nb) {
		Optional<BuffetVoucher> result = buffetVoucherRepository.findById(bv_nb);
		
		BuffetVoucher buffetVoucher = result.orElseThrow();
		
		BuffetVoucherDTO dto = modelMapper.map(buffetVoucher, BuffetVoucherDTO.class);
		
		return dto;
	}

	// 데이터 수정 메서드
	@Override
	public void modify(BuffetVoucherDTO buffetVoucherDTO) {
		Optional<BuffetVoucher> result = buffetVoucherRepository.findById(buffetVoucherDTO.getBvNb());
		
		BuffetVoucher buffetVoucher = result.orElseThrow();
		
		// start_tm을 변경하면 자동으로 end_tm도 변경됨
		buffetVoucher.changeStart_tm(buffetVoucherDTO.getBvStartTm());
		
		buffetVoucherRepository.save(buffetVoucher);
		
	}

	// 데이터 삭제 메서드
	@Override
	public void remove(Long bv_nb) {
		buffetVoucherRepository.deleteById(bv_nb);
		
	}

}
