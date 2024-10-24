package com.hub.controller;	

import com.hub.domain.Menu;
import com.hub.dto.MenuDTO;
import com.hub.service.MenuAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/menus")
@CrossOrigin(origins = "http://localhost:3000") // 프론트엔드 주소에 맞게 조정
public class MenuAdminController {

	@Autowired
    private MenuAdminService menuService;
	
	@GetMapping
    public ResponseEntity<List<Menu>> getAllMenus() {
        List<Menu> menus = menuService.getAllMenus();
        return ResponseEntity.ok(menus);
    }

    // 추가: 메뉴 이름으로 검색하는 엔드포인트
	@GetMapping("/search")
	public ResponseEntity<List<MenuDTO>> searchMenu(@RequestParam("name") String menuName) {
	    List<MenuDTO> menus = menuService.searchMenuByName(menuName);
	    return ResponseEntity.ok(menus);
	}
}
