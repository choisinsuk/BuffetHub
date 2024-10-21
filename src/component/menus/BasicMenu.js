import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../images/logoimage/Logo.png";
import { removeCookie } from "../../util/cookieUtil";
import { logout } from "../../slice/loginSlice";

const BasicMenu = () => {
  /* 메뉴의 열림 상태를 관리하기 위한 상태 변수 */
  const [isOpen, setIsOpen] = useState(false);

  /* 메뉴의 열림/닫힘 상태를 토글하는 함수 */
  const toggleMenu = () => {
    setIsOpen(!isOpen); /* 현재 상태를 반전 */
  };

  /* Redux에서 로그인 상태를 가져오기 */
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
    <nav id="navbar" className="flex bg-blue-300">
      <div className="w-full bg-white flex justify-between items-center p-4">
        {/* 왼쪽에 로고 배치 */}
        <div className="text-2xl text-yellow-500 font-bold">
          <Link to={"/"}>
            <img src={logo} alt="BuffetHub Logo" className="h-14 w-auto" />
          </Link>
        </div>

        {/* 오른쪽 메뉴 배치 및 햄버거 아이콘 */}
        <div className="flex items-center md:space-x-4">
          {/* 오른쪽 메뉴 배치 - 햄버거 아이콘 옆으로 정렬 */}
          <ul
            className={`flex flex-col md:flex-row md:space-x-6 text-black font-bold ${
              isOpen ? "block" : "hidden"
            } md:flex`}
          >
            {/* 각 메뉴 항목 */}
            <li className="text-1xl p-2">
              <Link to={"/"}>메인페이지</Link>
            </li>
            <li className="text-1xl p-2">
              <Link to={"/buffetinfo"}>뷔페정보</Link>
            </li>
            <li className="text-1xl p-2">
              <Link to={"/reserve"}>예약하기</Link>
            </li>
            <li className="text-1xl p-2">
              <Link to={"/board"}>게시판</Link>
            </li>
            <li className="text-1xl p-2">
              {loginState.urId ? ( // 로그인 상태일 때만 마이페이지 링크 보이기
                <Link to={"/mypage"}>마이페이지</Link>
              ) : null}
            </li>
            <li className="text-1xl p-2">
              {!loginState.urId ? (
                <Link to={"/user/register"}>회원가입</Link>
              ) : (
                <></>
              )}
            </li>
            <li className="text-1xl p-2">
              {!loginState.urId ? (
                <Link to={"/user/login"}>로그인</Link>
              ) : (
                <a href="/" onClick={handleLogout}>로그아웃</a>
              )}
            </li>
          </ul>

          {/* 반응형 햄버거 아이콘 */}
          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            {/* 햄버거 아이콘을 구성하는 3개의 선 */}
            <div className="bg-black w-6 h-0.5 mb-0.5"></div>
            <div className="bg-black w-6 h-0.5 mb-0.5"></div>
            <div className="bg-black w-6 h-0.5"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BasicMenu;
