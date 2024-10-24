import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import BasicMenu from "../../../components/menu/BasicMenu";
import { setAuthToken, getList, getOne } from "../../../../api/noticeApi";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null); // 선택한 공지사항 상태
  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken();
    fetchNotices(); // 컴포넌트가 마운트될 때 공지사항을 불러옴
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await getList({ page: 0, size: 100 });
      setNotices(response);
      setFilteredNotices(response);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      alert("공지사항을 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredNotices(notices);
    } else {
      const results = notices.filter((notice) =>
        notice.ntTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotices(results);
    }
  }, [searchTerm, notices]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredNotices(notices);
    } else {
      const results = notices.filter((notice) =>
        notice.ntTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotices(results);
    }
  };

  const handleTitleClick = async (ntNb) => {
    try {
      const data = await getOne(ntNb); // 선택한 공지사항 정보 가져오기
      setSelectedNotice(data); // 선택한 공지사항 상태 업데이트
    } catch (error) {
      console.error("공지사항을 불러오는 중 오류 발생:", error);
      alert("공지사항을 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleCloseDetail = () => {
    setSelectedNotice(null); // 공지사항 상세 보기 닫기
  };

  return (
    <div>
      <BasicMenu />

      <div className="bg-white my-5 w-full flex-col space-y-4">
        <main className="bg-orange-100 w-5/6 mx-auto px-3 py-20 rounded-lg flex items-center justify-center text-center shadow-lg border-2-black ">
          <div className="text-5xl text-fontColor font-bold ">공지사항 관리</div>
        </main>
      </div>


      <div className="bg-gray-200 my-5 w-5/6 text-center px-10 py-10 justify-center ">
        <h2 className="text-xl font-bold">공지사항 리스트</h2>
        <div className="mb-4 flex items-center justify-center">
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={handleInputChange}
            className="border border-black p-2"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2">
            검색
          </button>
          <Link to="/admin/create">
            <button type="button" className="bg-green-500 text-white p-2 ml-2">
              작성
            </button>
          </Link>
        </div>
        <table className="w-full bg-white border-collapse text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">공지사항 번호</th>
              <th className="py-2 px-4 border-b">공지사항 제목</th>
              <th className="py-2 px-4 border-b">입력날짜</th>
              <th className="py-2 px-4 border-b">상세보기</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice, index) => (
                <tr key={notice.ntNb} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-2 px-4 border-b">{notice.ntNb}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => handleTitleClick(notice.ntNb)} className="text-blue-500 underline">
                      {notice.ntTitle}
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">{notice.ntRegdt}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => navigate(`/admin/noticeModify/${notice.ntNb}`)} className="bg-yellow-500 text-white p-2">
                      수정
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-2">검색 결과가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>

        {selectedNotice && ( // 선택한 공지사항이 있을 때만 보여줌
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded shadow-lg  w-3/5 h-auto">
              <h2 className="py-5 text-xl font-bold">제목 : {selectedNotice.ntTitle}</h2>
              <hr/>
              <p className="py-5 text-left"><span className="text-2xl font-bold">내용<hr className="pt-5"/></span><br/>{selectedNotice.ntCtt}</p>
              <p className="mt-4">입력날짜: {selectedNotice.ntRegdt}</p>
              <button onClick={handleCloseDetail} className="bg-gray-500 text-white p-2 mt-4">
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;
