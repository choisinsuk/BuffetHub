package com.hub.dto;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import lombok.Builder;
import lombok.Data;

@Data
public class PageResponseDTO<E> {

	/*- PageResponseDTO는 나중에 다른 타입의 DTO들을 이용할 수 있도록 제네릭 타입으로 작성한다.
	  PageResponseDTO는 DTO의 리스트와 전체 데이터 수를 지정하면 페이지 처리에 필요한 번호 (pageNumList)나 이전/다음에 대한 처리가 이루어진다.*/

	// 데이터를 담고 있는 리스트. 각 페이지에서 보여줄 엔티티를 담는다.
	private List<E> dtoList;
	
	// 현재 페이지에서 보여줄 페이지 번호 리스트
	private List<Integer> pageNumList;
	
	// 페이지 요청에 대한 정보를 담고 있는 객체
	private PageRequestDTO pageRequestDTO;
	
	// 이전 페이지가 존재하는 여부를 나타냄
	private boolean prev;
	
	// 다음 페이지가 존재하는 여부를 나타냄
	private boolean next;
	
	// 전체 아이템 수를 나타냅니다.
	private int totalCount;
	
	// 이전 페이지 번호
	private int prevPage;

	// 다음 페이지 번호
	private int nextPage;
	
	// 전체 페이지 수
	private int totalPage;
	
	// 현재 페이지 번호
	private int current;

	// 이 생성자는 빌저 패턴을 사용하여 인스턴스를 생성합니다. 이 패턴은 객체 생성 시 필드를 유연하게 설정할 수 있도록 도와줌
	@Builder(builderMethodName = "withAll")
	// 페이지네이션 로직
	//( 각 페이지에 보여줄 데이터 리스트, 페이지 요청 정보, 전체 데이터 개수 )
	public PageResponseDTO(List<E> dtoList, PageRequestDTO pageRequestDTO, long totalCount) 
	{
		
		this.dtoList = dtoList;
		this.pageRequestDTO = pageRequestDTO;
		this.totalCount = (int) totalCount;
		
		// 10개의 페이지를 한 블록으로 처리하며, 현제 페이지를 기준으로 블록의 끝 페이지를 설정합니다.
		int end = (int) (Math.ceil(pageRequestDTO.getPage() / 10.0)) * 10;
		// 현재 블록의 시작 페이지를 계산합니다. end에서 9를 뺀 값이 시작페이지
		int start = end - 9;
		// 전체 페이지 수를 계산합니다. totalcount를 pageRequestDTO.getSize로 나눈 후 올림(ceil)하여 구한다.
		int last = (int) (Math.ceil((totalCount / (double) pageRequestDTO.getSize())));
		
		end = end > last ? last : end;
		
		this.prev = start > 1;
		this.next = totalCount > end * pageRequestDTO.getSize();
		this.pageNumList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());
		
		if (prev) 
		{
			this.prevPage = start - 1;
		}
		
		if (next) 
		{
			this.nextPage = end + 1;
		}
		
		this.totalPage = this.pageNumList.size();
		this.current = pageRequestDTO.getPage();
	}
}

/* 특정 페이지 요청에 맞춰 적절한 페이지 목록과 이전/다음 페이지 유무를 계산하고, 페이지네이션 UI를 구성하는 ㄷ게 필요한 데이터를 제공합니다. 
   pageRequestDTO를 통해 페이지와 페이지당 아이템 수를 받아와서, 전체 아이템 개수를 기준으로 페이지네이션 로직을 수행합니다. */
