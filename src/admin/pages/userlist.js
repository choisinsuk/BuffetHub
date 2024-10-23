import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicMenu from "../components/menu/BasicMenu";

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]); // 전체 회원 리스트 상태
  const [filteredUser, setFilteredUser] = useState([]); // 필터링된 유저 데이터 (검색 결과)
  const [searchName, setSearchName] = useState(""); // 검색어
  const [isSearchActive, setIsSearchActive] = useState(false); // 검색 결과 유무 확인
  const [error, setError] = useState(null); // 에러 메시지 상태
  const [sortDirection, setSortDirection] = useState("asc"); // 이름 정렬 방향 상태

  // JWT 토큰을 로컬 스토리지에서 가져옴
  const token = localStorage.getItem("accessToken"); // JWT 토큰 가져오기

  console.log("토큰:", token);
  // API 기본 설정
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/admin/",
    headers: {
      "Authorization": `Bearer ${token}`, // JWT 토큰 추가
      "Content-Type": "application/json"
    },
  });

  // 회원 정보를 가져오는 useEffect
  useEffect(() => {
    axiosInstance
      .post("UserView") // 수정: URL에서 중복 제거
      .then((response) => {
        setUsers(Array.isArray(response.data) ? response.data : []); // 배열로 설정
        setLoading(false);
      })
      .catch((error) => {
        console.error("회원 정보를 불러오는 중 오류가 발생했습니다:", error);
        setError("회원 정보를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      });
  }, []);

  // 검색 기능
  const handleSearch = () => {
    if (searchName.trim() === "") {
      alert("검색어를 입력해주세요");
      return;
    }
    axiosInstance
      .get("UserView/search", {
        params: { name: searchName },
      })
      .then((response) => {
        setFilteredUser(Array.isArray(response.data) ? response.data : []); // 배열로 설정
        setIsSearchActive(true);
      })
      .catch((error) => {
        console.error("검색 중 오류가 발생하였습니다:", error);
        setError(`검색 중 오류가 발생했습니다: ${error.message}`); // 오류 메시지 구체화
      });
  };

  const handleSearchInputChange = (e) => {
    setSearchName(e.target.value);
    if (e.target.value.trim() === "") {
      setIsSearchActive(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 이름 정렬
  const handleSort = () => {
    const sortedUsers = [...(isSearchActive ? filteredUser : users)];
    sortedUsers.sort((a, b) => {
      const nameA = a.urNm.toLowerCase();
      const nameB = b.urNm.toLowerCase();
      return sortDirection === "asc"
        ? nameA.localeCompare(nameB) // 정렬 방식 개선
        : nameB.localeCompare(nameA);
    });
    setUsers(sortedUsers);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc"); // 정렬 방향 토글
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <BasicMenu />
      {/* 메인 콘텐츠 영역 */}
      <div className="bg-white my-5 w-full flex-col space-y-4">
        <main className="bg-customColor2 w-5/6 mx-auto px-3 py-20 rounded-lg flex items-center justify-center text-center shadow-lg border-2-black ">
          <div className="text-5xl text-fontColor font-bold ">회원 리스트</div>
        </main>
      </div>

      {error && <div className="text-red-500 text-center">{error}</div>} {/* 에러 메시지 표시 */}

      <hr className="my-4" />

      <div className="bg-white w-5/6 mx-auto text-center flex justify-center pb-9">
        <table className="w-full bg-white border-collapse text-center ">
          <thead>
            <tr className="text-center">
              <td colSpan={5} className="text-right">
                <div className="mb-6">
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded w-1/5 text-left"
                    placeholder="회원 이름을 검색하세요"
                    value={searchName}
                    onChange={handleSearchInputChange}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    className="ml-2 bg-customColor1 text-fontColor px-4 py-2 rounded hover:bg-customColor4 font-bold"
                    onClick={handleSearch}
                  >
                    검색
                  </button>
                </div>
              </td>
            </tr>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">
                회원 이름
                <span onClick={handleSort} className="cursor-pointer ml-1 text-gray-500">▼</span>
              </th>
              <th className="py-2 px-4 border-b">회원 ID</th>
              <th className="py-2 px-4 border-b">이메일</th>
              <th className="py-2 px-4 border-b">회원 전화번호</th>
              <th className="py-2 px-2 border-b">회원 상태</th>
            </tr>
          </thead>
          <tbody>
            {(isSearchActive ? filteredUser : users).length === 0 ? 
              (<tr><td colSpan={5} className="py-2">회원이 없습니다.</td></tr>) 
              :  
              ((isSearchActive ? filteredUser : users).map((user, index) => (
                <tr key={user.urId} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-2 px-4 border-b">{user.urNm}</td>
                  <td className="py-2 px-4 border-b">{user.urId}</td>
                  <td className="py-2 px-4 border-b">{user.urEml}</td>
                  <td className="py-2 px-4 border-b">{user.urPhn}</td>
                  <td className="py-2 px-2 border-b">{user.urConditionCode}</td>
                </tr>
              )))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
