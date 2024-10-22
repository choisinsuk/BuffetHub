import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReserveComponent = () => {

  const navigate = useNavigate()
  const loginState = useSelector(state => state.loginSlice)
  
  const handleClickRegist = useCallback(() => {
    // 로그인 상태 체크: urId가 비어있지 않은 경우 로그인됨
    if (loginState.urId) { 
      navigate({ pathname: "/reserve/regist" }); // 로그인 되어 있으면 예약 페이지로 이동
    } else {
      alert("예약을 하기 위해서는 로그인이 필요합니다.")
      navigate({ pathname: "/user/login" }); // 로그인 되어 있지 않으면 로그인 페이지로 이동
    }
  }, [loginState.urId, navigate]); // 의존성에 loginState.urId 추가

  return (
    <>
      <div className="text-xl font-normal text-center p-4">
        이용시간: 예약시간으로부터 2시간
        <div>위치: 서울특별시 금천구 가산디지털2로 101 한라원앤원타워3층</div>
         <div>전화번호: 0000-0000</div>
      </div>
      <div className="text-xl font-normal border border-black p-4 ">
        예약 안내사항(세부)
        <div className="font-normal border border-black p-4 m-5 mt-10 text-sm">
        ▷ 예약 안내사항
        <br/> -온라인 예약, 변경 및 취소는 이용 날짜 기준 하루 전까지 가능하며 이용 당일 예약 변경은 불가합니다.
        <br/> -예약 시 홈페이지 결제, 현장 결제가 가능합니다.
        <br/> -예약 후 노쇼 누적 시, 온라인 예약이 불가할 수 있습니다.
        <br/>
        <br/>▷ 미취학 아동은 만 4세(49개월) 미만입니다.
        <br/>▷ 아동은만 만 4세(49개월)~ 만 12세(초등학교 6학년)입니다.
        <br/>▷ 좌석은 지정 예약이 불가하며 예약하신 순차적으로 배정됩니다.
        <br/>▷ 예약 접수 시작일은 '1개월 전 1일' 입니다. 예) 3월 예약 : 2월 1일 오전 8시 부터 가능
        <br/>
        <br/>▷ 진행중 이벤트는 이벤트 페이지에서 확인 부탁드립니다.
        </div>
        <button type="button" className="bg-orange-300 w-32 h-10 border border-black rounded" onClick={handleClickRegist}>예약하기</button>
      </div>
      
    </>
  );
};

export default ReserveComponent;
