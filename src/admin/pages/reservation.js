import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicMenu from "../components/menu/BasicMenu";

const Reservation = () => {
  const [reserves, setReserves] = useState([]);
  const [dining, setDining] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc"); // 정렬 방향 상태
  const [searchName, setSearchName] = useState(""); // 검색어
  const [filteredReserve, setFilteredReserve] = useState([]); // 필터링된 유저 데이터 (검색결과)
  const [isSearchActive, setIsSearchActive] = useState(false); // 검색 결과 유무 확인
  const [selectedCategory, setSelectedCategory] = useState("전체");

  // JWT 토큰을 로컬 스토리지에서 가져옴
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

  // API 호출하여 예약 데이터 가져오기
  useEffect(() => {
    axiosInstance
      .get("reserves")
      .then((response) => {
        setReserves(response.data);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      });
  }, []);

  //이름으로 찾기 -----------------------------------------------------------------------------------------------------
  const handleSearchName = () => {
    if (searchName.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    axiosInstance
      .get("http://localhost:8080/api/admin/reserves/search/name", {
        params: { name: searchName },
      })
      .then((response) => {
        setFilteredReserve(response.data); // 필터링된 유저 데이터 설정
        setIsSearchActive(true);
        setSelectedCategory("검색 결과");
      })
      .catch((error) => {
        console.error("검색 중 오류가 발생하였습니다:", error);
      });
  };

  //삭제 기능 -----------------------------------------------------------------------------------------------------
  const handleDelete = (reservationId) => {
    axios
      .delete(`http://localhost:8080/api/admin/reserves/${reservationId}`)
      .then((response) => {
        // 삭제 후 예약 목록을 다시 가져옵니다.
        return axios.get("http://localhost:8080/api/admin/reserves");
      })
      .then((response) => {
        setReserves(response.data); // 업데이트된 예약 목록
      })
      .catch((error) => {
        console.error("예약 삭제 중 오류 발생:", error);
        alert("예약 삭제 중 오류가 발생했습니다.");
      });
  };
  // 찾기 버튼  -----------------------------------------------------------------------------------------------------
  const handleSearchInputChange = (e) => {
    setSearchName(e.target.value);
    if (e.target.value.trim() === "") {
      setIsSearchActive(false);
    }
  };
  // 엔터를 눌러도 찾을 수 있게  -------------------------------------------------------------------------------------
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchName();
    }
  };
  // 식사 중 테이블로 이동  ------------------------------------------------------------------------------------------
  const moveToDining = (reservationId) => {
    const reservationToMove = reserves.find(
      (res) => res.rsNb === reservationId
    );
    if (reservationToMove) {
      setDining([...dining, reservationToMove]);
      setReserves(reserves.filter((res) => res.rsNb !== reservationId));
    }
  };

  // 이전 버튼: 좌석 테이블에서 다시 입장 대기 테이블로 이동 -----------------------------------------------------------
  const moveToReserves = (reservationId) => {
    const reservationToMove = dining.find((res) => res.rsNb === reservationId);
    if (reservationToMove) {
      setReserves([...reserves, reservationToMove]);
      setDining(dining.filter((res) => res.rsNb !== reservationId));
    }
  };

  // 이름 날짜 총 인원 수 정렬
  const handleSort = (sortBy) => {
    const sortedReserves = [...reserves];
    sortedReserves.sort((a, b) => {
      if (sortBy === "name") {
        const nameA = a.rsNm.toLowerCase();
        const nameB = b.rsNm.toLowerCase();
        return sortDirection === "asc"
          ? nameA < nameB
            ? -1
            : 1
          : nameA > nameB
          ? -1
          : 1;
      } else if (sortBy === "date") {
        const dateA = new Date(a.rsDt);
        const dateB = new Date(b.rsDt);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortBy === "totalPerson") {
        const totalA = a.rsTotalPersonCnt;
        const totalB = b.rsTotalPersonCnt;
        return sortDirection === "asc" ? totalA - totalB : totalB - totalA;
      }
      return 0;
    });
    setReserves(sortedReserves);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  //---------------------------------------------------------------------------------------------[ 페이지 작성 ]
  return (
    <div>
      <BasicMenu />

      <div className="bg-white my-5 w-full flex-col space-y-4">
        <main className="bg-customColor2 w-5/6 mx-auto px-3 py-20 rounded-lg flex items-center justify-center text-center shadow-lg border-2-black ">
          <div className="text-5xl text-fontColor font-bold ">예약 정보 관리</div>
        </main>
      </div>

      <div className="w-5/6 mx-auto mb-5 pb-5 px-2 rounded-lg flex justify-center text-center shadow-md border-4">
        <main className="text-center rounded justify-center w-full ">
          <p className="text-3xl text-fontColor font-bold mb-4 pt-2">예약 리스트</p>
          <hr className="w-full mx-auto border-2"/>
          
          <table className="w-full border-collapse rounded-lg border-black">
            <thead>
              <tr>
                <td colSpan={10} className="text-right pt-4">
                  <div className="mb-6 pr-2 text-right">
                    <input
                      type="text"
                      className="border border-gray-300 p-2 rounded w-1/5 text-left"
                      placeholder="회원 이름을 검색하세요"
                      value={searchName}
                      onChange={handleSearchInputChange}
                      onKeyPress={handleKeyPress}
                    />
                    <button
                      className="ml-2 px-3 bg-customColor2 text-black py-2 rounded 
                      hover:bg-customColor3 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                      onClick={handleSearchName}
                    >
                      검색
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-gray-200">
                <th className="py-2 px-2 border-b">예약번호</th>
                <th className="py-2 px-4 border-b">예약자 ID</th>
                <th className="py-2 px-4 border-b">
                  예약자 이름
                  <span
                    onClick={() => handleSort("name")}
                    className="cursor-pointer ml-1 text-gray-500"
                  >
                    ▼
                  </span>
                </th>
                <th className="py-2 px-4 border-b">
                  예약일자
                  <span
                    onClick={() => handleSort("date")}
                    className="cursor-pointer ml-1 text-gray-500"
                  >
                    ▼
                  </span>
                </th>
                <th className="py-2 px-2 border-b">
                  총인원
                  <span
                    onClick={() => handleSort("totalPerson")}
                    className="cursor-pointer ml-1 text-gray-500"
                  >
                    ▼
                  </span>
                </th>
                <th className="py-2 px-2 border-b">성인</th>
                <th className="py-2 px-2 border-b">아동</th>
                <th className="py-2 px-2 border-b">미취학</th>
                <th className="py-2 px-2 border-b">전화번호</th>
                <th className="py-2 px-2 border-b">상태 변경</th>
              </tr>
            </thead>
            <tbody>
              {(isSearchActive ? filteredReserve : reserves).length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-2">
                    회원이 없습니다.
                  </td>
                </tr>
              ) : (
                (isSearchActive ? filteredReserve : reserves).map(
                  (reserve, index) => (
                    <tr
                      key={reserve.rsNb}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-2 px-4 border-b">{reserve.rsNb}</td>
                      <td className="py-2 px-4 border-b">{reserve.urId}</td>
                      <td className="py-2 px-4 border-b">{reserve.rsNm}</td>
                      <td className="py-2 px-4 border-b">{reserve.rsDt}</td>
                      <td className="py-2 px-2 border-b">
                        {reserve.rsTotalPersonCnt}명
                      </td>
                      <td className="py-2 px-2 border-b">
                        {reserve.rsAdultPersonCnt}명
                      </td>
                      <td className="py-2 px-2 border-b">
                        {reserve.rsChildPersonCnt}명
                      </td>
                      <td className="py-2 px-2 border-b">
                        {reserve.rsPreagePersonCnt}명
                      </td>
                      <td className="py-2 px-2 border-b">{reserve.rsPhn}</td>
                      <td className="py-2 px-2 border-b">
                        <button
                          className="ml-2 px-2 bg-customColor2 text-fontColor py-2 rounded 
                      hover:bg-customColor3 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                          onClick={() => moveToDining(reserve.rsNb)}
                        >
                          입장
                        </button>
                        <button
                          className="ml-2 px-2 bg-customColor2 text-fontColor py-2 rounded 
                      hover:bg-customColor3 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                          onClick={() => handleDelete(reserve.rsNb)}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </main>
      </div>

      <div className="w-5/6 mx-auto mb-5 pb-5 px-2 rounded-lg flex justify-center text-center shadow-md border-4">
        <main className="text-center rounded justify-center w-full ">
          <p className="text-3xl text-fontColor font-bold mb-4 pt-2">매장 내</p>
          <hr className="w-full mx-auto border-2"/>
          
          <table className="w-full border-collapse rounded-lg border-black">
            <thead>
              <tr>
                <td colSpan={10} className="text-right pt-4">
                  <div className="mb-6 pr-2 text-right">
                    <input
                      type="text"
                      className="border border-gray-300 p-2 rounded w-1/5 text-left"
                      placeholder="회원 이름을 검색하세요"
                      value={searchName}
                      onChange={handleSearchInputChange}
                      onKeyPress={handleKeyPress}
                    />
                    <button
                      className="ml-2 px-3 bg-customColor2 text-fontColor py-2 rounded 
                      hover:bg-customColor1 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                      onClick={handleSearchName}
                    >
                      검색
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-gray-200">
                <th className="py-2 px-2 border-b">예약번호</th>
                <th className="py-2 px-4 border-b">예약자 ID</th>
                <th className="py-2 px-4 border-b">
                  예약자 이름
                  <span
                    onClick={() => handleSort("name")}
                    className="cursor-pointer ml-1 text-gray-500"
                  >
                    ▼
                  </span>
                </th>
                <th className="py-2 px-4 border-b">
                  예약일자
                  <span
                    onClick={() => handleSort("date")}
                    className="cursor-pointer ml-1 text-gray-500"
                  >
                    ▼
                  </span>
                </th>
                <th className="py-2 px-2 border-b">
                  총인원
                  <span
                    onClick={() => handleSort("totalPerson")}
                    className="cursor-pointer ml-1 text-gray-500"
                  >
                    ▼
                  </span>
                </th>
                <th className="py-2 px-2 border-b">성인</th>
                <th className="py-2 px-2 border-b">아동</th>
                <th className="py-2 px-2 border-b">미취학</th>
                <th className="py-2 px-2 border-b">전화번호</th>
                <th className="py-2 px-2 border-b">상태 변경</th>
              </tr>
            </thead>
            <tbody>
              {dining.map((reserve, index) => (
                <tr
                  key={reserve.rsNb}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2 px-4 border-b">{reserve.rsNb}</td>
                  <td className="py-2 px-4 border-b">{reserve.urId}</td>
                  <td className="py-2 px-4 border-b">{reserve.rsNm}</td>
                  <td className="py-2 px-4 border-b">{reserve.rsDt}</td>
                  <td className="py-2 px-2 border-b">
                    {reserve.rsTotalPersonCnt}명
                  </td>
                  <td className="py-2 px-2 border-b">
                    {reserve.rsAdultPersonCnt}명
                  </td>
                  <td className="py-2 px-2 border-b">
                    {reserve.rsChildPersonCnt}명
                  </td>
                  <td className="py-2 px-2 border-b">
                    {reserve.rsPreagePersonCnt}명
                  </td>
                  <td className="py-2 px-2 border-b">{reserve.rsPhn}</td>
                  <td className="py-2 px-2 border-b">
                  <button
                          className="ml-2 px-2 bg-customColor2 text-fontColor py-2 rounded 
                      hover:bg-customColor3 font-bold"
                      onClick={() => moveToReserves(reserve.rsNb)}
                    >
                      되돌리기
                    </button>

                    <button
                          className="ml-2 px-2 bg-customColor2 text-fontColor py-2 rounded 
                      hover:bg-customColor3 font-bold"
                      onClick={() => moveToDining(reserve.rsNb)}
                    >
                      결제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
      
      <hr className="mt-10 w-full" />
    </div>
  );
};

export default Reservation;