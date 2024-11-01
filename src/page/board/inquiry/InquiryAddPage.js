import React, { useEffect, useState } from "react"; 
import { useLocation, useNavigate } from "react-router-dom";
import { postAdd, putOne, getOne, setAuthToken } from "../../../api/inquiryApi"; // inquiry API import

const InquiryAddPage = () => {
  // 고객 문의 데이터를 저장할 상태
  const [newInquiry, setNewInquiry] = useState({
    usId: "",       // 회원 아이디
    cqTitle: "",    // 고객 문의 제목
    cqCtt: "",      // 고객 문의 내용
    cqRegdt: "",    // 고객 문의 등록 일자
  });

  // 수정할 고객 문의 ID 상태
  const [cqNb, setCqNb] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 컴포넌트 마운트 시 토큰 설정 및 기존 데이터 확인
  useEffect(() => {
    setAuthToken(); // 인증 토큰 설정
    const query = new URLSearchParams(location.search);
    const titleParam = query.get("title");
    const contentParam = query.get("content");
    const idParam = query.get("id");
    
    setCqNb(idParam); // 고객 문의 ID 설정
    
    // ID가 존재하면 기존 데이터 불러오기
    if (idParam) {
      fetchInquiryData(idParam);
    }
    // 쿼리 파라미터로 전달된 제목과 내용이 있으면 상태 업데이트
    if (titleParam) {
      setNewInquiry((prev) => ({ ...prev, cqTitle: decodeURIComponent(titleParam) }));
    }
    if (contentParam) {
      setNewInquiry((prev) => ({ ...prev, cqCtt: decodeURIComponent(contentParam) }));
    }
  }, [location.search]);

  // 서버로부터 특정 고객 문의 데이터를 불러오는 함수
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

  // 입력값 변경 시 상태 업데이트
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInquiry({ ...newInquiry, [name]: value });
  };

  // 폼 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cqNb) {
        await putOne({ ...newInquiry, cqNb });
        alert("고객 문의가 성공적으로 수정되었습니다.");
      } else {
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
        <div>
          <input
            type="text"
            name="usId" // 회원 아이디 입력 필드
            placeholder="회원 아이디"
            value={newInquiry.usId}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <input
            type="text"
            name="cqTitle" // 제목 입력 필드
            placeholder="제목"
            value={newInquiry.cqTitle}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <textarea
            name="cqCtt" // 내용 입력 필드
            placeholder="내용"
            value={newInquiry.cqCtt}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
            rows="4"
          />
        </div>
        <div>
          <input
            type="date"
            name="cqRegdt" // 등록 일자 입력 필드
            value={newInquiry.cqRegdt}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-orange-200 text-black p-2 font-semibold">
          {cqNb ? "수정" : "작성"}
        </button>
      </form>
    </div>
  );
};

export default InquiryAddPage;
