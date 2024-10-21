package com.hub.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Entity
@Table(name = "TBL_PRICETABLE")
public class PriceTable 
{
    @Id
    @Column(name = "PRICE_ID")
    private Long id;  // Long 타입의 id 필드를 추가합니다.
    
    @Column(name = "DAY_ADULT_PRICE")
    private int dayAdultPrice;  	// 평일 어른 가격
    
    @Column(name = "DAY_CHILD_PRICE")
    private int dayChildPrice;  	// 평일 청소년 가격
    
    @Column(name = "DAY_KIDS_PRICE")
    private int dayKidsPrice;		// 평일 미취학 가격
    
    @Column(name = "WEEKEND_ADULT_PRICE")
    private int weekAdultPrice;		// 주말 어른 가격
    
    @Column(name = "WEEKEND_CHILD_PRICE")
    private int weekChildPrice;		// 주말 청소년 가격
    
    @Column(name = "WEEKEND_KIDS_PRICE")
    private int weekKidsPrice;		// 주말 미취학 가격
}
