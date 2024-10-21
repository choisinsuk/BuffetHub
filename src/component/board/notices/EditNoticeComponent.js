import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditNoticeComponent = () => {
  const location = useLocation(); // 현재 위치 정보 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅 사용

  // 초기 제목, 내용, ID, 날짜 정보 가져오기
  const { title: initialTitle, content: initialContent, id: number, date: initialDate } = location.state || {};

  // 상태 관리
  const [title, setTitle] = useState(initialTitle || ''); // 제목 상태
  const [content, setContent] = useState(initialContent || ''); // 내용 상태
  const [date, setDate] = useState(initialDate || ''); // 날짜 상태

  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    const { updateNotice } = location.state || {}; // 업데이트 핸들러 가져오기
    if (typeof updateNotice === 'function') {
      updateNotice(number, title, content); // 업데이트 핸들러 호출
    } else {
      console.error("updateNotice is not a function"); // 에러 처리
    }
    alert('수정되었습니다.'); // 수정 완료 알림
    navigate('/notices'); // 공지사항 리스트로 돌아가기
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">공지사항 수정</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // 제목 입력 처리
            maxLength={100}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)} // 내용 입력 처리
            maxLength={4000}
            className="border p-2 w-full"
            rows={10}
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="block mb-2 mr-2">날짜</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)} // 날짜 입력 처리
            className="border p-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          저장
        </button>
      </form>
    </div>
  );
};

export default EditNoticeComponent;
