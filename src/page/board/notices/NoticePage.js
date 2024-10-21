import React, { useState } from "react"; 
import BasicLayout from "../../../layouts/MainLayout.js"; 
import NoticeComponent from "../../../component/board/notices/NoticeBoardComponent.js"; 
import { Link, useNavigate } from "react-router-dom"; 
import EditNotice from "../../common/EditNotice.js"; // EditNotice를 임포트 해 온다

const NoticePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [notices, setNotices] = useState([
    { id: 1, title: "제목 1", content: "내용 1", admin: "관리자", date: "2024-10-01" },
    { id: 2, title: "제목 2", content: "내용 2", admin: "관리자", date: "2024-10-02" },
    { id: 3, title: "제목 3", content: "내용 3", admin: "관리자", date: "2024-10-03" },
    { id: 4, title: "제목 4", content: "내용 4", admin: "관리자", date: "2024-10-04" },
    { id: 5, title: "제목 5", content: "내용 5", admin: "관리자", date: "2024-10-05" },
    { id: 6, title: "제목 6", content: "내용 6", admin: "관리자", date: "2024-10-06" },
    { id: 7, title: "제목 7", content: "내용 7", admin: "관리자", date: "2024-10-07" },
    { id: 8, title: "제목 8", content: "내용 8", admin: "관리자", date: "2024-10-08" },
  ]);
  
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  
  const [currentNotice, setCurrentNotice] = useState(null); // 현재 수정 중인 공지사항

  const navigate = useNavigate();

  const filteredNotices = notices.filter(notice =>
    notice.title.includes(searchTerm) || notice.content.includes(searchTerm)
  );

  const handleNoticeClick = (notice) => {
    navigate(`/notices/${notice.id}`, { state: { title: notice.title, content: notice.content } });
  };

  const handleNoticeUpdate = (id, title, content) => {
    setNotices(prevNotices => 
      prevNotices.map(notice =>
        notice.id === id ? { ...notice, title, content } : notice
      )
    );
    console.log('공지사항 업데이트 완료:', { id, title, content });
    setIsEditing(false); // 수정 완료 후 수정 모드 비활성화
    setCurrentNotice(null); // 현재 수정 중인 공지사항 초기화
  };
  
  const handleEditClick = (notice) => {
    setCurrentNotice(notice); // 현재 수정 중인 공지사항 설정
    setIsEditing(true); // 수정 모드 활성화
  };
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= 9) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * 8;
  const currentNotices = filteredNotices.slice(startIndex, startIndex + 8);

  return (
    <BasicLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">공지사항</h1>
        <input
          type="text"
          placeholder="공지사항 검색"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <div className="mb-4">
          {currentNotices.map(notice => (
            <NoticeComponent 
              key={notice.id} 
              id={notice.id} 
              title={notice.title} 
              admin={notice.admin} 
              date={notice.date} 
              onClick={() => handleNoticeClick(notice)} 
              onEdit={() => handleEditClick(notice)} 
            />
          ))}
        </div>

        {/* EditNotice 컴포넌트 조건부 렌더링 */}
          {isEditing && currentNotice && (
            <EditNotice 
              handleNoticeUpdate={handleNoticeUpdate} 
              initialTitle={currentNotice.title} 
              initialContent={currentNotice.content} 
              initialDate={currentNotice.date} 
            />
          )}
          
          <div className="flex justify-center items-center space-x-2 mb-2">
          <button className="border p-1" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
            {'<<'}
          </button>
          <button className="border p-1" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            {'<'}
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(page => (
            <button 
              key={page} 
              className={`border p-1 ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button className="border p-1" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === 9}>
            {'>'}
          </button>
          <button className="border p-1" onClick={() => handlePageChange(9)} disabled={currentPage === 9}>
            {'>>'}
          </button>
        </div>

        <Link to="/qa" className="block text-center bg-blue-500 text-white p-3 rounded">
          고객 문의
        </Link>
      </div>
    </BasicLayout>
  );
};

export default NoticePage;
