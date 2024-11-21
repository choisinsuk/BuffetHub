package com.hub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hub.dto.FreeBoardDTO;
import com.hub.service.FreeBoardService;


@RestController
@RequestMapping("/api/admin/freeBoard")
@CrossOrigin(origins = "http://localhost:3000")
public class FreeBoardController {

	 @Autowired
	    private FreeBoardService freeBoardService;

	    @GetMapping("/{ftNb}")
	    public ResponseEntity<FreeBoardDTO> get(@PathVariable(name = "ftNb") Long ftNb) {
	    	FreeBoardDTO freeBoard = freeBoardService.get(ftNb);
	        if (freeBoard == null) {
	            return ResponseEntity.notFound().build();
	        }
	        return ResponseEntity.ok(freeBoard);
	    }

	    @GetMapping("/list")
	    public ResponseEntity<List<FreeBoardDTO>> getFreeBoardList() {
	        return ResponseEntity.ok(freeBoardService.getAllFreeBoards());
	    }

	    @PostMapping("/")
	    public ResponseEntity<FreeBoardDTO> createFreeBoard(@RequestBody FreeBoardDTO freeBoardDto) {
	    	FreeBoardDTO createdFreeBoard = freeBoardService.createFreeBoard(freeBoardDto);
	        return ResponseEntity.status(HttpStatus.CREATED).body(createdFreeBoard);
	    }

	    @PutMapping("/{ftNb}")
	    public ResponseEntity<String> modifyFreeBoard(@PathVariable Long ftNb, @RequestBody FreeBoardDTO freeBoardDTO) {
	    	freeBoardDTO.setFtNb(ftNb); // ftNb를 FreeBoardDTO에 설정
	    	freeBoardService.modify(freeBoardDTO);
	        return ResponseEntity.ok("게시글이 수정되었습니다.");
	    }

	    @DeleteMapping("/{ftNb}")
	    public ResponseEntity<String> deleteFreeBoard(@PathVariable("ftNb") Long ftNb) {
	        try {
	        	freeBoardService.remove(ftNb);
	            return ResponseEntity.ok("게시글이 삭제되었습니다.");
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.badRequest().body(e.getMessage());
	        }
	    }
	}

