package com.hub.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.hub.domain.NoticeBoard;
import com.hub.repository.NoticeBoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeBoardServiceImpl implements NoticeBoardService {
	
    private final NoticeBoardRepository noticeBoardRepository;

    
    @Override
    public List<NoticeBoard> getAllNoticeBoard()
    {
    	return noticeBoardRepository.findAll();
    }
    
    
}
