package com.hub.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.hub.domain.Reserve;
import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;
import com.hub.dto.ReserveDTO;
import com.hub.repository.ReserveRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor // 생성자 자동 주입
public class ReserveServiceImpl implements ReserveService {

	// 자동주입 대상은 final로
	private final ModelMapper modelMapper;
	private final ReserveRepository reserveRepository;
	
	// 데이터 삽입 메서드
	@Override
	public Long register(ReserveDTO reserveDTO) {
		Reserve reserve = modelMapper.map(reserveDTO, Reserve.class);
		Reserve savedReserve = reserveRepository.save(reserve);
		
		return savedReserve.getRsNb();
	}

	// 데이터 조회 메서드
	@Override
	public ReserveDTO get(Long rs_nb) {
		Optional<Reserve> result = reserveRepository.findById(rs_nb);
		
		Reserve reserve = result.orElseThrow();
		ReserveDTO dto = modelMapper.map(reserve, ReserveDTO.class);
		
		return dto;
	}

	// 데이터 수정 메서드
	@Override
	public void modify(ReserveDTO reserveDTO) {
		Optional<Reserve> result = reserveRepository.findById(reserveDTO.getRsNb());
		
		Reserve reserve = result.orElseThrow();
		
		reserve.changeRs_dt(reserveDTO.getRsDt());
		
		reserve.changeRs_adult_person_cnt(reserveDTO.getRsAdultPersonCnt());
		reserve.changeRs_child_person_cnt(reserveDTO.getRsChildPersonCnt());
		reserve.changeRs_preage_person_cnt(reserveDTO.getRsPreagePersonCnt());
		
		reserve.changeRs_visit_adult_cnt(reserveDTO.getRsVisitAdultCnt());
		reserve.changeRs_visit_child_cnt(reserveDTO.getRsVisitChildCnt());
		reserve.changeRs_visit_preage_cnt(reserveDTO.getRsVisitPreageCnt());
		
		reserve.changeRs_realpeople_cnt(reserveDTO.getRsRealpeopleCnt());
		
		reserve.changeRs_payment_complete_yn(reserveDTO.isRsPaymentCompleteYn());
		reserve.changeRs_visit_yn(reserveDTO.isRsVisitYn());
		
		reserveRepository.save(reserve);
		
	}

	// 데이터 삭제 메서드
	@Override
	public void remove(Long rs_nb) {
		reserveRepository.deleteById(rs_nb);
		
	}

	// 데이터 리스트 조회 메서드
	@Override
	public PageResponseDTO<ReserveDTO> list(PageRequestDTO pageRequestDTO) {
		Pageable pageable = PageRequest.of(
				pageRequestDTO.getPage() -1,  // 1페이지가 0이므로 주의
				pageRequestDTO.getSize(), Sort.by("rsNb").descending());
		
		Page<Reserve> result = reserveRepository.findAll(pageable);
		
		List<ReserveDTO> dtoList = result.getContent().stream().map(reserve ->
		modelMapper.map(reserve, ReserveDTO.class)).collect(Collectors.toList());
		
		long totalCount = result.getTotalElements();
		
		PageResponseDTO<ReserveDTO> responseDTO = PageResponseDTO.<ReserveDTO>withAll()
				.dtoList(dtoList).pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();
		
		return responseDTO;
	}
	
	
}
