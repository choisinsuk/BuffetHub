import { Link } from "react-router-dom";
import ReserveLayout from "../../layouts/ReserveLayout";
import ChangeReserveComponent from "../../component/reserve/ChangeReserveComponent";

const ReservePage = () => {
  const asideContent = (
    <nav id="rvaside" className="flex">
      <ul className="flex flex-col p-4">
        <li className="mb-2">
          <Link to={"/reserve"}>예약</Link>
        </li>
        <li className="mb-2">
          <Link to={"/reserve/makereserve"}>-예약하기</Link>
        </li>
        <li className="font-bold">
          <Link to={"/reserve/changereserve"}>-예약변경</Link>
        </li>
      </ul>
    </nav>
  );

  const mainContent = (
    <div><ChangeReserveComponent/>
    </div>
    
  );
  

  return (
    <ReserveLayout
      asideContent={asideContent}
      mainContent={mainContent}
    ></ReserveLayout>
  );
};

export default ReservePage;
