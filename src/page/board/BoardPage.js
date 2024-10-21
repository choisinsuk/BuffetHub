import React, { useState } from "react";
import BasicLayout from "../../layouts/MainLayout";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import NoticeComponent from "../../component/board/notices/NoticeBoardComponent";

const BoardPage = () => {
  const [notices] = useState([
    { id: 1, title: "제목 1", content: "내용 1", admin: "관리자", date: "2024-10-01" },
    { id: 2, title: "제목 2", content: "내용 2", admin: "관리자", date: "2024-10-02" },
    { id: 3, title: "제목 3", content: "내용 3", admin: "관리자", date: "2024-10-03" },
    { id: 4, title: "제목 4", content: "내용 4", admin: "관리자", date: "2024-10-04" },
    { id: 5, title: "제목 5", content: "내용 5", admin: "관리자", date: "2024-10-05" },
    { id: 6, title: "제목 6", content: "내용 6", admin: "관리자", date: "2024-10-06" },
    { id: 7, title: "제목 7", content: "내용 7", admin: "관리자", date: "2024-10-07" },
    { id: 8, title: "제목 8", content: "내용 8", admin: "관리자", date: "2024-10-08" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 8;

  const totalPages = Math.ceil(notices.length / noticesPerPage);
  const startIndex = (currentPage - 1) * noticesPerPage;
  const currentNotices = notices.slice(startIndex, startIndex + noticesPerPage);

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleNoticeClick = (notice) => {
    navigate("/notices/detail", { state: notice }); // 상세 페이지로 이동 및 상태 전달
  };

  return (
    <BasicLayout>
      <div className="flex flex-col items-center">
        <div className="text-4xl text-center mb-4">Board</div>
        
        <div className="flex space-x-4 text-center" style={{ fontSize: '18px' }}>
          <Link to="/notices" className="border-2 border-black p-3 w-40 flex items-center justify-center">
            공지사항
          </Link>
          <Link to="/reviews" className="border-2 border-black p-3 w-40 flex items-center justify-center">
            후기 게시판
          </Link>
          <Link to="/qa" className="border-2 border-black p-3 w-40 flex items-center justify-center">
            고객문의
          </Link>
        </div>

        <div className="mt-0 w-full">
          {currentNotices.map(notice => (
            <div 
              key={notice.id} 
              className="cursor-pointer" 
              onClick={() => handleNoticeClick(notice)} // 클릭 핸들러 추가
            >
              <NoticeComponent 
                id={notice.id} 
                title={notice.title} 
                admin={notice.admin} 
                date={notice.date} 
                onClick={() => console.log(`Clicked: ${notice.title}`)} // 기존 클릭 핸들러
              />
            </div>
          ))}
        </div>

        {/* 페이지 네비게이션 버튼 */}
        <div className="flex justify-center items-center space-x-2 mb-2">
          <button className="border p-1" onClick={() => handlePageChange(1)}>
            {'<<'}
          </button>
          <button className="border p-1" onClick={() => handlePageChange(currentPage - 1)}>
            {'<'}
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button 
              key={index + 1} 
              className={`border p-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button className="border p-1" onClick={() => handlePageChange(currentPage + 1)}>
            {'>'}
          </button>
          <button className="border p-1" onClick={() => handlePageChange(totalPages)}>
            {'>>'}
          </button>
        </div>
      </div>
    </BasicLayout>
  );
};

export default BoardPage;
