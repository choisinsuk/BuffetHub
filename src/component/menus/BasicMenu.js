import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../images/logoimage/Logo.png"; // 로고 이미지 경로
import { removeCookie } from "../../util/cookieUtil"; // 쿠키 제거 함수
import { logout } from "../../slice/loginSlice"; // 로그아웃 액션

const BasicMenu = () => {
  const [isOpen, setIsOpen] = useState(false); // 메뉴 열림/닫힘 상태
  const loginState = useSelector((state) => state.loginSlice); // 로그인 상태 가져오기
  const dispatch = useDispatch(); // Redux 디스패치 함수

  const toggleMenu = () => {
    setIsOpen(!isOpen); // 메뉴 상태 반전
  };

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm("로그아웃 하시겠습니까?")) {
      removeCookie("user"); // 쿠키 제거
      dispatch(logout()); // 로그아웃 처리
      window.location.href = "/"; // 메인 페이지로 이동
    }
  };

  return (
    <nav id="navbar" className="flex bg-blue-300">
      <div className="w-full bg-white flex justify-between items-center p-4">
        {/* 로고 영역 */}
        <div className="text-2xl text-yellow-500 font-bold">
          <Link to="/">
            <img src={logo} alt="BuffetHub Logo" className="h-14 w-auto" /> {/* 로고 이미지 */}
          </Link>
        </div>

        {/* 메뉴 영역 */}
        <div className="flex items-center md:space-x-4">
          <ul
            className={`flex flex-col md:flex-row md:space-x-6 text-black font-bold ${
              isOpen ? "block" : "hidden"
            } md:flex`}
          >
            {/* 네비게이션 링크 */}
            <li className="text-1xl p-2">
              <Link to="/">메인페이지</Link>
            </li>
            <li className="text-1xl p-2">
              <Link to="/buffetinfo">뷔페정보</Link>
            </li>
            <li className="text-1xl p-2">
              <Link to="/reserve">예약하기</Link>
            </li>
            <li className="text-1xl p-2">
              <Link to="/user/noticeBoard/list">공지사항</Link>
            </li>
            <li className="text-1xl p-2">
              <Link to="/inquiry/list">고객문의</Link>
            </li>

            {/* 로그인 상태에 따른 마이페이지/로그인/로그아웃 표시 */}
            {loginState.urId && (
              <li className="text-1xl p-2">
                <Link to="/mypage">마이페이지</Link>
              </li>
            )}
            {!loginState.urId && (
              <>
                <li className="text-1xl p-2">
                  <Link to="/user/register">회원가입</Link>
                </li>
                <li className="text-1xl p-2">
                  <Link to="/user/login">로그인</Link>
                </li>
              </>
            )}
            {loginState.urId && (
              <li className="text-1xl p-2">
                <a href="/" onClick={handleLogout}>로그아웃</a>
              </li>
            )}
          </ul>

          {/* 모바일 햄버거 메뉴 아이콘 */}
          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            <div className="bg-black w-6 h-0.5 mb-0.5"></div>
            <div className="bg-black w-6 h-0.5 mb-0.5"></div>
            <div className="bg-black w-6 h-0.5"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// BasicMenu 컴포넌트를 내보내서 다른 파일에서 사용할 수 있게 함
export default BasicMenu;
