import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// 공지사항 세부 정보 컴포넌트
const NoticeDetailComponent = () => {
  const location = useLocation(); // 현재 위치 정보 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅 사용
  
  // 전달된 상태에서 제목, 내용, 작성자, 날짜, ID 정보 가져오기
  const { title, content, admin, date, id } = location.state || {};

  // 삭제 버튼 클릭 시 호출되는 함수
  const handleDelete = () => {
    // 여기서 삭제 API 호출 로직 추가
    alert('삭제되었습니다.'); // 삭제 알림 표시
    navigate('/notices'); // 공지사항 리스트로 돌아감
  };

  return (
    <div className="p-4">
      {/* 제목 박스 */}
      <div className="border p-4 mb-4 max-w-xl mx-auto rounded">
        <h1 className="text-3xl font-bold truncate">{title}</h1> {/* 제목 표시 */}
      </div>
      
      {/* 작성자 박스 */}
      <div className="border p-4 mb-4 max-w-xl mx-auto rounded">
        <h2 className="text-xl font-semibold">작성자: {admin}</h2> {/* 작성자 표시 */}
      </div>

      {/* 내용 박스 */}
      <div className="border p-4 mb-4 max-w-xl mx-auto rounded h-[400px] overflow-auto">
        <p>{content}</p> {/* 내용 표시 */}
      </div>

      {/* 날짜 박스 */}
      <div className="border p-4 mb-4 max-w-xl mx-auto rounded">
        <h3 className="text-lg">날짜: {date}</h3> {/* 날짜 표시 */}
      </div>

      {/* 수정 및 삭제 버튼 */}
      <div className="flex justify-center space-x-2">
        <button onClick={() => navigate('/notices/edit', { state: { title, content, admin, date, id } })} className="bg-yellow-500 text-white p-2 rounded">
          수정 {/* 수정 버튼 */}
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
          삭제 {/* 삭제 버튼 */}
        </button>
      </div>
    </div>
  );
};

export default NoticeDetailComponent;
