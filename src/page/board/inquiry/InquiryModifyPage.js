import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne, putOne, deleteOne, setAuthToken } from "../../../api/inquiryApi"; // Inquiry API에서 필요한 함수 임포트

// 초기 상태 정의
const initState = {
  cqNb: 0,
  cqTitle: '',
  cqCtt: '',
  cqRegdt: '',
};

const InquiryModifyPage = () => {
  const { cqNb } = useParams(); // URL 파라미터에서 고객 문의 번호 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
  const [inquiry, setInquiry] = useState({ ...initState }); // 고객 문의 상태 초기화

  // 컴포넌트 마운트 시 인증 토큰 설정
  useEffect(() => {
    setAuthToken(); // JWT 토큰 설정
  }, []);

  // 고객 문의 데이터를 서버에서 불러오는 useEffect
  useEffect(() => {
    if (cqNb) {
      getOne(cqNb) // Inquiry API의 getOne 함수 사용
        .then((data) => {
          if (data) {
            setInquiry(data); // 가져온 데이터를 상태에 설정
          } else {
            console.error("고객 문의 정보를 찾을 수 없습니다.");
          }
        })
        .catch((e) => {
          console.error("고객 문의를 가져오는 중 오류 발생:", e);
        });
    }
  }, [cqNb]);

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInquiry({ ...inquiry, [name]: value }); // 상태 업데이트
  };

  // 폼 제출 핸들러 (수정 작업 수행)
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    if (!inquiry.cqTitle || !inquiry.cqCtt) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    try {
      await putOne(inquiry); // Inquiry API의 putOne 함수 사용
      alert("고객 문의가 성공적으로 수정되었습니다.");
      navigate(-1); // 수정 후 이전 페이지로 이동
    } catch (error) {
      console.error("고객 문의 수정 중 오류 발생:", error);
      alert("고객 문의 수정 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  // 고객 문의 삭제 핸들러
  const handleDelete = async () => {
    if (cqNb) {
      try {
        await deleteOne(cqNb); // Inquiry API의 deleteOne 함수 사용
        alert("고객 문의가 성공적으로 삭제되었습니다.");
        navigate(-1); // 삭제 후 이전 페이지로 이동
      } catch (error) {
        console.error("고객 문의 삭제 중 오류 발생:", error);
        alert("고객 문의 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } else {
      alert("문의 ID가 없습니다.");
    }
  };

  // 취소 버튼 핸들러
  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="bg-white my-5 w-full text-center px-10 py-10">
      <h2 className="text-xl font-bold mb-4">고객 문의 수정</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="cqTitle" // 제목 필드
            placeholder="제목"
            value={inquiry.cqTitle}
            onChange={handleInputChange} // 값 변경 시 상태 업데이트
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <textarea
            name="cqCtt" // 내용 필드
            placeholder="내용"
            value={inquiry.cqCtt}
            onChange={handleInputChange} // 값 변경 시 상태 업데이트
            required
            className="border p-2 w-full"
            rows="4"
          />
        </div>
        <button type="submit" className="bg-orange-200 text-black p-2 font-semibold">
          수정
        </button>
        <button
          type="button"
          onClick={handleDelete} // 삭제 버튼 클릭 시 호출
          className="bg-orange-200 text-black p-2 ml-2 font-semibold"
        >
          삭제
        </button>
        <button
          type="button"
          onClick={handleCancel} // 취소 버튼 클릭 시 호출
          className="bg-orange-200 text-black p-2 ml-2 font-semibold"
        >
          취소
        </button>
      </form>
    </div>
  );
};

export default InquiryModifyPage;
