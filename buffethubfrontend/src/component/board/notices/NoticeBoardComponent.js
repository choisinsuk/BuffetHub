import React from 'react';

// NoticeBoardComponent: 공지사항 항목 하나를 표시하는 컴포넌트
const NoticeBoardComponent = ({ id, title, admin, date, isSelected, onClick }) => {
  return (
    <div 
      // 공지사항 항목을 감싸는 div
      className={`p-4 border-b last:border-b-0 cursor-pointer ${isSelected ? 'bg-gray-200' : 'bg-white'}`}
      onClick={onClick} // 클릭 시 onClick 핸들러 호출
    >
      <div className="grid grid-cols-4 gap-4">
        <div>{id}</div>          {/* 공지사항 번호 */}
        <div>{title}</div>       {/* 공지사항 제목 */}
        <div>{admin}</div>       {/* 관리자 이름 */}
        <div>{date}</div>        {/* 작성일 */}
      </div>
    </div>
  );
};

export default NoticeBoardComponent;
