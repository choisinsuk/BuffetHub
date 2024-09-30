import { Link } from "react-router-dom";

import ReserveLayout from "../../layouts/ReserveLayout";
import MyReserveComponent from "../../component/reserve/MyReserveComponent";


const MyReservePage = () => {
  const asideContent = (
    <nav id="rvaside" className="flex">
      <ul className="flex flex-col p-4">
        <li className="mb-2">
          <Link to={"/user/myreserve"}>마이페이지</Link>
        </li>
        <li className="mb-2 font-bold">
          <Link to={"/user/myreserve"}>-내 예약</Link>
        </li>
        <li>
          <Link to={"/user/myinfo"}>-내 정보 관리</Link>
        </li>
        
      </ul>
    </nav>
  );

  const mainContent = (
    <div className="flex justify-center items-center"><MyReserveComponent/>
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
