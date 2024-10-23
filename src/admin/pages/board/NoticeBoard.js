// NoticeBoard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicMenu from "../../components/menu/BasicMenu";
import NoticeTable from "./NoticeTable"; // NoticeTable 컴포넌트 가져오기

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken"); // JWT 토큰 가져오기

  console.log("토큰:", token)
  // API 기본 설정
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/admin/",
    headers: {
      "Authorization": `Bearer ${token}`, // JWT 토큰 추가
      "Content-Type": "application/json"
    },
  });

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:8080/api/admin/noticeBoard/list");
        setNotices(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
        setError("공지사항을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <BasicMenu />
      <div className="bg-white my-5 w-full flex-col space-y-4">
        <main className="bg-customColor2 w-5/6 mx-auto px-3 py-20 rounded-lg flex items-center justify-center text-center shadow-lg border-2-black">
          <div className="text-5xl text-fontColor font-bold">공지사항</div>
        </main>
      </div>
      {/* NoticeTable 컴포넌트 사용 */}
      <NoticeTable notices={notices} error={error} />
    </div>
  );
};

export default NoticeBoard;
