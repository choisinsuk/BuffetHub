import { Link } from "react-router-dom";

import ReserveLayout from "../../layouts/ReserveLayout";
import ModifyReserveComponent from "../../component/reserve/ModifyReserveComponent";

const ModifyReservePage = () => {
  const asideContent = (
    <nav id="rvaside" className="flex">
      <ul className="flex flex-col p-4">
        <li className="mb-2">
          <Link to={"/reserve"}>예약</Link>
        </li>
        <li className="mb-2">
          <Link to={"/reserve/makereserve"}>-예약하기</Link>
        </li>
        <li>
          <Link to={"/reserve/changereserve"}>-예약변경</Link>
        </li>
        <li className="text-sm pl-5 font-bold">
          <Link to={"/reserve/changereserve"}>-예약수정</Link>
        </li>
      </ul>
    </nav>
  );

  const mainContent = (
    <div className="flex justify-center items-center"><ModifyReserveComponent/>
    </div>
    
  );
  

  return (
    <ReserveLayout
      asideContent={asideContent}
      mainContent={mainContent}
    ></ReserveLayout>
  );
};

export default ModifyReservePage;
