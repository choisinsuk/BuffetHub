import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { putPaymentStatus } from "../api/reserveApi";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const rsNb = urlParams.get("rsNb"); // 쿼리 파라미터에서 예약 번호 가져오기

    if (rsNb) {
      // 결제 완료 시 예약 상태 업데이트
      putPaymentStatus(rsNb)
        .then(() => {
          console.log("예약 상태가 업데이트되었습니다."); // 상태 업데이트 성공 시 메시지
        })
        .catch((error) => {
          console.error("예약 상태 업데이트 중 오류 발생:", error);
        });
    }
  }, []);

  const handleClickMyReserve = useCallback(() => {
    navigate({ pathname: "/mypage/myreservations" });
  });

  const handleClickHome = useCallback(() => {
    navigate({ pathname: "/" });
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-3xl font-bold">결제가 성공했습니다.</div>
      
      <button className="bg-orange-300 w-32 h-10 border border-black rounded m-5" onClick={handleClickHome}>
        홈으로
      </button>
      <button
        type="button"
        className="bg-green-400 w-32 h-10 border border-black rounded m-5"
        onClick={handleClickMyReserve}
      >
        내 예약
      </button>
    </div>
  );
};

export default SuccessPage;
