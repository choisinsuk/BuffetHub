import {
  createSearchParams,
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import ReserveLayout from "../../layouts/ReserveLayout";
import MyReserveComponent from "../../component/reserve/MyReserveComponent";
import { useCallback } from "react";

const MyReservePage = () => {
  
  const { rsNb } = useParams();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  const queryStr = createSearchParams({ page, size }).toString();

  const moveToModify = useCallback(
    (rsNb) => {
      navigate({
        pathname: `/reserve/modify/${rsNb}`,
        search: queryStr,
      });
    },
    [rsNb, page, size]
  );

  const asideContent = (
    <nav id="rvaside" className="flex">
      <ul className="flex flex-col p-4">
        <li className="mb-2">
          <Link to={"/mypage"}>마이페이지</Link>
        </li>
        <li className="mb-2 font-bold">
          <Link to={"/mypage/myreservations"}>-내 예약</Link>
        </li>
        <li>
          <Link to={"/user/myinfo"}>-내 정보 관리</Link>
        </li>
      </ul>
    </nav>
  );

  const mainContent = (
    <div className="flex justify-center items-center">
      <MyReserveComponent />
    </div>
  );

  return (
    <ReserveLayout
      asideContent={asideContent}
      mainContent={mainContent}
    ></ReserveLayout>
  );
};

export default MyReservePage;
