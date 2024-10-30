import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postAdd, putOne, getOne, setAuthToken } from "../../../api/inquiryApi"; // inquiry API import

const InquiryAddPage = () => {
  // 고객 문의 데이터를 저장할 상태 (실제 테이블 컬럼명과 일치)
  const [newInquiry, setNewInquiry] = useState({
    usId: "",       // 회원 아이디
    cqTitle: "",    // 고객 문의 제목
    cqCtt: "",      // 고객 문의 내용
    cqRegdt: "",    // 고객 문의 등록 일자
  });
  
  const [cqNb, setCqNb] = useState(null); // 고객 문의 번호 상태 추가 (수정 시 필요)
  const navigate = useNavigate();
  const location = useLocation();

  // 초기 로드 시 토큰 설정 및 기존 데이터 확인
  useEffect(() => {
    setAuthToken(); // 인증 토큰 설정
    
    const query = new URLSearchParams(location.search);
    const titleParam = query.get('title');
    const contentParam = query.get('content');
    const idParam = query.get('id');
    setCqNb(idParam); // 고객 문의 ID 설정
    
    // ID가 있을 경우 데이터 불러오기
    if (idParam) {
      fetchInquiryData(idParam);
    }
    if (titleParam) {
      setNewInquiry((prev) => ({ ...prev, cqTitle: decodeURIComponent(titleParam) }));
    }
    if (contentParam) {
      setNewInquiry((prev) => ({ ...prev, cqCtt: decodeURIComponent(contentParam) }));
    }
  }, [location.search]);

  // 서버로부터 특정 문의 데이터를 불러옴
  const fetchInquiryData = async (id) => {
    try {
      const inquiryData = await getOne(id);
      setNewInquiry({
        usId: inquiryData.usId,
        cqTitle: inquiryData.cqTitle,
        cqCtt: inquiryData.cqCtt,
        cqRegdt: inquiryData.cqRegdt,
      });
    } catch (error) {
      console.error("고객 문의를 불러오는 중 오류가 발생했습니다:", error);
      alert("고객 문의를 불러오는 중 오류가 발생했습니다.");
    }
  };

  // 입력 값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInquiry({ ...newInquiry, [name]: value });
  };

  // 폼 제출 시 데이터 전송 처리
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    try {
      if (cqNb) { // 고객 문의 ID가 있을 경우 수정
        await putOne({ ...newInquiry, cqNb });
        alert("고객 문의가 성공적으로 수정되었습니다.");
      } else { // 새로운 고객 문의 작성
        await postAdd(newInquiry);
        alert("고객 문의가 성공적으로 작성되었습니다.");
      }
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error("고객 문의 작성/수정 중 오류 발생:", error);
      alert("고객 문의 작성/수정 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="bg-white my-5 w-full text-center px-10 py-10">
      <h2 className="text-xl font-bold mb-4">{cqNb ? "고객 문의 수정" : "고객 문의 작성"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 회원 아이디 입력 필드 */}
        <div>
          <input
            type="text"
            name="usId"
            placeholder="회원 아이디"
            value={newInquiry.usId}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>
        {/* 고객 문의 제목 입력 필드 */}
        <div>
          <input
            type="text"
            name="cqTitle"
            placeholder="제목"
            value={newInquiry.cqTitle}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>
        {/* 고객 문의 내용 입력 필드 */}
        <div>
          <textarea
            name="cqCtt"
            placeholder="내용"
            value={newInquiry.cqCtt}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
            rows="4"
          />
        </div>
        {/* 고객 문의 등록 일자 입력 필드 */}
        <div>
          <input
            type="date"
            name="cqRegdt"
            value={newInquiry.cqRegdt}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>
        {/* 제출 버튼 */}
        <button type="submit" className="bg-orange-200 text-black p-2 font-semibold">
          {cqNb ? "수정" : "작성"}
        </button>
      </form>
    </div>
  );
};

export default InquiryAddPage;
