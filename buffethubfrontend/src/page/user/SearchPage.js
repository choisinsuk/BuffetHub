import { Routes, Route, Link } from "react-router-dom"; // Routes와 Route 임포트
import BasicMenu from "../../component/menus/BasicMenu.js";
import SearchIdComponent from "../../component/user/SearchIdComponent.js"; // 아이디 찾기 컴포넌트
import SearchPwComponent from "../../component/user/SearchPwComponent.js"; // 비밀번호 찾기 컴포넌트

const SearchPage = () => {
  return (
    <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
      <BasicMenu />
      <div className="w-full flex flex-wrap h-full justify-center items-center border-2">
        <div className="text-2xl">
          <ul className="flex p-4 text-white font-bold">
            <li className="pr-6 text-2xl text-gray-500">
              <Link to="id">아이디 찾기</Link>
            </li>
            <li className="pr-6 text-2xl text-gray-500">
              <Link to="password">비밀번호 찾기</Link>
            </li>
          </ul>
        </div>
        <div className="text-2xl w-full">
          <Routes>
            <Route path="id" element={<SearchIdComponent />} />
            <Route path="password" element={<SearchPwComponent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;