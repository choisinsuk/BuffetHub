import logo from "../image/BuffetHubLogoVery.png";
import { Link } from "react-router-dom";

const BasicMenu = () => {
  return (
    <nav id="navbar" className="flex shadow-lg">
      <div className="bg-orange-200 p-1 font-medium">
        <img src={logo} alt="Logo" />
      </div>

      <div className="w-full bg-customColor2">
        <ul className="flex justify-center p-5 text-fontColor font-bold text-center">
          <li className="pr-10 text-4xl">
            <Link to={"/admin"}>메인 페이지</Link>
          </li>
          <li className="pr-10 text-4xl">
            <Link to={"/admin/reserve"}>예약 관리</Link>
          </li>
          <li className="pr-10 text-4xl">
            <Link to={"/admin/infoManager"}>뷔페 정보 관리</Link>
          </li>
          <li className="pr-10 text-4xl">
            <Link to={"/admin/userManager"}>회원관리</Link>
          </li>
          <li className="text-4xl">
            <Link to={"/admin/noticeBoard"}>게시판 관리</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default BasicMenu;
