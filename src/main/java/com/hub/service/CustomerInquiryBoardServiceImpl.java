package com.hub.service;

import com.hub.domain.CustomerInquiryBoard;
import com.hub.dto.CustomerInquiryBoardDTO;
import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;
import com.hub.repository.CustomerInquiryBoardRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerInquiryBoardServiceImpl implements CustomerInquiryBoardService {

    private final CustomerInquiryBoardRepository repository; // 리포지토리 의존성 주입
    private final ModelMapper modelMapper; // ModelMapper 의존성 주입

    // 생성자 - ModelMapper의 필드 매핑 설정 포함
    public CustomerInquiryBoardServiceImpl(CustomerInquiryBoardRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;

        // ModelMapper 설정: DTO의 필드가 Entity의 필드로 매핑되도록 구성
        modelMapper.typeMap(CustomerInquiryBoardDTO.class, CustomerInquiryBoard.class)
            .addMappings(mapper -> {
                mapper.map(CustomerInquiryBoardDTO::getUsId, CustomerInquiryBoard::setUsId); // 회원 아이디 필드 매핑
                mapper.map(CustomerInquiryBoardDTO::getCqTitle, CustomerInquiryBoard::setCqTitle); // 제목 필드 매핑
                mapper.map(CustomerInquiryBoardDTO::getCqCtt, CustomerInquiryBoard::setCqCtt); // 내용 필드 매핑
                mapper.map(CustomerInquiryBoardDTO::getCqRegdt, CustomerInquiryBoard::setCqRegdt); // 등록 일자 필드 매핑
            });
    }

    @Override
    public List<CustomerInquiryBoardDTO> getAllInquiries(String role) {
        // 모든 역할이 접근 가능하도록 수정
        // ADMIN 포함 모든 사용자 역할 접근 허용
        return repository.findAll().stream()
                .map(inquiry -> modelMapper.map(inquiry, CustomerInquiryBoardDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public CustomerInquiryBoardDTO get(Long cqNb, String role, String usId) {
        CustomerInquiryBoard inquiry = repository.findById(cqNb)
                .orElseThrow(() -> new IllegalArgumentException("문의 번호를 찾을 수 없습니다."));

        // 모든 역할이 접근 가능하도록 수정
        return modelMapper.map(inquiry, CustomerInquiryBoardDTO.class);
    }

    @Override
    public CustomerInquiryBoardDTO createInquiry(CustomerInquiryBoardDTO inquiryDTO, String role) {
        CustomerInquiryBoard inquiry = modelMapper.map(inquiryDTO, CustomerInquiryBoard.class);
        inquiry.setCqRegdt(LocalDateTime.now()); // 등록 일자를 현재 시간으로 설정
        return modelMapper.map(repository.save(inquiry), CustomerInquiryBoardDTO.class);
    }

    @Override
    public void modify(CustomerInquiryBoardDTO inquiryDTO, String role, String usId) {
        CustomerInquiryBoard inquiry = repository.findById(inquiryDTO.getCqNb())
                .orElseThrow(() -> new IllegalArgumentException("문의가 존재하지 않습니다."));

        // 모든 역할이 접근 가능하도록 수정
        inquiry.setCqTitle(inquiryDTO.getCqTitle());
        inquiry.setCqCtt(inquiryDTO.getCqCtt());
        inquiry.setCqAnswerCtt(inquiryDTO.getCqAnswerCtt());
        inquiry.setCqAnswerRegdt(LocalDateTime.now()); // 답변 등록 일자를 현재 시간으로 설정
        repository.save(inquiry);
    }

    @Override
    public void remove(Long cqNb, String role, String usId) {
        CustomerInquiryBoard inquiry = repository.findById(cqNb)
                .orElseThrow(() -> new IllegalArgumentException("문의가 존재하지 않습니다."));

        // 모든 역할이 접근 가능하도록 수정
        repository.deleteById(cqNb);
    }

    @Override
    public PageResponseDTO<CustomerInquiryBoardDTO> list(PageRequestDTO pageRequestDTO, String role) {
        // 모든 역할이 접근 가능하도록 수정
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
                Sort.by("cqNb").descending()); // 최신순으로 정렬
        Page<CustomerInquiryBoard> result = repository.findAll(pageable);

        List<CustomerInquiryBoardDTO> dtoList = result.getContent().stream()
                .map(inquiry -> modelMapper.map(inquiry, CustomerInquiryBoardDTO.class))
                .collect(Collectors.toList());
        long totalCount = result.getTotalElements();

        return PageResponseDTO.<CustomerInquiryBoardDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
    }

    @Override
    public boolean existsById(Long cqNb) {
        return repository.existsById(cqNb); // 문의 ID 존재 여부 반환
    }
}
