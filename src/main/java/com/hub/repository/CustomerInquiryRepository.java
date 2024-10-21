package com.hub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hub.domain.CustomerInquiry;

public interface CustomerInquiryRepository extends JpaRepository<CustomerInquiry, Long>{

}
