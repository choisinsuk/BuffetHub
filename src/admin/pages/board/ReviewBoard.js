
import React, { useState } from "react"; // React와 useState 가져오기
import { useNavigate } from "react-router-dom"; // useNavigate 훅 가져오기
import BoardLayout from "../../layouts/BoardLayout"; // BoardLayout 컴포넌트 가져오기
import Answer from "./Answer"; // Answer 컴포먼트 가져오기

const ReviewBoard = () => {
    const navigate = useNavigate(); // navigate 함수 선언
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [posts, setPosts] = useState([]); // 게시글 목록 상태
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
      navigate("/Answer"); // make 페이지로 이동
    };
       // 게시글 추가 핸들러
    const handlePostCreate = (post) => {
      setPosts([...posts, post]); // 새로운 게시글 추가
      navigate("/ReviewBoard"); // 후기게시판 페이지로 이동
    };

  return (
    <BoardLayout>
      <div className="text-5xl text-center">
        <div>후기 게시판</div>
      
        <div className="mt-8 flex justify-center space-x-4">
          <button
            type="button"
            className="w-1/4 max-w-lg rounded p-3 border border-gray-500 text-2xl"
            onClick={() => handleNavigate("/Notice")}
          >
            공지사항 관리
          </button>

          <button
            type="button"
            className="w-1/4 max-w-lg rounded p-3 border border-gray-500 text-2xl"
            onClick={() => handleNavigate("/reviewBoard")}
          >
            후기 게시판 관리
          </button>

          <button
            type="button"
            className="w-1/4 max-w-lg rounded p-3 border border-gray-500 text-2xl"
            onClick={() => handleNavigate("/CustomErinquiry")}
          >
            고객문의 관리
          </button>
        </div>

        {/* 6줄 4칸 표 추가 */}
        <table className="mt-8 mx-auto border border-gray-500 p-1 w-full max-w-4xl text-center">
          <thead className="text-xl">         
            <tr>
              <th className="border border-gray-400 p-2">후기 게시판 번호</th>
              <th className="border border-gray-400 p-2">후기 게시판 제목</th>
              <th className="border border-gray-400 p-2">글쓴이</th>
              <th className="border border-gray-400 p-2">입력날짜</th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {[...Array(6)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-gray-400 p-5"></td>
                <td className="border border-gray-400 p-5"></td>
                <td className="border border-gray-400 p-5"></td>
                <td className="border border-gray-400 p-5"></td>
              </tr>
            ))}
          </tbody>
        </table>

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
          <div className="mx-0" /> {/* 한 칸 여백 추가 */ }
          <button
            type="button"
            onClick={handleAnswer} // 작성 버튼 클릭 시 호출
            className="rounded p-1 bg-green-500 text-white"
          >
            작성
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

export default ReviewBoard;
