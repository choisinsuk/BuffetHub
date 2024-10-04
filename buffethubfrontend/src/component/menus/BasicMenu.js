import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";

const BasicMenu = () => {
  /* 메뉴의 열림 상태를 관리하기 위한 상태 변수 */
  const [isOpen, setIsOpen] = useState(false);

  /* 메뉴의 열림/닫힘 상태를 토글하는 함수 */
  const toggleMenu = () => {
    setIsOpen(!isOpen); /* 현재 상태를 반전 */
  };

  /* Redux에서 로그인 상태를 가져오기 */
  const loginState = useSelector(state => state.loginSlice);

  return (
    <nav id='navbar' className="flex bg-blue-300">
      <div className="w-full bg-white flex justify-between items-center p-4">
        
        {/* 왼쪽에 로고 배치 */}
        <div className="text-2xl text-yellow-500 font-bold">
          <Link to={'/'}>
            <img src={logo} alt="BuffetHub Logo" className="h-14 w-auto"/>
          </Link>
        </div>

        {/* 오른쪽 메뉴 배치 및 햄버거 아이콘 */}
        <div className="flex items-center md:space-x-4">
          
          {/* 오른쪽 메뉴 배치 - 햄버거 아이콘 옆으로 정렬 */}
          <ul className={`flex flex-col md:flex-row md:space-x-6 text-black font-bold ${isOpen ? "block" : "hidden"} md:flex`}>
            
            {/* 각 메뉴 항목 */}
            <li className="text-1xl p-2">
              <Link to={'/'}>메인페이지</Link>
            </li>
            <li className="text-1xl p-2">
              <Link to={'/buffetinfo'}>뷔페정보</Link>
            </li>
            <li className="text-1xl p-2">
              <Link to={'/reserve'}>예약하기</Link> 
            </li>
            <li className="text-1xl p-2">
              <Link to={'/board'}>게시판</Link> 
            </li>
            <li className="text-1xl p-2">
              <Link to={'/mypage'}>마이페이지</Link>
            </li>
            <li className="text-1xl p-2">
              {/* 로그인 상태에 따라 회원가입 링크를 조건부로 표시 */}
              {!loginState.ur_id ? 
                <Link to={'/signup'}>회원가입</Link> : <></>}
            </li>
            <li className="text-1xl p-2">
              {/* 로그인 상태에 따라 로그인 또는 로그아웃 링크를 조건부로 표시 */}
              {!loginState.ur_id ? 
                <Link to={'/user/login'}>로그인</Link> : <Link to={'/user/logout'}>로그아웃</Link>}
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
}

export default BasicMenu;
