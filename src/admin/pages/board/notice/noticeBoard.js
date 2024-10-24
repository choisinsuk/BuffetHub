import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import BasicMenu from "../../../components/menu/BasicMenu";
import { setAuthToken, getList } from "../../../../api/noticeApi";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotices, setFilteredNotices] = useState([]);

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

  return (
    <div>
      <BasicMenu />
      <div className="bg-gray-200 my-5 w-full text-center px-10 py-10 justify-center">
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
              <th className="py-2 px-4 border-b">수정</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice, index) => (
                <tr key={notice.ntNb} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-2 px-4 border-b">{notice.ntNb}</td>
                  <td className="py-2 px-4 border-b">{notice.ntTitle}</td>
                  <td className="py-2 px-4 border-b">{notice.ntRegdt}</td>
                  <td className="py-2 px-4 border-b">
                    <Link to={`/admin/noticeModify/${notice.ntNb}`}>
                      <button className="bg-yellow-500 text-white p-2">수정</button>
                    </Link>
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
      </div>
    </div>
  );
};

export default NoticeBoard;
