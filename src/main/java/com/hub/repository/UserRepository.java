package com.hub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.hub.domain.User;

public interface UserRepository extends JpaRepository<User, String>{

	@EntityGraph(attributePaths = {"userRoleList"})
	@Query("select u from User u where u.id = :id")
	User getWithRoles(@Param("id") String id);

}
