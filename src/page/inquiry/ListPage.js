import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BasicMenu from "../../component/menus/BasicMenu";

const InquiryListPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // localStorage에서 accessToken 가져오기
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      setError("접근 토큰이 없습니다."); // 토큰이 없을 경우 에러 표시
      setLoading(false);
      return;
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .get("http://localhost:8080/api/inquiry/list", { headers })
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setInquiries(data);
        } else {
          setInquiries([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      });
  }, [accessToken]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <BasicMenu />
      <div className="bg-gray-200 my-5 w-full text-center px-10 py-10 justify-center">
        <table className="w-full bg-white border-collapse text-center">
          <thead>
            <tr>
              <th colSpan={4} className="text-right pr-4">
                <h2 className="text-xl font-bold text-center">고객 문의 리스트</h2>
              </th>
            </tr>
            <tr>
              <th colSpan={4} className="text-right pr-4">
                <Link to="/inquiry/create">
                  <button type="button" className="bg-blue-500 text-white p-2 ml-2">
                    문의 작성
                  </button>
                </Link>
              </th>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b">문의 번호</th>
              <th className="py-2 px-4 border-b">문의 제목</th>
              <th className="py-2 px-4 border-b">회원 아이디</th>
              <th className="py-2 px-4 border-b">등록 날짜</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-2">고객 문의가 없습니다.</td>
              </tr>
            ) : (
              inquiries.map((inquiry, index) => (
                <tr key={inquiry.cqNb} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-2 px-4 border-b">{inquiry.cqNb}</td>
                  <td className="py-2 px-4 border-b">{inquiry.cqTitle}</td>
                  <td className="py-2 px-4 border-b">{inquiry.usId}</td>
                  <td className="py-2 px-4 border-b">{inquiry.cqRegdt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiryListPage;
