package com.hub.service;

import com.hub.domain.FreeBoard;
import com.hub.dto.FreeBoardDTO;
import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;
import com.hub.repository.FreeBoardRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FreeBoardServiceImpl implements FreeBoardService {

	@Autowired
	private FreeBoardRepository freeBoardRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<FreeBoardDTO> getAllFreeBoards() {
		return freeBoardRepository.findAll().stream().map(freeBoard -> modelMapper.map(freeBoard, FreeBoardDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public FreeBoardDTO get(Long ftNb) {
		java.util.Optional<FreeBoard> result = freeBoardRepository.findById(ftNb);

		FreeBoard freeBoard = result.orElseThrow();
		FreeBoardDTO dto = modelMapper.map(freeBoard, FreeBoardDTO.class);
		return dto;

	}
	
	@Override
	public FreeBoardDTO createFreeBoard(FreeBoardDTO freeBoardDto) {
		FreeBoard freeBoard = modelMapper.map(freeBoardDto, FreeBoard.class);
		freeBoard.setFtRegdt(LocalDateTime.now());
		return modelMapper.map(freeBoardRepository.save(freeBoard), FreeBoardDTO.class);
	}

	@Override
	public void modify(FreeBoardDTO freeBoardDTO) {
		Optional<FreeBoard> result = freeBoardRepository.findById(freeBoardDTO.getFtNb());
		FreeBoard freeBoard = result.orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

		freeBoard.changeFtTitle(freeBoardDTO.getFtTitle());
		freeBoard.changeFtCtt(freeBoardDTO.getFtCtt());
		freeBoard.changeFtRegdt(freeBoardDTO.getFtRegdt());

		freeBoardRepository.save(freeBoard);
	}

	@Override
	public void remove(Long ftNb) {
		if (!freeBoardRepository.existsById(ftNb)) {
			throw new IllegalArgumentException("게시글이 존재하지 않습니다.");
		}
		freeBoardRepository.deleteById(ftNb);
	}

	@Override
	public PageResponseDTO<FreeBoardDTO> list(PageRequestDTO pageRequestDTO) {
		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("ftNb").descending());

		Page<FreeBoard> result = freeBoardRepository.findAll(pageable);

		List<FreeBoardDTO> dtoList = result.getContent().stream()
				.map(freeBoard -> modelMapper.map(freeBoard, FreeBoardDTO.class)).collect(Collectors.toList());

		long totalCount = result.getTotalElements();

		PageResponseDTO<FreeBoardDTO> responseDTO =PageResponseDTO.<FreeBoardDTO>withAll()
				.dtoList(dtoList).pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();
	return responseDTO;
	}
	
}
