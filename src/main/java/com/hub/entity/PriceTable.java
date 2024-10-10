package com.hub.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "TBL_PRICETABLE")
public class PriceTable {

    // 고유 식별자 추가 (예: 가격 테이블의 ID)
    @Id
    @Column(name = "PRICE_ID")
    private Long id;  // Long 타입의 id 필드를 추가합니다.

    // 평일 어른 가격
    @Column(name = "DAY_ADULT_PRICE")
    private Long dayAdultPrice;

    // 평일 청소년 가격
    @Column(name = "DAY_CHILD_PRICE")
    private Long dayChildPrice;

    // 평일 미취학 가격
    @Column(name = "DAY_KIDS_PRICE")
    private Long dayKidsPrice;

    // 주말 어른 가격
    @Column(name = "WEEKEND_ADULT_PRICE")
    private Long weekAdultPrice;

    // 주말 청소년 가격
    @Column(name = "WEEKEND_CHILD_PRICE")
    private Long weekChildPrice;

    // 주말 미취학 가격
    @Column(name = "WEEKEND_KIDS_PRICE")
    private Long weekKidsPrice;
}
