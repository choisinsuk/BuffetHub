import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AsideContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickReserve = useCallback(() => {
    navigate({ pathname: "/reserve" });
  });

  const handleClickMakeReserve = useCallback(() => {
    navigate({ pathname: "/reserve/makereserve" });
  });

  const handleClickChangeReserve = useCallback(() => {
    navigate({ pathname: "/reserve/changereserve" });
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
            onClick={handleClickMakeReserve}
          >
            -예약하기
          </div>
        </li>
        <li>
          <div
            className={`cursor-pointer ${location.pathname === "/reserve/changereserve" ? "font-bold" : ""}`}
            onClick={handleClickChangeReserve}
          >
            -예약변경
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default AsideContent;
