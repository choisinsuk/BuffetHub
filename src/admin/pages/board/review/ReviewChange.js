import React, { useState } from "react"; // React와 useState 가져오기
import { useNavigate } from "react-router-dom"; // useNavigate 훅 가져오기
import BoardLayout from "../../../layouts/BoardParts/BoardLayout"; // BoardLayout 컴포넌트 가져오기
import BoardNav from "../BoardNav";


const ReviewChange = () => {
  const navigate = useNavigate(); // navigate 함수 선언
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [posts, setPosts] = useState([]); // 후기 게시판 상태

  // 페이지 이동 함수
  const handleNavigate = (path) => {
    navigate(path); // 지정된 경로로 이동
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 검색 버튼 클릭 핸들러
  const handleSearchSubmit = () => {
    console.log("검색어:", searchTerm);
    // 검색 로직을 여기에 추가하세요
  };

  // 작성 버튼 클릭 핸들러
  const handleAnswer = () => {
    navigate("/Answer"); // Answer 페이지로 이동
  };

  // 게시글 추가 핸들러
  const handlePostCreate = (post) => {
    setPosts([...posts, post]); // 새로운 게시글 추가
    navigate("/ReviewChange"); // 수정 페이지로 이동
  };

  // 수정 버튼 클릭 핸들러
  const handleEdit = () => {
    navigate("/ReviewChange"); // ReviewChange 페이지로 이동
  };

  return (
    <BoardLayout>
      <div className="text-5xl text-center">
        <div className="bg-customColor1 w-full px-3 py-20 rounded-lg flex items-center justify-center text-white text-bold">후기 게시판 수정</div>
        <BoardNav />
      

        {/* 검색어 입력 필드와 검색 버튼 및 작성 버튼 추가: 표 아래에 위치 */}
        <div className="mt-4 flex justify-center space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange} // 검색어 변경 시 호출
            placeholder=""
            className="border border-gray-500 p-0.5 rounded w-1/2 max-w-lg"
          />
          <button
            type="button"
            onClick={handleSearchSubmit} // 검색 버튼 클릭 시 호출
            className="rounded p-0.125 bg-blue-500 text-white"
          >
            검색
          </button>
          <div className="mx-0" /> {/* 한 칸 여백 추가 */}
          <button
            type="button"
            onClick={handleAnswer} // 작성 버튼 클릭 시 호출
            className="rounded p-1 bg-green-500 text-white"
          >
            작성
          </button>
        </div>

        {/* 수정 버튼 추가 */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleEdit} // 수정 버튼 클릭 시 호출
            className="rounded p-2 bg-yellow-500 text-white"
          >
            수정
          </button>
        </div>

        {/* 페이지 이동 버튼 추가 */}
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: 5 }, (_, index) => (
            <button
              key={index + 1}
              type="button"
              onClick={() => handleNavigate(`/page${index + 1}`)} // 페이지 번호에 따라 경로 설정
              className="rounded p-2 text-white"
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </BoardLayout>
  );
}

export default ReviewChange; // Change 컴포넌트 내보내기
