package com.hub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hub.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long>{
}

// 엔티티 처리를 위한 기능은 Spring DATA JPA의 레포지토리로 처리한다.
// JPARepository를 상속해서 만드는 Repository는 별도의 메서드 등을 작성하지 않아도 CRUD와 페이징 처리 등의 기능이 제공

/*
 (1) 데이터 추가
 - JPA는 엔티티 클래스에서 만들어진 엔티티 개체를 저장하는 것으로 데이터베이스의 insert나 update가 실행될 수 있다.
 - 새로운 데이터를 추가하는 것은 Todo엔티티 객체를 생성한 후에 TodoRepository의 save()를 이용한다.
 
 (2) 데이터 조회
 - 특정한 번호의 데이터를 알아내기 위해서는 findByID() 기능을 이용한다.
 
 (3) 데이터 수정
 - 데이터 수정은 등록과 동일하게 save로 수정한다. 일반적으로 엔티티 객체는 가능하면 불면하게 만드는 것이 좋지만 상황에 따라 수정이 가능한 객체를 만들기도 한다.]
 - Todo 엔티티 클래스에서는 수정이 가능한 부분에 대해서 변경 가능하게 수정한다. Todo의 제목, 완료여부, 만료일등은 수정할 수 있다.
 
 */