import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import BoardLayout from "../../layouts/BoardParts/BoardLayout"; 

const Answer = () => {
  const navigate = useNavigate(); // 네비게이션을 위한 훅
  const [title, setTitle] = useState(""); // 제목 상태
  const [menuTitle, setMenuTitle] = useState(""); // 작성자 상태
  const [content, setContent] = useState(""); // 내용 상태
  const [additionalContent, setAdditionalContent] = useState(""); // 추가 내용 상태

  // 뒤로가기 버튼 핸들러
  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    // 모든 필드가 작성되었는지 확인
    if (!title.trim() || !menuTitle.trim() || !content.trim() || !additionalContent.trim()) {
      alert("모든 필드를 작성해주세요"); // 필드가 비어있으면 경고
      return;
    }

    // 새로운 포스트 객체 생성
    const newPost = { title, menuTitle, content, additionalContent }; 

    try {
      // API에 포스트 요청
      const response = await axios.post('/api/posts', newPost); 
      console.log("후기게시판 작성 성공:", response.data);
      navigate("/reviewBoard"); // 성공 시 후기 게시판으로 이동
    } catch (error) {
      console.error("게시물 작성 중 오류:", error);
      alert("게시물 작성 중 오류가 발생했습니다."); // 오류 발생 시 알림
    }
  };

  return (
    <BoardLayout>
      <div className="text-5xl text-center">
        <div>후기 게시판 답변</div> {/* 페이지 제목 */}
      </div>
      <div className="mt-8">
        <div className="mx-auto w-full">
          <div className="flex flex-col">
            <div className="flex mb-2"> {/* 제목과 작성자를 위한 입력 필드 */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
                className="w-1/2 border border-gray-400 rounded p-2 mr-2" // 제목 입력 박스
                placeholder="제목" 
              />
              <input
                type="text"
                value={menuTitle}
                onChange={(e) => setMenuTitle(e.target.value)} 
                className="w-1/2 border border-gray-400 rounded p-2" // 작성자 입력 박스
                placeholder="작성자" 
              />
            </div>
            <textarea
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="w-full h-60 border border-gray-200 rounded p-2 mb-2"
              placeholder="내용을 입력하세요." // 내용 입력 박스
            />
            <div className="flex justify-end mb-4"> {/* 답글 달기 버튼 */}
              <button
                onClick={handleGoBack} 
                className="bg-blue-500 text-white rounded p-0.125 mr-2"
              >
                답글 달기
              </button>
            </div>
            <input
              type="text"
              value={menuTitle}
              onChange={(e) => setMenuTitle(e.target.value)} 
              className="w-full border border-gray-400 rounded p-2 mb-2"
              placeholder="작성된 답변" // 답변 내용 입력 박스
            />
            <textarea
              value={additionalContent} 
              onChange={(e) => setAdditionalContent(e.target.value)} 
              className="w-full h-40 border border-gray-200 rounded p-2 mb-2"
              placeholder="작성자 : 관리자" // 관리자 작성자 입력 박스
            />
            <div className="flex justify-end mb-4"> {/* 수정 및 삭제 버튼 */}
              <button
                onClick={handleGoBack} 
                className="bg-blue-500 text-white rounded p-0.125 mr-2"
              >
                수정하기
              </button>
              <button
                onClick={handleGoBack} 
                className="bg-blue-500 text-white rounded p-0.125 mr-2"
              >
                삭제하기
              </button>
            </div>
            <textarea
              value={additionalContent} 
              onChange={(e) => setAdditionalContent(e.target.value)} 
              className="w-full h-40 border border-gray-200 rounded p-2 mb-2"
              placeholder="댓글을 입력하세요." // 댓글 입력 박스
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4"> {/* 최종 제출 및 뒤로가기 버튼 */}
        <button
          onClick={handleSubmit} 
          className="bg-blue-500 text-white rounded p-0.125 mr-2"
        >
          답변등록
        </button>
        <button
          onClick={handleGoBack} 
          className="bg-blue-500 text-white rounded p-0.125 mr-2"
        >
          뒤로가기
        </button>
      </div>
    </BoardLayout>
  );
};

export default Answer;
