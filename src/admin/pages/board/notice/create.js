import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postAdd, putOne, getOne, setAuthToken } from "../../../../api/noticeApi";

const Create = () => {
  // 공지사항의 제목과 내용을 저장하는 상태
  const [newNotice, setNewNotice] = useState({ ntTitle: "", ntCtt: "" });
  // 수정할 공지사항의 ID 상태
  const [ntNb, setNtNb] = useState(null);
  // 페이지 이동을 위한 navigate 훅
  const navigate = useNavigate();
  // 현재 위치 정보 가져오기
  const location = useLocation();

  useEffect(() => {
    // 인증 토큰 설정
    setAuthToken();
    
    // 쿼리 파라미터 추출
    const query = new URLSearchParams(location.search);
    const titleParam = query.get('title');
    const contentParam = query.get('content');
    const idParam = query.get('id');
    
    // 공지사항 ID 설정
    setNtNb(idParam);

    // ID가 존재할 경우 공지사항 데이터 가져오기
    if (idParam) {
      fetchNoticeData(idParam);
    }
    // 제목과 내용 쿼리 파라미터가 있을 경우 상태 업데이트
    if (titleParam) {
      setNewNotice((prev) => ({ ...prev, ntTitle: decodeURIComponent(titleParam) }));
    }
    if (contentParam) {
      setNewNotice((prev) => ({ ...prev, ntCtt: decodeURIComponent(contentParam) }));
    }
  }, [location.search]); // 쿼리 파라미터 변경 시 재실행

  // 공지사항 데이터를 가져오는 비동기 함수
  const fetchNoticeData = async (id) => {
    try {
      const noticeData = await getOne(id); // API 호출
      setNewNotice({ ntTitle: noticeData.ntTitle, ntCtt: noticeData.ntCtt }); // 상태 업데이트
    } catch (error) {
      console.error("공지사항을 불러오는 중 오류가 발생했습니다:", error);
      alert("공지사항을 불러오는 중 오류가 발생했습니다."); // 오류 알림
    }
  };

  // 입력값 변경 시 상태 업데이트
  const handleInputChange = (e) => {
    const { name, value } = e.target; // 입력값 이름과 값 가져오기
    setNewNotice({ ...newNotice, [name]: value }); // 상태 업데이트
  };

  // 폼 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    try {
      if (ntNb) {
        await putOne({ ...newNotice, ntNb }); // 수정 시 API 호출
        alert("공지사항이 성공적으로 수정되었습니다.");
      } else {
        await postAdd(newNotice); // 작성 시 API 호출
        alert("공지사항이 성공적으로 작성되었습니다.");
      }
      
      navigate(-1); // 이전 페이지로 이동
      console.log("Navigating back to the previous page"); // 로그 추가
    } catch (error) {
      console.error("공지사항 작성/수정 중 오류 발생:", error);
      alert("공지사항 작성/수정 중 오류가 발생했습니다. 다시 시도해 주세요."); // 오류 알림
    }
  };

  return (
    <div className="bg-white my-5 w-full text-center px-10 py-10">
      <h2 className="text-xl font-bold mb-4">{ntNb ? "공지사항 수정" : "공지사항 작성"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="ntTitle" // 제목 입력 필드
            placeholder="제목"
            value={newNotice.ntTitle}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <textarea
            name="ntCtt" // 내용 입력 필드
            placeholder="내용"
            value={newNotice.ntCtt}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
            rows="4"
          />
        </div>
        <button type="submit" className="bg-orange-200 text-black p-2 font-semibold">
          {ntNb ? "수정" : "작성"}
        </button>
      </form>
    </div>
  );
};

export default Create;
