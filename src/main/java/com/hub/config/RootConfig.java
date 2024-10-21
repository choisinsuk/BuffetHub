package com.hub.config;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.hub.domain.Reserve;
import com.hub.dto.ReserveDTO;

@Configuration
public class RootConfig {

	@Bean
	public ModelMapper getMapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setFieldMatchingEnabled(true)
		.setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE)
		.setMatchingStrategy(MatchingStrategies.LOOSE);
		
		// String 타입 데이터를 Date 타입으로 변환하는 기능
		// Custom Converter for String to Date
        Converter<String, Date> stringToDateConverter = new Converter<String, Date>() {
            public Date convert(MappingContext<String, Date> context) {
                String source = context.getSource();
                try {
                    // Example format: "yyyy-MM-dd"
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    return sdf.parse(source);
                } catch (ParseException e) {
                    // Handle parsing exception
                    return null;
                }
            }
        };

        modelMapper.addConverter(stringToDateConverter);
		
//        // Reserve -> ReserveDTO 매핑 규칙 설정 (urid만 매핑)
//        modelMapper.typeMap(Reserve.class, ReserveDTO.class).addMappings(mapper -> {
//            mapper.map(src -> src.getUser().getUr_id(), ReserveDTO::setUrId); // ur_id만 매핑
//            mapper.skip(ReserveDTO::setSomeOtherField); // 다른 필드는 필요 없으므로 skip 처리 (예시)
//        });
		return modelMapper;
	}
}


