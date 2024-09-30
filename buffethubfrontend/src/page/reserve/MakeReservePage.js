import { Link } from "react-router-dom";
import MakeReserveComponent from "../../component/reserve/MakeReserveComponent";
import ReserveLayout from "../../layouts/ReserveLayout";

const MakeReservePage = () => {
  const asideContent = (
    <nav id="rvaside" className="flex">
      <ul className="flex flex-col p-4">
        <li className="mb-2">
          <Link to={"/reserve"}>예약</Link>
        </li>
        <li className="mb-2 font-bold">
          <Link to={"/reserve/makereserve"}>-예약하기</Link>
        </li>
        <li>
          <Link to={"/reserve/changereserve"}>-예약변경</Link>
        </li>
      </ul>
    </nav>
  );

  const mainContent = (
    <div className="flex justify-center items-center"><MakeReserveComponent/>
    </div>
    
  );
  

  return (
    <ReserveLayout
      asideContent={asideContent}
      mainContent={mainContent}
    ></ReserveLayout>
  );
};

export default MakeReservePage;
