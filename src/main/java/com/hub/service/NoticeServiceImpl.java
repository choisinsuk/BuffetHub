package com.hub.service;

import com.hub.domain.NoticeBoard;
import com.hub.dto.NoticeDTO;
import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;
import com.hub.repository.NoticeRepository;
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
public class NoticeServiceImpl implements NoticeService {

	@Autowired
	private NoticeRepository noticeRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<NoticeDTO> getAllNotices() {
		return noticeRepository.findAll().stream().map(notice -> modelMapper.map(notice, NoticeDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public NoticeDTO get(Long ntNb) {
		java.util.Optional<NoticeBoard> result = noticeRepository.findById(ntNb);

		NoticeBoard noticeBoard = result.orElseThrow();
		NoticeDTO dto = modelMapper.map(noticeBoard, NoticeDTO.class);
		return dto;

	}

	@Override
	public NoticeDTO createNotice(NoticeDTO noticeDto) {
		NoticeBoard noticeBoard = modelMapper.map(noticeDto, NoticeBoard.class);
		noticeBoard.setNtRegdt(LocalDateTime.now());
		return modelMapper.map(noticeRepository.save(noticeBoard), NoticeDTO.class);
	}

	@Override
	public void modify(NoticeDTO noticeDTO) {
		Optional<NoticeBoard> result = noticeRepository.findById(noticeDTO.getNtNb());
		NoticeBoard noticeBoard = result.orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

		noticeBoard.changeNtTitle(noticeDTO.getNtTitle());
		noticeBoard.changeNtCtt(noticeDTO.getNtCtt());
		noticeBoard.changeNtRegdt(noticeDTO.getNtRegdt());

		noticeRepository.save(noticeBoard);
	}

	@Override
	public void remove(Long ntNb) {
		if (!noticeRepository.existsById(ntNb)) {
			throw new IllegalArgumentException("게시글이 존재하지 않습니다.");
		}
		noticeRepository.deleteById(ntNb);
	}

	@Override
	public PageResponseDTO<NoticeDTO> list(PageRequestDTO pageRequestDTO) {
		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("ntNb").descending());

		Page<NoticeBoard> result = noticeRepository.findAll(pageable);

		List<NoticeDTO> dtoList = result.getContent().stream()
				.map(noticeBoard -> modelMapper.map(noticeBoard, NoticeDTO.class)).collect(Collectors.toList());

		long totalCount = result.getTotalElements();

		PageResponseDTO<NoticeDTO> responseDTO =PageResponseDTO.<NoticeDTO>withAll()
				.dtoList(dtoList).pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();
	return responseDTO;
	}
	
}
