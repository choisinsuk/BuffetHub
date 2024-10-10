import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditNotice = () => {
  // 현재 위치와 navigate 훅을 사용하여 페이지 이동을 관리
  const location = useLocation();
  const navigate = useNavigate();

  // 이전 페이지에서 전달된 상태 값 destructuring
  const { title: initialTitle, content: initialContent, id, updateNotice } = location.state || {};

  // 제목과 내용을 상태로 관리, 초기값 설정
  const [title, setTitle] = useState(initialTitle || '');
  const [content, setContent] = useState(initialContent || '');

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    if (typeof updateNotice === 'function') {
      // updateNotice가 함수일 경우 호출하여 공지사항 업데이트
      updateNotice(id, title, content);
      alert('수정되었습니다.'); // 수정 완료 알림
      navigate('/notices'); // 공지사항 리스트로 돌아가기
    } else {
      console.error('updateNotice is not a function'); // 오류 로그
      alert('공지사항 업데이트 핸들러가 정의되지 않았습니다.'); // 오류 알림
    }
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
            onChange={(e) => setTitle(e.target.value)} // 제목 업데이트
            maxLength={100} // 최대 길이 설정
            className="border p-2 w-full"
            required // 필수 입력
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)} // 내용 업데이트
            maxLength={4000} // 최대 길이 설정
            className="border p-2 w-full"
            rows={10} // 줄 수 설정
            required // 필수 입력
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          저장
        </button>
      </form>
    </div>
  );
};

export default EditNotice;
