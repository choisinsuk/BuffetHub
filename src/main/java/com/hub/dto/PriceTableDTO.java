package com.hub.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class PriceTableDTO {

	private Integer dayAdultPrice;
	private Integer dayChildPrice;
	private Integer dayKidsPrice;
	private Integer WeekAdultPrice;
	private Integer WeekChildPrice;
	private Integer WeekKidsPrice;
}
