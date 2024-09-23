import { Link } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import ReserveComponent from "../../components/reserve/ReserveComponent";

const ReservePage = () => {
  return (
    <BasicLayout>
      <div className="flex-col border border-black p-4">
        <div className="text-4xl font-bold border border-black text-center p-4">예약 안내사항
        <div><ReserveComponent/></div>
        </div>
      </div>

      <div className="bg-orange-200">
        <nav id="rvaside" className="flex">
          <ul className="flex flex-col p-4">
            <li className="font-bold mb-2"><Link to={"/"}>예약</Link> </li>
            <li className="mb-2"><Link to={"/makereserve"}>-예약하기</Link> </li>
            <li><Link to={"/changereserve"}>-예약변경</Link> </li>
          </ul>
        </nav>
      </div>
    </BasicLayout>
  )
};

export default ReservePage;
