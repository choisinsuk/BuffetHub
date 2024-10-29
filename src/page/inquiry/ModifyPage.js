import { useEffect, useState } from "react";
import { getOne, putOne, deleteOne } from "../../../api/InquiryApi";
import useCustomMove from "../../components/hooks/useCustomMove";
import ResultModal from "../../components/common/ResultModal";

const InquiryModify = ({ cqNb }) => { // 고객문의 번호를 파라미터로 받음
  const [inquiry, setInquiry] = useState({}); // 고객 문의 상태 관리
  const [result, setResult] = useState(null); // 처리 결과 상태 관리
  const { moveToList, moveToRead } = useCustomMove(); // 페이지 이동 함수

  // 고객 문의 데이터를 불러옴
  useEffect(() => {
    getOne(cqNb).then((data) => setInquiry(data)); // 고객 문의 정보를 서버에서 받아옴
  }, [cqNb]);

  // 수정 버튼 클릭 시 수정된 데이터를 서버에 전송
  const handleClickModify = () => {
    putOne(inquiry).then(() => {
      setResult("Modified"); // 수정 성공 시 결과 저장
    });
  };

  // 삭제 버튼 클릭 시 데이터를 삭제
  const handleClickDelete = () => {
    deleteOne(cqNb).then(() => {
      setResult("Deleted"); // 삭제 성공 시 결과 저장
    });
  };

  // 모달 창을 닫는 함수
  const closeModal = () => {
    if (result === "Deleted") {
      moveToList(); // 삭제 후 리스트 페이지로 이동
    } else {
      moveToRead(cqNb); // 수정 후 상세 조회 페이지로 이동
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {result && (
        <ResultModal
          title="Result"
          content={result}
          callbackFn={closeModal} // 모달 닫기 함수
        />
      )}

      {/* 고객 문의 제목 수정 */}
      <div className="flex justify-center">
        <input
          className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
          name="cqTitle"
          value={inquiry.cqTitle || ''} // 고객 문의 제목이 없을 경우 빈 값 처리
          onChange={(e) => setInquiry({ ...inquiry, cqTitle: e.target.value })} // 제목 수정 시 상태 업데이트
        />
      </div>

      {/* 고객 문의 내용 수정 */}
      <div className="flex justify-center">
        <textarea
          className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
          name="cqCtt"
          value={inquiry.cqCtt || ''} // 고객 문의 내용이 없을 경우 빈 값 처리
          onChange={(e) => setInquiry({ ...inquiry, cqCtt: e.target.value })} // 내용 수정 시 상태 업데이트
        />
      </div>

      {/* 수정 및 삭제 버튼 */}
      <div className="flex justify-end p-4">
        <button
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickDelete} // 삭제 버튼 클릭 시
        >
          Delete
        </button>
        <button
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleClickModify} // 수정 버튼 클릭 시
        >
          Modify
        </button>
      </div>
    </div>
  );
};

export default InquiryModify; // 컴포넌트를 내보냄
