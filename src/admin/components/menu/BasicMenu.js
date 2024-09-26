import logo from "../image/BuffetHubLogoVery.png";
import { Link } from "react-router-dom";

const BasicMenu = () => {
  return (
    <nav id="navbar" className=" flex bg-blue-300">
        <div className=" bg-orange-200 p-4 font-medium">
          <img src={logo} alt="Logo" />
        </div> 

      <div className="w-4/5 bg-orange-300 flex justify-center">
        <ul className="flex p-4 text-white font-bold justify-center ">

          <li className="pr-6 text-2xl text-center">
            <Link to={"/"}>메인</Link>
          </li>

          <li className="pr-6 text-2xl text-center">
            <Link to={"/reserve"}>예약 관리</Link>
          </li>

          <li className="pr-6 text-2xl text-center">
            <Link to={"/infoManager"}>뷔페 정보 관리</Link>
          </li>

          <li className="pr-6 text-2xl text-center">
            <Link to={"/userManager"}>회원관리</Link>
          </li>
        </ul>

      </div>
      <div className="w-1/5 flex justify-end bg-orange-200 p-4 font-medium">
        <div className="text-black font-bold text-3xl"><Link to={"/reserve"}>로그인</Link></div>
      </div>
    </nav>
  );
}

export default BasicMenu;