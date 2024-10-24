package com.hub.service;

import com.hub.domain.Menu;
import com.hub.dto.MenuDTO;
import com.hub.repository.MenuAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuAdminServiceImpl implements MenuAdminService {

    @Autowired
    private MenuAdminRepository menuRepository;

    //메뉴 목록 조회
    @Override
    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }
    
    //메뉴 검색 기능
    @Override
    public List<MenuDTO> searchMenuByName(String menuName) {
        List<Menu> menus = menuRepository.findByMenuName(menuName);
        return menus.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
    }
    
    //메뉴 추가 기능 추가
    @Override
    public MenuDTO addMenu(MenuDTO menuDTO) {
        Menu menu = new Menu();
        menu.setMenuName(menuDTO.getMenuName());
        menu.setMenuCategory(menuDTO.getMenuCategory());
        Menu savedMenu = menuRepository.save(menu); // ID는 자동으로 생성됨
        return new MenuDTO(savedMenu.getMenuId(), savedMenu.getMenuName(), savedMenu.getMenuCategory());
    }

    // 메뉴 삭제 기능 추가
    @Override
    public void deleteMenu(Long menuId) {
        menuRepository.deleteById(menuId);
    }
    
    // 엔티티를 DTO로 변환하는 메서드
    private MenuDTO convertToDTO(Menu menu) {
        MenuDTO menuDTO = new MenuDTO();
        menuDTO.setMenuId(menu.getMenuId());
        menuDTO.setMenuName(menu.getMenuName());
        menuDTO.setMenuCategory(menu.getMenuCategory());
        return menuDTO;
    }
    
}
