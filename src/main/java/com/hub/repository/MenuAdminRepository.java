package com.hub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hub.domain.Menu;

public interface MenuAdminRepository extends JpaRepository<Menu, Long>{

	List<Menu> findByMenuName(String menuName);

}
