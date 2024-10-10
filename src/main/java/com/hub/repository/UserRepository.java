package com.hub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.hub.domain.User;

public interface UserRepository extends JpaRepository<User, String>{
	
	
	User findByUrId(String urId);

    // EntityGraph에서 userRoleList가 아닌 urAuthCode를 사용하여 권한을 가져옴
    @EntityGraph(attributePaths = {"urAuthCode"})
    @Query("select u from User u where u.urId = :id")
    User getWithRoles(@Param("id") String id);

}
