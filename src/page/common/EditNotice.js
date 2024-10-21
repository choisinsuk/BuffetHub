import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditNotice = ({ handleNoticeUpdate, initialTitle, initialContent, initialDate }) => {
  
  console.log('handleNoticeUpdate:', handleNoticeUpdate); // 전달된 값 확인
  
  const location = useLocation();
  const navigate = useNavigate();

  const { id: number } = location.state || {};

  const [title, setTitle] = useState(initialTitle || '');
  const [content, setContent] = useState(initialContent || '');
  const [date, setDate] = useState(initialDate || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof handleNoticeUpdate === 'function') {
      handleNoticeUpdate(number, title, content, date); // 업데이트 핸들러 호출
    } else {
      console.error("handleNoticeUpdate is not a function");
    }
    alert('수정되었습니다.');
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
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
            onChange={(e) => setDate(e.target.value)}
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

export default EditNotice;
