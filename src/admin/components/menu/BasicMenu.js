import { useDispatch, useSelector } from "react-redux";
import { removeCookie } from "../../../util/cookieUtil";
import logo from "../image/BuffetHubLogoVery.png";
import { Link } from "react-router-dom";
import { logout } from "../../../slice/loginSlice";

const BasicMenu = () => {
  const loginState = useSelector((state) => state.loginSlice);
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
    <nav id="navbar" className="flex shadow-lg border border-orange-200">
      <div>
        <Link to={"/admin"}> <img src={logo} alt="Logo" /> </Link>
      </div>
      <div className="w-full bg-customColor3 text-border ">
        <ul className="flex p-5 text-fontColor font-bold justify-end text-centerr">
          <li className="pr-10 text-2xl">
            <Link to={"/"}>사용자 페이지</Link>
          </li>
          <li className="pr-10 text-2xl">
            <Link to={"/admin"}>메인 페이지</Link>
          </li>
          <li className="pr-10 text-2xl">
            <Link to={"/admin/reserve"}>예약 관리</Link>
          </li>
          <li className="pr-10 text-2xl">
            <Link to={"/admin/infoManager"}>뷔페 정보 관리</Link>
          </li>
          <li className="pr-10 text-2xl">
            <Link to={"/admin/userManager"}>회원관리</Link>
          </li>
          <li className="pr-10 text-2xl">
            <Link to={"/admin/noticeBoard"}>게시판 관리</Link>
          </li>
          <li className="text-2xl p-2">
            {!loginState.urId ? (
              <Link to={"/user/login"}>로그인</Link>
            ) : (
              <a href="/" onClick={handleLogout}>로그아웃</a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default BasicMenu;
