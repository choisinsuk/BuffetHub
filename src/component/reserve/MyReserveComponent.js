import { useCallback, useEffect, useState } from "react";
import ListComponent from "./ListComponent";
import { useNavigate } from "react-router-dom";
import { deleteOne } from "../../api/reserveApi";
import PaidListComponent from "./PaidListComponent";
import { PaymentCheckoutPage } from "./PaymentComponent";

const MyReserveComponent = () => {
  const navigate = useNavigate();
  const [selectedReserve, setSelectedReserve] = useState(null); // 선택된 예약 상태

  const handleClickModify = useCallback(() => {
    if (selectedReserve) {
      navigate({ pathname: `/reserve/modify/${selectedReserve}` }); // 선택된 예약으로 수정 페이지 이동
    } else {
      alert("수정할 예약을 선택해 주세요."); // 선택되지 않았을 경우 경고
    }
  }, [selectedReserve, navigate]);

  // 예약 삭제 처리
  const handleClickDelete = useCallback(() => {
    if (selectedReserve) {
      deleteOne(selectedReserve)
        .then(() => {
          alert("예약이 삭제되었습니다.");
          // 삭제 후 상태 초기화
          window.location.reload(); // 페이지 새로고침
        })
        .catch((e) => {
          console.error(e);
          alert("삭제 중 오류가 발생했습니다.");
        });
    } else {
      alert("삭제할 예약을 선택해 주세요."); // 선택되지 않았을 경우 경고
    }
  }, [selectedReserve]);
  

  return (
    <div className="text-sm flex flex-col justify-center w-5/6">
      <div className="m-7">
        <div className="font-bold text-lg">진행중 예약</div>
        <div className="border border-black m-5 flex flex-col">
          <ListComponent
            setSelectedReserve={setSelectedReserve}
          ></ListComponent>
          <div className="p-5">
            <div className="flex flex-row justify-center">
              <PaymentCheckoutPage selectedReserve={selectedReserve}/>
              <button
                type="button"
                className="bg-orange-300 w-32 h-10 border border-black rounded m-5"
                onClick={handleClickModify}
              >
                예약수정
              </button>
              <button
                type="button"
                className="bg-red-600 w-32 h-10 border border-black rounded m-5"
                onClick={handleClickDelete}
              >
                예약삭제
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="m-7">
        <div className="font-bold text-lg">결제된 예약</div>
        <div className="border border-black m-5 flex flex-col">
          <PaidListComponent
            setSelectedReserve={setSelectedReserve}
          ></PaidListComponent>
          <div className="p-5">
            <div className="flex flex-row justify-center">
              {/* <button
                type="button"
                className="bg-orange-300 w-32 h-10 border border-black rounded m-5"
              >
                후기 작성
              </button> */}
              <button
                type="button"
                className="bg-red-600 w-32 h-10 border border-black rounded m-5"
                onClick={handleClickDelete}
              >
                예약삭제
              </button>
            </div>
            <div>-예약 삭제 시, 영업일로부터 2-3일 후 환불됩니다.</div>
            <div>-예약일 이후 예약 삭제 시, 본인 부담금 20%가 부과됩니다.
              <br/>
              -결제된 예약 수정은 불가하므로 삭제 후 재예약 또는 당일 예약 변경 시, 대표번호 0000-0000으로 연락 바랍니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReserveComponent;
