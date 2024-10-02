import React, { useState } from "react"; // React와 useState 훅 가져오기
import { useNavigate } from "react-router-dom"; // useNavigate 훅 가져오기
import BasicLayout from "../layouts/BasicLayout"; // BasicLayout 컴포넌트 가져오기

const Main = () => {
  const [todo, setTodo] = useState({ title: "", writer: "", dueDate: "" });
  const [todos, setTodos] = useState([]); // 예약 리스트 상태 추가

  const navigate = useNavigate(); // navigate 함수 선언

  // 새로운 todo 항목을 추가하는 함수
  const handleClickAdd = () => {
    if (!todo.title || !todo.writer || !todo.dueDate) {
      alert("모든 필드를 채워주세요."); // 필드가 비어있으면 알림
      return;
    }
    setTodos([...todos, todo]); // 새로운 todo 항목을 todos 리스트에 추가
    setTodo({ title: "", writer: "", dueDate: "" }); // 입력 필드를 초기화
    console.log("Todo Added: ", todo); // 추가된 todo 항목 로그 출력
  };

  // todos 리스트를 보여주는 함수
  const handleShowTodos = () => {
    console.log("예약 리스트:", todos); // 예약 리스트 로그 출력
    alert(JSON.stringify(todos, null, 2)); // 예약 리스트를 알림창에 표시
  };

  // 후기 게시판으로 이동하는 함수
  const handleGoToReviewBoard = () => {
    navigate("/reviewBoard"); // reviewBoard 페이지로 이동
  };

  // 고객문의 페이지로 이동하는 함수
  const handleGoToCustomerInquiry = () => {
    navigate("/CustomErinquiry"); // CustomErinquiry 페이지로 이동
  };

   // 공지사항 관리 페이지로 이동하는 함수
   const handleGoToNotice = () => {
    navigate("/Notice"); // Notice 페이지로 이동
  };

  return (
    <>
      <BasicLayout /> {/* 기본 레이아웃 컴포넌트 렌더링 */}

      <div className="flex justify-center">
        <button
          type="button"
          className="mt-4 w-full rounded p-4 border border-solid border-neutral-500 text-xl" // 버튼 스타일
          onClick={handleShowTodos} // 버튼 클릭 시 예약 리스트 확인
        >
          예약 리스트 확인
        </button>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="mt-4 w-full rounded p-4 border border-solid border-neutral-500 text-xl" // 버튼 스타일
          onClick={handleGoToNotice} // 버튼 클릭 시 공지사항 작성 확인
        >
         공지사항 작성
        </button>
      </div>
      
      <div className="flex justify-center space-x-4"> {/* 버튼 간 간격을 위해 space-x-4 추가 */}
        <button
          type="button"
          className="mt-4 w-1/2 rounded p-48 border border-solid border-neutral-500 text-xl text-center" // 후기 게시판 버튼 스타일
          onClick={handleGoToReviewBoard} // 버튼 클릭 시 후기 게시판으로 이동
        >
          후기 게시판
        </button>
        <button
          type="button"
          className="mt-4 w-1/2 rounded p-48 border border-solid border-neutral-500 text-xl text-center" // 고객문의 버튼 스타일
          onClick={handleGoToCustomerInquiry} // 버튼 클릭 시 고객문의 페이지로 이동
        >
          고객문의
        </button>

      </div>
    </>
  );
};

export default Main; // Main 컴포넌트 내보내기
