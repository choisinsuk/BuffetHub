package com.hub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hub.domain.User;

public interface UserRepository extends JpaRepository<User, String>{

}
