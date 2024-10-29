import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅 추가

const AddInquiry = () => {
  // 고객문의 데이터를 저장할 상태 (실제 테이블 컬럼명과 일치)
  const [newInquiry, setNewInquiry] = useState({
    usId: "",        // 회원 아이디
    cqTitle: "",     // 고객 문의 제목
    cqCtt: "",       // 고객 문의 내용
    cqRegdt: "",     // 고객 문의 등록 일자
  });

  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const accessToken = localStorage.getItem("accessToken"); // 액세스 토큰을 로컬스토리지에서 가져옴

  // 입력 값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 기존 상태값에 입력 필드 값 업데이트
    setNewInquiry({ ...newInquiry, [name]: value });
  };

  // 폼 제출 시 서버로 데이터 전송
  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 리로드 방지
    try {
      // POST 요청을 통해 서버에 데이터를 전송
      const response = await axios.post("http://localhost:8080/api/inquiry/add", newInquiry, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 액세스 토큰 추가
        },
      }); 
      alert("고객문의가 성공적으로 작성되었습니다."); // 성공 메시지
      navigate('/inquiry/list'); // 고객문의 목록 페이지로 이동
    } catch (error) {
      // 오류 발생 시 에러 메시지 출력
      console.error("고객문의 추가 중 오류 발생:", error);
      alert("고객문의 작성 중 오류가 발생했습니다. 다시 시도해 주세요."); // 오류 메시지
    }
  };

  return (
    <div className="bg-white my-5 w-full text-center px-10 py-10">
      <h2 className="text-xl font-bold mb-4">고객문의 작성</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 회원 아이디 입력 필드 */}
        <div>
          <input
            type="text"
            name="usId"
            placeholder="회원 아이디"
            value={newInquiry.usId} // 상태값을 매핑
            onChange={handleInputChange} // 값 변경 시 상태 업데이트
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
            value={newInquiry.cqTitle} // 상태값을 매핑
            onChange={handleInputChange} // 값 변경 시 상태 업데이트
            required
            className="border p-2 w-full"
          />
        </div>
        {/* 고객 문의 내용 입력 필드 */}
        <div>
          <textarea
            name="cqCtt"
            placeholder="내용"
            value={newInquiry.cqCtt} // 상태값을 매핑
            onChange={handleInputChange} // 값 변경 시 상태 업데이트
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
            value={newInquiry.cqRegdt} // 상태값을 매핑
            onChange={handleInputChange} // 값 변경 시 상태 업데이트
            required
            className="border p-2 w-full"
          />
        </div>
        {/* 제출 버튼 */}
        <button type="submit" className="bg-blue-500 text-white p-2">
          작성
        </button>
      </form>
    </div>
  );
};

export default AddInquiry;
