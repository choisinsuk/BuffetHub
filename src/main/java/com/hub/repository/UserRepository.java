package com.hub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.hub.domain.User;

public interface UserRepository extends JpaRepository<User, String>{
	
	
	User findByUrId(String urId);
	
    Optional<User> findByUrEml(String urEml);
	
    User findByUrIdAndUrEml(String urId, String urEml);
    
    // 아이디가 이미 존재하는지 확인하는 메서드
    boolean existsByUrId(String urId);
    
    // urId로 사용자 삭제
    void deleteByUrId(String urId);


    // EntityGraph에서 userRoleList가 아닌 urAuthCode를 사용하여 권한을 가져옴
    @EntityGraph(attributePaths = {"urAuthCode"})
    @Query("select u from User u where u.urId = :id")
    User getWithRoles(@Param("id") String id);
    
    
    @Query("SELECT u.urId FROM User u WHERE u.urNm = :name AND u.urEml = :email")
    String findUrIdByNameAndEmail(@Param("name") String name, @Param("email") String email);

    List<User> findByUrNm(String urNm);

}
