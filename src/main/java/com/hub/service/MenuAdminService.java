package com.hub.service;

import java.util.List;
import com.hub.domain.Menu;
import com.hub.dto.MenuDTO;

public interface MenuAdminService {

	List<Menu> getAllMenus(); // 전체 메뉴를 조회하는 메서드
	
	List<MenuDTO> searchMenuByName(String menuName); //이름으로 검색하는 메서드
	
	MenuDTO addMenu(MenuDTO menuDTO);	// 메뉴 추가 메서드
	
	void deleteMenu(Long menuId);		// 메뉴 삭제 메서드
}
