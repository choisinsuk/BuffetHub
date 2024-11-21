package com.hub.controller;

import com.hub.domain.Menu;
import com.hub.dto.MenuDTO;
import com.hub.service.MenuAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/menus")
@CrossOrigin(origins = "http://localhost:3000") // 프론트엔드 주소에 맞게 조정
public class MenuAdminController {

    @Autowired
    private MenuAdminService menuService;

    // 메뉴 목록을 가져오는 엔드포인트
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE) // 경로 수정: /api/admin/menus
    public ResponseEntity<List<Menu>> getAllMenus() {
        try {
            List<Menu> menus = menuService.getAllMenus();
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON) // Content-Type 설정
                    .body(menus);
        } catch (Exception e) {
            // 예외 발생 시 500 상태 코드와 메시지 반환
            return ResponseEntity.status(500).body(null); // 필요 시 메시지를 추가
        }
    }

    // 메뉴 이름으로 검색하는 엔드포인트
    @GetMapping("/search")
    public ResponseEntity<List<MenuDTO>> searchMenu(@RequestParam("name") String menuName) 
    {
        try {
            List<MenuDTO> menus = menuService.searchMenuByName(menuName);
            return ResponseEntity.ok(menus);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    
    // 메뉴 추가
    @PostMapping("/add")
    public ResponseEntity<MenuDTO> addMenu(@RequestBody MenuDTO menuDTO) 
    {
        MenuDTO createdMenu = menuService.addMenu(menuDTO);
        return ResponseEntity.ok(createdMenu);
    }

    // 메뉴 삭제
    @DeleteMapping("/{menuId}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long menuId) 
    {
        menuService.deleteMenu(menuId);
        return ResponseEntity.noContent().build();
    }
}
