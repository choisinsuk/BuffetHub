import { useDispatch } from "react-redux";
import { removeCookie } from "../../../util/cookieUtil";
import logo from "../image/BuffetHubLogoVery.png";
import { Link } from "react-router-dom";
import { logout } from "../../../slice/loginSlice";

const BasicMenu = () => {
  const dispatch = useDispatch();


  const handleLogout = (e) => {
    e.preventDefault(); // 기본 링크 동작 방지
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      removeCookie("user"); // 쿠키 제거
      dispatch(logout()); // Redux 스토어에서 로그아웃 처리
      window.location.href = "/"; // 메인 페이지로 이동
    }
  };

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
          <li className="text-1xl p-2">
                <a href="/" onClick={handleLogout}>로그아웃</a>
            </li>
        </ul>
      </div>
    </nav>
  );
}

export default BasicMenu;
