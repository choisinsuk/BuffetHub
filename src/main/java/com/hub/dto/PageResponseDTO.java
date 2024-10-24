package com.hub.dto;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import lombok.Builder;
import lombok.Data;

@Data
public class PageResponseDTO<E> {

    private List<E> dtoList; // 데이터 전송 객체 리스트
    private List<Integer> pageNumList; // 페이지 번호 리스트
    private PageRequestDTO pageRequestDTO; // 페이지 요청 정보를 담는 DTO
    private boolean prev; // 이전 페이지 존재 여부
    private boolean next; // 다음 페이지 존재 여부
    private int totalCount; // 전체 데이터 수
    private int prevPage; // 이전 페이지 번호
    private int nextPage; // 다음 페이지 번호
    private int totalPage; // 전체 페이지 수
    private int current; // 현재 페이지 번호

    // Builder 패턴을 사용하여 모든 필드를 설정하는 생성자
    @Builder(builderMethodName = "withAll")
    public PageResponseDTO(List<E> dtoList, PageRequestDTO pageRequestDTO, long totalCount) {
        
        this.dtoList = dtoList; // 데이터 리스트 초기화
        this.pageRequestDTO = pageRequestDTO; // 페이지 요청 DTO 초기화
        this.totalCount = (int) totalCount; // 전체 데이터 수 초기화
        
        // 현재 페이지를 기반으로 페이지 블록의 끝 계산
        int end = (int) (Math.ceil(pageRequestDTO.getPage() / 10.0)) * 10; 
        int start = end - 9; // 페이지 블록의 시작
        int last = (int) (Math.ceil((totalCount / (double) pageRequestDTO.getSize()))); // 마지막 페이지 번호 계산
        
        // end가 last보다 클 경우 last로 조정
        end = end > last ? last : end; 
        
        this.prev = start > 1; // 이전 페이지 존재 여부 설정
        this.next = totalCount > end * pageRequestDTO.getSize(); // 다음 페이지 존재 여부 설정
        // 페이지 번호 리스트 생성
        this.pageNumList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());
        
        // 이전 페이지 번호 설정 (이전 페이지가 있는 경우)
        if (prev) {
            this.prevPage = start - 1;
        }
        // 다음 페이지 번호 설정 (다음 페이지가 있는 경우)
        if (next) {
            this.nextPage = end + 1;
        }
        this.totalPage = this.pageNumList.size(); // 전체 페이지 수 계산
        this.current = pageRequestDTO.getPage(); // 현재 페이지 설정
    }
}
