// 필요한 모듈 가져오기
import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicMenu from "../../components/menu/BasicMenu";

// 컴포넌트 정의
const NoticeBoard = () => {
  // 공지사항 리스트 상태 초기화
  const [notices, setNotices] = useState([]); // 공지사항 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 컴포넌트가 마운트될 때 공지사항 데이터 API 호출
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/noticeBoard/list"); // 백엔드에서 공지사항 데이터를 가져옴
        setNotices(Array.isArray(response.data) ? response.data : []); // 가져온 데이터를 상태로 저장
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error); // 오류 처리
        setError("공지사항을 불러오는 중 오류가 발생했습니다."); // 에러 메시지 설정
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchNotices();
  }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때만 실행

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중 메시지
  }

  return (
    <div>
      <BasicMenu /> {/* 기본 메뉴 렌더링 */}

      {/* 메인 콘텐츠 영역 */}
      <div className="bg-white my-5 w-full flex-col space-y-4">
        <main className="bg-customColor2 w-5/6 mx-auto px-3 py-20 rounded-lg flex items-center justify-center text-center shadow-lg border-2-black ">
          <div className="text-5xl text-fontColor font-bold ">공지사항</div>
        </main>
      </div>

      <div className="bg-white my-5 w-full space-y-4 text-center">
        <main className="bg-red-200 w-full text-center p-4 rounded">
          <h2 className="text-xl font-bold mb-4">공지사항 리스트</h2>
          {error && <div className="text-red-500">{error}</div>} {/* 에러 메시지 표시 */}
          <table className="w-full bg-white border-collapse text-center">
            <thead>
              <tr className="bg-gray-200">
                {/* 공지사항 헤더 */}
                <th className="py-2 px-4 border-b">공지사항 번호</th>
                <th className="py-2 px-4 border-b">공지사항 제목</th>
                <th className="py-2 px-4 border-b">입력 날짜</th>
              </tr>
            </thead>
            <tbody>
              {/* 공지사항 리스트를 테이블로 렌더링 */}
              {notices.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-2">등록된 공지사항이 없습니다.</td>
                </tr>
              ) : (
                notices.map((notice, index) => (
                  <tr key={notice.ntNb} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-2 px-4 border-b">{notice.ntNb}</td>
                    <td className="py-2 px-4 border-b">{notice.ntTitle}</td>
                    <td className="py-2 px-4 border-b">{notice.ntRegdt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

// 컴포넌트 내보내기
export default NoticeBoard;
