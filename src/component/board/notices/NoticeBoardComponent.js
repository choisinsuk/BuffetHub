import React, { useState } from 'react';
import NoticeBoardComponent from './NoticeBoardComponent';

// NoticeBoardList: 공지사항 리스트를 표시하는 컴포넌트
const NoticeBoardList = ({ notices }) => {
  const [selectedNoticeId, setSelectedNoticeId] = useState(null); // 선택된 공지사항 ID 상태

  const handleNoticeClick = (id) => {
    setSelectedNoticeId(id); // 클릭한 공지사항 ID로 상태 업데이트
  };

  return (
    <div className="mt-5">
      <h2 className="text-2xl mb-4">공지사항</h2>
      {notices.map((notice) => (
        <NoticeBoardComponent
          key={notice.id}
          id={notice.id}
          title={notice.title}
          admin={notice.admin}
          date={notice.date}
          isSelected={selectedNoticeId === notice.id}
          onClick={() => handleNoticeClick(notice.id)} // 클릭 핸들러 전달
        />
      ))}
    </div>
  );
};

export default NoticeBoardList;
