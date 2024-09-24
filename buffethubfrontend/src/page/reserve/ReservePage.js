import { Link } from "react-router-dom";
import ReserveComponent from "../../component/reserve/ReserveComponent";
import ReserveLayout from "../../layouts/ReserveLayout";

const ReservePage = () => {
  const asideContent = (
    <nav id="rvaside" className="flex">
      <ul className="flex flex-col p-4">
        <li className="font-bold mb-2">
          <Link to={""}>예약</Link>
        </li>
        <li className="mb-2">
          <Link to={"makereserve"}>-예약하기</Link>
        </li>
        <li>
          <Link to={"changereserve"}>-예약변경</Link>
        </li>
      </ul>
    </nav>
  );

  const mainContent = (
    <div className="flex-col border border-black p-4">
      <div className="text-4xl font-bold border border-black text-center p-4">
        예약 안내사항
      </div>
      <ReserveComponent />
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
