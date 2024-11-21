import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReserveComponent = () => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.loginSlice);

  const handleClickRegist = useCallback(() => {
    // 로그인 상태 체크: urId가 비어있지 않은 경우 로그인됨
    if (loginState.urId) {
      navigate({ pathname: "/reserve/regist" }); // 로그인 되어 있으면 예약 페이지로 이동
    } else {
      alert("예약을 하기 위해서는 로그인이 필요합니다.");
      navigate({ pathname: "/user/login" }); // 로그인 되어 있지 않으면 로그인 페이지로 이동
    }
  }, [loginState.urId, navigate]); // 의존성에 loginState.urId 추가

  const handleGoInfoClick = () => {
    navigate("/buffetinfo"); // 이동할 경로
  };
  

  return (
    <>
      <table className="flex justify-center py-8">
        <tr>
          <td className="text-center">
            <p>
              <span className="text-2xl pb-2">
                {" "}
                 서울특별시 금천구 가산디지털2로 101 한라원앤원타워3층 {" "}
              </span>
            </p>
            <p>전화번호 : 0000-0000</p>
            <p className="pb-5">문의 : kosmo@ikosmo.co.kr</p>
            <button
              onClick={handleGoInfoClick}
              className="bg-orange-200 border rounded-lg py-5 px-10 text-fontColor 
             hover:bg-orange-400 hover:text-white hover:shadow-xl transition duration-200 ease-in-out"
            >
              <p className="text-2xl">뷔페 위치 및 상세 정보 보러가기</p>
              <p className="text-xs">
                위치 및 가격, 메뉴 정보를 확인할 수 있습니다.
              </p>
            </button>
          </td>
        </tr>
      </table>

      <div className="text-xl p-4 justify-start ">
      
      <p className="font-bold text-2xl">예약 안내사항</p>
        <p className="text-lg pb-5">
          인터넷 예약 가이드를 안내드리니 참조하여 주시기 바랍니다.
        </p>

        <hr className="py-1 w-full border-orange-200 border-t-2" />

        <ul className="p-4 mt-5 text-xl text-left pl-5 pb-5 pt-2">
          <li className="font-bold pb-2">매장 이용 안내</li>
          <ul className="list-disc pl-8 pb-10">
            <li>
              매장 이용시간은 총{" "}
              <span className="text-red-500 font-bold underline">2시간</span>
              입니다.
            </li>
            <li>미취학 아동은 만 4세(49개월) 미만입니다.</li>
            <li>아동은 만 4세(49개월) ~ 만 12세(초등학교 6학년)입니다.</li>
          </ul>

          <li className="font-bold pb-2">예약 및 결제 안내</li>
          <ul className="list-disc pl-8">
            <li>
              온라인 예약, 변경 및 취소는 이용 날짜 기준 하루 전까지 가능하며,
              이용 당일 예약 변경은 불가합니다.
            </li>
            <li>예약 시 홈페이지 결제 및 현장 결제가 가능합니다.</li>
            <li>예약 후 노쇼 누적 시, 온라인 예약이 불가할 수 있습니다.</li>
            <li>
              좌석은 지정 예약이 불가하며, 예약하신 순차적으로 배정됩니다.
            </li>
            <li>
              예약 접수 시작일은 '1개월 전 1일'입니다. 예) 3월 예약: 2월 1일
              오전 8시부터 가능
            </li>
            <li>진행 중인 이벤트는 이벤트 페이지에서 확인 부탁드립니다.</li>
          </ul>
          <li className="pt-10">
            <hr className="py-5 w-full border-orange-200 border-t-2" />
          </li>
          <li className="text-center pt-5 ">
            <table className="flex text-center justify-center">
              <tr>
                <td>
                <button type="button" className="bg-orange-200 border rounded-lg py-5 px-10 text-fontColor 
                hover:bg-orange-400 hover:text-white transition duration-200 ease-in-out hover:shadow-xl hover:font-bold"
                  onClick={handleClickRegist}>예약하기</button>
                </td>
              </tr>
            </table>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ReserveComponent;
