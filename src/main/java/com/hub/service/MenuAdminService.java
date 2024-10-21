package com.hub.service;

import java.util.List;

import com.hub.domain.Menu;
import com.hub.dto.MenuDTO;

public interface MenuAdminService {

	List<Menu> getAllMenus(); // 전체 메뉴를 조회하는 메서드
	
	List<MenuDTO> searchMenuByName(String menuName); //이름으로 검색하는 메서드
}
