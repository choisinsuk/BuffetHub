package com.hub.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hub.domain.User;

public interface UserRepository extends JpaRepository<User, String>{
	@Query("select u from User u where u.ur_id = :id")
	User getWithRoles(@Param("id") String ur_id);
}
