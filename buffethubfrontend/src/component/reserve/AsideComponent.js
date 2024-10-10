import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AsideContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickReserve = useCallback(() => {
    navigate({ pathname: "/reserve" });
  });

  const handleClickRegist = useCallback(() => {
    navigate({ pathname: "/reserve/regist" });
  });

  const handleClickList = useCallback(() => {
    navigate({ pathname: "/reserve/list" });
  });

  return (
    <nav id="rvaside" className="flex">
      <ul className="flex flex-col p-4">
        <li className="mb-2">
          <div
            className={`cursor-pointer ${location.pathname === "/reserve" ? "font-bold" : ""}`}
            onClick={handleClickReserve}
          >
            예약
          </div>
        </li>
        <li className="mb-2">
          <div
            className={`cursor-pointer ${location.pathname === "/reserve/makereserve" ? "font-bold" : ""}`}
            onClick={handleClickRegist}
          >
            -예약하기
          </div>
        </li>
        <li>
          <div
            className={`cursor-pointer ${location.pathname === "/reserve/changereserve" ? "font-bold" : ""}`}
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
