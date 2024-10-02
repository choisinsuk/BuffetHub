import logo from "../image/BuffetHubLogoVery.png";
import { Link } from "react-router-dom";

const BasicMenu = () => {
  return (
    <nav id="navbar" className=" flex">
        <div className=" bg-orange-200 p-1 font-medium">
          <img src={logo} alt="Logo" />
        </div> 

      <div className="w-full bg-orange-400">
        <ul className="flex p-4 text-white font-bold">

          <li className="pr-6 text-2xl">
            <Link to={"/"}>메인 페이지</Link>
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
        

          <li className="pr-6 text-2xl">
            <Link to={"/Notice"}>게시판 관리</Link>
          </li>

          </ul>
      </div>
    </nav>
  );
}

export default BasicMenu;