package com.hub.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Data
@Table(name = "TBL_MENU")
public class Menu {

	@Id
	@Column(name = "MENU_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long menuId;	//메뉴 ID
	
	@Column(name = "MENU_NAME")
	private String menuName;	//메뉴 이름

	@Column(name = "MENU_CATEGORY")
	private String menuCategory;	//메뉴 카테고리
	
}
