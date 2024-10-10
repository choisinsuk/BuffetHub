import React, { useState } from "react"; 
import BasicLayout from "../../../layouts/BasicLayout"; 
import NoticeComponent from "../../../component/board/notices/NoticeComponent"; 
import { Link, useNavigate } from "react-router-dom"; 

const NoticePage = () => {
  // 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState("");

  // 공지사항 목록 상태 관리
  const [notices, setNotices] = useState([
    { id: 1, title: "제목 1", content: "내용 1", author: "성충환", date: "2024-10-01" },
    { id: 2, title: "제목 2", content: "내용 2", author: "박용현", date: "2024-10-02" },
    { id: 3, title: "제목 3", content: "내용 3", author: "이재준", date: "2024-10-03" },
    { id: 4, title: "제목 4", content: "내용 4", author: "윤석민", date: "2024-10-04" },
    { id: 5, title: "제목 5", content: "내용 5", author: "신스기", date: "2024-10-05" },
    { id: 6, title: "제목 6", content: "내용 6", author: "신석기", date: "2024-10-06" },
    { id: 7, title: "제목 7", content: "내용 7", author: "신수기", date: "2024-10-07" },
    { id: 8, title: "제목 8", content: "내용 8", author: "신숙기", date: "2024-10-08" },
  ]);
  
  // navigate 훅을 사용하여 페이지 이동을 관리
  const navigate = useNavigate();

  // 검색어에 따라 공지사항 필터링
  const filteredNotices = notices.filter(notice =>
    notice.title.includes(searchTerm) || notice.content.includes(searchTerm)
  );

  // 공지사항 클릭 시 상세 페이지로 이동
  const handleNoticeClick = (notice) => {
    navigate(`/notices/${notice.id}`, { state: { title: notice.title, content: notice.content } });
  };

  // 공지사항 업데이트 핸들러
  const handleNoticeUpdate = (id, updatedTitle, updatedContent) => {
    // 해당 ID의 공지사항을 찾아 제목과 내용을 업데이트
    setNotices(prevNotices => 
      prevNotices.map(notice =>
        notice.id === id ? { ...notice, title: updatedTitle, content: updatedContent } : notice
      )
    );
  };

  // 수정 클릭 시 수정 페이지로 이동
  const handleEditClick = (notice) => {
    navigate(`/notices/edit`, { state: { 
      id: notice.id, 
      title: notice.title, 
      content: notice.content, 
      updateNotice: handleNoticeUpdate // 업데이트 핸들러 전달
    } });
  };

  return (
    <BasicLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">공지사항</h1>
        <input
          type="text"
          placeholder="공지사항 검색"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)} // 검색어 업데이트
          className="border p-2 mb-4 w-full"
        />
        <div className="mb-4">
          {/* 필터링된 공지사항 목록을 NoticeComponent로 렌더링 */}
          {filteredNotices.slice(0, 8).map(notice => (
            <NoticeComponent 
              key={notice.id} 
              id={notice.id} 
              title={notice.title} 
              author={notice.author} 
              date={notice.date} 
              onClick={() => handleNoticeClick(notice)} // 공지사항 클릭 핸들러
              onEdit={() => handleEditClick(notice)} // 수정 클릭 핸들러
            />
          ))}
        </div>

        {/* 페이지 네비게이션 버튼 */}
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(page => (
            <button key={page} className="border p-2">
              {page}
            </button>
          ))}
        </div>

        {/* 고객 문의 버튼 */}
        <Link to="/qa" className="block text-center bg-blue-500 text-white p-3 rounded">
          고객 문의
        </Link>
      </div>
    </BasicLayout>
  );
};

export default NoticePage;
