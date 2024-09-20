import logo from "../image/BuffetHubLogoVery.png";
import { Link } from "react-router-dom";

const BasicMenu = () => {
  return (
    <nav id="navbar" className=" flex bg-blue-300">
        <div className=" bg-orange-200 p-4 font-medium">
          <img src={logo} alt="Logo" />
        </div> 

      <div className="w-4/5 bg-orange-300">
        <ul className="flex p-4 text-white font-bold">

          <li className="pr-6 text-2xl"></li>

          <li className="pr-6 text-2xl">
            <Link to={"/"}>메인</Link>
          </li>

          <li className="pr-6 text-2xl"></li>

          <li className="pr-6 text-2xl">
            <Link to={"/about"}>예약 관리</Link>
          </li>

          <li className="pr-6 text-2xl"></li>

          <li className="pr-6 text-2xl">
            <Link to={"/about"}>뷔페 예약 설정</Link>
          </li>

          <li className="pr-6 text-2xl"></li>

          <li className="pr-6 text-2xl">
            <Link to={"/about"}>뷔페 정보 설정</Link>
          </li>

          <li className="pr-6 text-2xl"></li>

          <li className="pr-6 text-2xl">
            <Link to={"/about"}>게시판 관리</Link>
          </li>

          <li className="pr-6 text-2xl"></li>

          <li className="pr-6 text-2xl">
            <Link to={"/about"}>회원 관리</Link>
          </li>
          
        </ul>
      </div>
      <div className="w-1/5 flex justify-end bg-orange-200 p-4 font-medium">
        <div className="text-black font-bold text-3xl"><Link to={"/about"}>로그인</Link></div>
      </div>
    </nav>
  );
}

export default BasicMenu;