import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const AsideContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginState = useSelector(state => state.loginSlice)

  const handleClickReserve = useCallback(() => {
    navigate({ pathname: "/reserve" });
  });

  const handleClickRegist = useCallback(() => {
    // 로그인 상태 체크: urId가 비어있지 않은 경우 로그인됨
    if (loginState.urId) { 
      navigate({ pathname: "/reserve/regist" }); // 로그인 되어 있으면 예약 페이지로 이동
    } else {
      alert("예약을 하기 위해서는 로그인이 필요합니다.")
      navigate({ pathname: "/user/login" }); // 로그인 되어 있지 않으면 로그인 페이지로 이동
    }
  }, [loginState.urId, navigate]); // 의존성에 loginState.urId 추가

  const handleClickList = useCallback(() => {
    // 로그인 상태 체크: urId가 비어있지 않은 경우 로그인됨
    if (loginState.urId) { 
      navigate({ pathname: "/reserve/list" }); // 로그인 되어 있으면 리스트 페이지로 이동
    } else {
      alert("예약리스트를 열람하기 위해서는 로그인이 필요합니다.")
      navigate({ pathname: "/user/login" }); // 로그인 되어 있지 않으면 로그인 페이지로 이동
    }
  }, [loginState.urId, navigate]); // 의존성에 loginState.urId 추가

  return (
    <nav id="rvaside" className="flex">
      <ul className="flex flex-col p-4">
        <li className="mb-2">
          <div
            className={`font-bold`}
            onClick={handleClickReserve}
          >
            예약
          </div>
        </li>
        <li className="mb-2">
          <div
            className={`cursor-pointer ${location.pathname === "/reserve/regist" ? "font-bold" : ""}`}
            onClick={handleClickRegist}
          >
            -예약하기
          </div>
        </li>
        <li>
          <div
            className={`cursor-pointer ${location.pathname === "/reserve/list" ? "font-bold" : ""}`}
            onClick={handleClickList}
          >
            -예약변경
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default AsideContent;
