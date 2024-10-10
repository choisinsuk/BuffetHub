import React from 'react';

// NoticeComponent: 공지사항 항목 하나를 표시하는 컴포넌트
const NoticeComponent = ({ id, title, author, date, isSelected, onClick }) => {
  return (
    <div 
      className={`p-4 border-b last:border-b-0 cursor-pointer ${isSelected ? 'bg-gray-200' : 'bg-white'}`}
      onClick={onClick}
    >
      <div className="grid grid-cols-4 gap-4">
        <div>{id}</div>
        <div>{title}</div>
        <div>{author}</div>
        <div>{date}</div>
      </div>
    </div>
  );
};

export default NoticeComponent;
