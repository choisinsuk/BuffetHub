import React, { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [error, setError] = useState(null);
  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuCategory, setNewMenuCategory] = useState("");

  const token = localStorage.getItem("accessToken");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/admin/",
    headers: {
      Authorization: `Bearer ${token}`, // 템플릿 리터럴을 사용하여 Bearer와 token을 포함시킴
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    axiosInstance
      .get("menus") // URL에서 불필요한 부분 제거
      .then((response) => {
        setMenu(response.data);
        setFilteredMenu(response.data);
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

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
    setIsSearchActive(false);
    if (category === "전체") {
      setFilteredMenu(menu);
    } else {
      setFilteredMenu(menu.filter((item) => item.menuCategory === category));
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() === "") {
      setIsSearchActive(false);
      if (selectedCategory === "전체") {
        setFilteredMenu(menu);
      } else {
        setFilteredMenu(
          menu.filter((item) => item.menuCategory === selectedCategory)
        );
      }
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    axiosInstance
      .get("menus/search", { // URL에서 불필요한 부분 제거
        params: { name: searchTerm },
      })
      .then((response) => {
        setFilteredMenu(response.data);
        setIsSearchActive(true);
        setSelectedCategory("검색 결과");
      })
      .catch((error) => {
        console.error("검색 중 오류가 발생하였습니다:", error);
        setError("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  const handleDelete = (menuId) => {
    axiosInstance
      .delete(`menus/${menuId}`) // 템플릿 리터럴을 사용하여 URL을 생성
      .then(() => {
        setMenu(menu.filter((item) => item.menuId !== menuId));
        setFilteredMenu(filteredMenu.filter((item) => item.menuId !== menuId));
      })
      .catch((error) => {
        console.error("메뉴 삭제 중 오류가 발생했습니다:", error);
        setError("메뉴 삭제 중 오류가 발생했습니다.");
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 메뉴 추가 함수
  const handleAddMenu = () => {
    const newMenu = {
      menuName: newMenuName,
      menuCategory: newMenuCategory,
    };
    axiosInstance
      .post("menus/add", newMenu) // URL에서 불필요한 부분 제거
      .then((response) => {
        setMenu([...menu, response.data]); // 새로운 메뉴를 추가한 뒤 상태 업데이트
        setFilteredMenu([...filteredMenu, response.data]);
        setNewMenuName(""); // 폼 리셋
        setNewMenuCategory("");
      })
      .catch((error) => {
        console.error("메뉴 추가 중 오류가 발생했습니다:", error);
        setError("메뉴 추가 중 오류가 발생했습니다.");
      });
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className={`px-3 py-1 m-2 border rounded-lg text-center shadow-md
              transition transform hover:scale-110 duration-200 ease-in-out hover:bg-customColor3
              ${
                selectedCategory === category
                  ? "bg-customColor2 text-black font-bold"
                  : "bg-customColor3 text-white font-bold"
              }`}
          >
            {category}
          </button>
        ))}
        <div className="flex justify-end mb-6"></div>
      </div>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          className="flex-grow border border-black p-2 rounded"
          placeholder="메뉴 이름을 검색하세요"
          value={searchTerm}
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          className="ml-2 bg-customColor2 text-white px-4 py-2 rounded hover:bg-customColor3 transition transform hover:scale-110 duration-200 ease-in-out"
          onClick={handleSearch}
        >
          검색
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* 메뉴 추가 섹션 */}
      <div className="bg-gray-100 p-4 mb-6 rounded">
        <h3 className="text-lg font-semibold mb-4">메뉴 추가</h3>
        <input
          type="text"
          className="mb-2 p-2 border rounded w-full"
          placeholder="메뉴 이름"
          value={newMenuName}
          onChange={(e) => setNewMenuName(e.target.value)}
        />
        <select
          className="mb-2 p-2 border rounded w-full"
          value={newMenuCategory}
          onChange={(e) => setNewMenuCategory(e.target.value)}
        >
          <option value="">카테고리 선택</option>
          <option value="초밥">초밥</option>
          <option value="군함">군함</option>
          <option value="롤">롤</option>
          <option value="회">회</option>
          <option value="핫디쉬">핫디쉬</option>
          <option value="튀김">튀김</option>
          <option value="수프">수프</option>
          <option value="샐러드">샐러드</option>
          <option value="디저트">디저트</option>
          <option value="과일">과일</option>
          <option value="드링크">드링크</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
          onClick={handleAddMenu}
        >
          추가
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((item) => (
            <div
              key={item.menuId}
              className="bg-orange-100 border border-gray-300 rounded-lg p-6 text-center shadow-md transition transform hover:scale-105 duration-200 ease-in-out"
            >
              <h3 className="text-lg font-semibold mb-2">{item.menuName}</h3>
              <p className="text-xs font-bold">{item.menuCategory}</p>
              <button
                className="mt-4 bg-orange-300 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-200 ease-in-out"
                onClick={() => handleDelete(item.menuId)}
              >
                삭제
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-2">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default Menu;
