import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// 모달 컴포넌트: 메시지를 표시하고 닫기 버튼을 제공
const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">{message}</h2>
        <button onClick={onClose} className="bg-blue-500 text-white p-2 rounded">
          닫기
        </button>
      </div>
    </div>
  );
};

const NoticeDetail = () => {
  const location = useLocation(); // 현재 위치 정보 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅 사용
  
  // 전달된 상태에서 제목, 내용, 작성자, 날짜 정보 가져오기
  const { title, content, admin, date, /* isAdmin */ } = location.state || {};

  // 모달 메시지 및 열림 상태 관리
  const [modalMessage, setModalMessage] = useState(''); // 모달에 표시할 메시지 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태

  // 수정 버튼 클릭 시 호출되는 함수
  const handleEdit = () => {
    navigate('/notices/edit', { state: { title, content, admin, date } }); // 수정 페이지로 이동
    setModalMessage('수정되었습니다'); // 모달에 표시할 메시지 설정
    setIsModalOpen(true); // 모달 열기
  };

  // 삭제 버튼 클릭 시 호출되는 함수
  const handleDelete = () => {
    alert('삭제되었습니다.'); // 삭제 알림 표시
    setModalMessage('삭제되었습니다'); // 모달에 표시할 메시지 설정
    setIsModalOpen(true); // 모달 열기
    navigate('/notices'); // 공지사항 리스트로 돌아감
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false); // 모달 상태를 닫힘으로 설정
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

      {/* 관리자인 경우만 수정 및 삭제 버튼 보여주기 */}
     {/* {isAdmin && ( */}
        <div className="flex justify-center space-x-2">
          <button onClick={handleEdit} className="bg-yellow-500 text-white p-2 rounded">
            수정 {/* 수정 버튼 */}
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
            삭제 {/* 삭제 버튼 */}
          </button>
        </div>
     {/* )}  */}

      {/* 모달 창 표시 */}
      {isModalOpen && (
        <Modal message={modalMessage} onClose={closeModal} /> // 모달 컴포넌트 렌더링
      )}
    </div>
  );
};

export default NoticeDetail;
