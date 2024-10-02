import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import BoardLayout from "../../layouts/BoardParts/BoardLayout"; 

const Make = () => {
  const navigate = useNavigate(); // 네비게이션을 위한 훅
  const [title, setTitle] = useState(""); // 제목 상태, 초기값은 빈 문자열
  const [menuTitle, setMenuTitle] = useState(""); // 작성자 상태, 초기값은 빈 문자열
  const [content, setContent] = useState(""); // 내용 상태, 초기값은 빈 문자열

  // 뒤로가기 버튼 핸들러
  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    // 모든 필드가 작성되었는지 확인
    if (!title.trim() || !menuTitle.trim() || !content.trim()) {
      alert("작성해주세요"); // 필드가 비어있으면 경고
      return;
    }

    // 새로운 포스트 객체 생성
    const newPost = { title, menuTitle, content };

    try {
      // API에 포스트 요청
      const response = await axios.post('/api/posts', newPost);
      console.log("게시물 작성 성공:", response.data);
      navigate("/notice"); // 성공 시 공지사항 페이지로 이동
    } catch (error) {
      console.error("게시물 작성 중 오류:", error);
      alert("게시물 작성 중 오류가 발생했습니다."); // 오류 발생 시 알림
    }
  };

  return (
    <BoardLayout>
      <div className="text-5xl text-center">
        <div>공지사항 작성</div> {/* 페이지 제목 */}
      </div>
      <div className="mt-8">
        {/* 컨테이너로 변경, 전체 너비 설정 */}
        <div className="mx-auto w-full">
          <div className="flex flex-col">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full border border-gray-400 rounded p-2 mb-2"
              placeholder="TITLE" // 제목 입력 박스
            />
            <input
              type="text"
              value={menuTitle}
              onChange={(e) => setMenuTitle(e.target.value)} 
              className="w-full border border-gray-400 rounded p-2 mb-2"
              placeholder="새로운 메뉴 출시!" // 메뉴 제목 입력 박스
            />
            <textarea
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="w-full h-60 border border-gray-400 rounded p-2"
              placeholder="내용을 입력하세요." // 내용 입력 박스
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4"> {/* 버튼을 오른쪽 정렬 */}
        <button
          onClick={handleGoBack} 
          className="bg-blue-500 text-white rounded p-2 mr-2"
        >
          뒤로가기 {/* 뒤로가기 버튼 */}
        </button>
        <button
          onClick={handleSubmit} 
          className="bg-yellow-500 text-white rounded p-2"
        >
          작성완료 {/* 작성 완료 버튼 */}
        </button>
      </div>
    </BoardLayout>
  );
};

export default Make; // Make 컴포넌트 내보내기
