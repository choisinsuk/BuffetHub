import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NoticeDetail = () => {
  // 현재 위치와 navigate 훅을 사용하여 페이지 이동을 관리
  const location = useLocation();
  const navigate = useNavigate();
  
  // 전달된 상태에서 제목과 내용을 가져옴
  const { title, content } = location.state || {};

  // 관리자 여부 설정 (실제 환경에서는 로그인 상태에 따라 동적으로 설정)
  const isAdmin = true; // 관리자는 true, 일반 회원은 false

  // 수정 버튼 클릭 시 호출되는 함수
  const handleEdit = () => {
    // 수정 페이지로 이동하며 제목과 내용을 상태로 전달
    navigate('/notices/edit', { state: { title, content } });
  };

  // 삭제 버튼 클릭 시 호출되는 함수
  const handleDelete = () => {
    // 삭제 후 알림 표시
    alert('삭제되었습니다.'); 
    // 공지사항 리스트로 돌아감
    navigate('/notices');
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{title}</h1> {/* 제목 표시 */}
      <p className="mb-2">{content}</p> {/* 내용 표시 */}

      {/* 관리자인 경우만 수정 및 삭제 버튼 보여주기 */}
      {isAdmin && (
        <div className="flex space-x-2">
          <button onClick={handleEdit} className="bg-yellow-500 text-white p-2 rounded">
            수정 {/* 수정 버튼 */}
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
            삭제 {/* 삭제 버튼 */}
          </button>
        </div>
      )}
    </div>
  );
};

export default NoticeDetail;
