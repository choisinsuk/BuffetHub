package com.hub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hub.domain.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long>{

}
