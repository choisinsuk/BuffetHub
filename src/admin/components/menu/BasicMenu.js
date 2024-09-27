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

          <li className="pr-6 text-2xl">
            <Link to={"/about"}>예약 관리</Link>
          </li>

          <li className="pr-6 text-2xl">
            <Link to={"/about"}>뷔페 예약 설정</Link>
          </li>

          <li className="pr-6 text-2xl">
            <Link to={"/Notice"}>뷔페 정보 설정</Link>         
          </li>

          <li className="pr-6 text-2xl">
            <Link to={"/CustomErinquiry"}>게시판 관리</Link>
          </li>

          <li className="pr-6 text-2xl">
            <Link to={"/ReviewBoard"}>회원 관리</Link>
          </li>  
        </ul>
      </div>
    </nav>
  );
}

export default BasicMenu;