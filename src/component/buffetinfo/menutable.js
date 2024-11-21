import React, { useEffect, useState } from "react";
import axios from "axios";

// Menu 컴포넌트에 검색 기능 통합
const Menu = () => {
  const [loading, setLoading] = useState(true);
  // 모든 메뉴 데이터 저장
  const [menu, setMenu] = useState([]);
  // 필터링된 메뉴 데이터 (카테고리 또는 검색 결과)
  const [filteredMenu, setFilteredMenu] = useState([]);
  // 카테고리 목록
  const [categories, setCategories] = useState([]);
  // 현재 선택된 카테고리
  const [selectedCategory, setSelectedCategory] = useState("전체");
  // 검색어
  const [searchTerm, setSearchTerm] = useState('');
  // 검색 결과 유무 확인
  const [isSearchActive, setIsSearchActive] = useState(false);
  // 에러 메시지 상태
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken"); // JWT 토큰 가져오기

  console.log("토큰:", token)
  // API 기본 설정
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/admin/",
    headers: {
      "Authorization": `Bearer ${token}`, // JWT 토큰 추가
      "Content-Type": "application/json"
    },
  });

  useEffect(() => {
    axiosInstance
      // API에서 메뉴 데이터를 가져옴
      .get("http://localhost:8080/api/admin/menus")
      .then((response) => {
        setMenu(response.data);
        setFilteredMenu(response.data);
        // 메뉴에서 카테고리만 추출하여 중복 제거 후 저장
        const uniqueCategories = [
          "전체",
          ...new Set(response.data.map((item) => item.menuCategory)),
        ];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("메뉴 정보를 불러오는 중 오류가 발생했습니다:", error);
        setError("메뉴 정보를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      });
  }, []);

  // 카테고리에 따라 메뉴를 필터링 하는 함수
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setSearchTerm(''); // 카테고리 선택 시 검색어 초기화
    setIsSearchActive(false); // 검색 모드 비활성화
    if (category === "전체") {
      setFilteredMenu(menu);
    } else {
      setFilteredMenu(menu.filter((item) => item.menuCategory === category));
    }
  };

  // 검색어 변경 시 상태 업데이트
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() === "") {
      // 검색어가 비어있으면 검색 모드 비활성화 및 카테고리 필터링 적용
      setIsSearchActive(false);
      if (selectedCategory === "전체") {
        setFilteredMenu(menu);
      } else {
        setFilteredMenu(menu.filter((item) => item.menuCategory === selectedCategory));
      }
    }
  };

  // 검색 버튼 클릭 시 검색 수행
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }

    axiosInstance.get(`http://localhost:8080/api/admin/menus/search`, {
      params: { name: searchTerm }
    })
    .then(response => {
      setFilteredMenu(response.data);
      setIsSearchActive(true);
      setSelectedCategory("검색 결과");
    })
    .catch(error => {
      console.error("검색 중 오류가 발생하였습니다:", error);
      setError("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
    });
  };

  // 엔터 키로 검색 수행
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* 카테고리 버튼들 */}
      <div className="flex justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className={`px-3 py-1 m-2 border rounded-lg text-center shadow-md
              transition transform hover:scale-110 duration-200 ease-in-out hover:bg-customColor3
              ${selectedCategory === category ? "bg-customColor2 text-black font-bold" : "bg-customColor3 text-white font-bold"}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 검색창 */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          className="flex-grow border border-black p-2 rounded"
          placeholder="메뉴 이름을 검색하세요"
          value={searchTerm}
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="ml-2 bg-customColor2 text-white px-4 py-2 rounded hover:bg-customColor3 transition transform hover:scale-110 duration-200 ease-in-out"
          onClick={handleSearch}>
          검색
        </button>
      </div>

      {/* 에러 메시지 표시 */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* 메뉴 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
        {filteredMenu.length > 0 ? ( filteredMenu.map((item) => (
            <div key={item.menuId} className="bg-orange-100 border border-gray-300 rounded-lg p-6 text-center shadow-md transition transform hover:scale-105 duration-200 ease-in-out">
              <h3 className="text-lg font-semibold mb-2">{item.menuName}</h3>
              <p className="text-xs font-bold">{item.menuCategory}</p>
            </div>
          ))
        ) : (<p className="text-gray-500 text-center col-span-2">검색 결과가 없습니다.</p>)}
      </div>
    </div>
  );
};

export default Menu;
