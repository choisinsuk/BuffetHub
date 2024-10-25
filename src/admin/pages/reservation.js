import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicMenu from "../components/menu/BasicMenu";

import { putVisitStatus } from "../../api/reserveApi";

import ReservationTable from "./components/reserve/reservationTable";

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

  console.log("토큰:", token);

  // API 기본 설정
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/admin/",
    headers: {
      Authorization: `Bearer ${token}`, // JWT 토큰 추가
      "Content-Type": "application/json",
    },
  });

  // 로컬 스토리지에 데이터 저장 및 불러오기 함수
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const loadFromLocalStorage = (key, defaultValue) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  };

  // API 호출하여 예약 데이터 가져오기
  useEffect(() => {
    const storedReserves = loadFromLocalStorage("reserves", []);
    const storedDining = loadFromLocalStorage("dining", []);

    // 로컬 스토리지에 데이터가 있으면 사용, 없으면 API 호출
    if (storedReserves.length > 0 || storedDining.length > 0) {
      setReserves(storedReserves);
      setDining(storedDining);
    } else {
      axiosInstance
        .get("reserves")
        .then((response) => {
          setReserves(response.data);
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
        });
    }
  }, []);

  // 이름으로 검색
  const handleSearchName = () => {
    if (searchName.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    axiosInstance
      .get("reserves/search/name", { params: { name: searchName } })
      .then((response) => {
        setFilteredReserve(response.data);
        setIsSearchActive(true);
        setSelectedCategory("검색 결과");
      })
      .catch((error) => {
        console.error("검색 중 오류가 발생하였습니다:", error);
      });
  };

  // 예약 삭제 기능
  const handleDelete = (reservationId) => {
    axiosInstance
      .delete(`reserves/${reservationId}`)
      .then(() => {
        return axiosInstance.get("reserves");
      })
      .then((response) => {
        setReserves(response.data);
        saveToLocalStorage("reserves", response.data); // 로컬 스토리지에 저장
      })
      .catch((error) => {
        console.error("예약 삭제 중 오류 발생:", error);
        alert("예약 삭제 중 오류가 발생했습니다.");
      });
  };

  // 검색어 입력 시 상태 업데이트
  const handleSearchInputChange = (e) => {
    setSearchName(e.target.value);
    if (e.target.value.trim() === "") {
      setIsSearchActive(false);
    }
  };

  // 엔터키로 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchName();
    }
  };
  // 식사 중 테이블로 이동  ------------------------------------------------------------------------------------------
  const moveToDining = async (reservationId) => {
    const reservationToMove = reserves.find(
      (res) => res.rsNb === reservationId
    );

    // 확인 메시지를 출력하고, 사용자가 확인을 누를 경우에만 진행
    const isConfirmed = window.confirm("예약을 매장으로 이동하시겠습니까?");
    if (!isConfirmed) {
      return; // 사용자가 취소를 누르면 함수 실행을 중단
    }

    if (reservationToMove) {
      try {
        // 방문 여부 변경 메서드 호출
        const updatedVisitStatus = await putVisitStatus(reservationId);

        if (updatedVisitStatus) {
          // 방문 상태가 성공적으로 변경되었다면

          const updatedDining = [...dining, reservationToMove];
          const updatedReserves = reserves.filter(
            (res) => res.rsNb !== reservationId
          );

          // 방문 여부가 변경되면 상태를 업데이트
          setDining(updatedDining);
          setReserves(updatedReserves);

          // 로컬 스토리지에 저장
          saveToLocalStorage("dining", updatedDining);
          saveToLocalStorage("reserves", updatedReserves);
        } else {
          alert("방문 상태 변경에 실패했습니다.");
        }
      } catch (error) {
        console.error("방문 상태 업데이트 중 오류가 발생했습니다:", error);
        alert("방문 상태 업데이트에 실패했습니다.");
      }
    } else {
      alert("예약을 찾을 수 없습니다.");
    }
  };

  // 좌석 테이블에서 입장 대기 테이블로 이동
  const moveToReserves = (reservationId) => {
    const reservationToMove = dining.find((res) => res.rsNb === reservationId);
    if (reservationToMove) {
      const updatedReserves = [...reserves, reservationToMove];
      const updatedDining = dining.filter((res) => res.rsNb !== reservationId);

      setReserves(updatedReserves);
      setDining(updatedDining);

      // 로컬 스토리지에 저장
      saveToLocalStorage("reserves", updatedReserves);
      saveToLocalStorage("dining", updatedDining);
    }
  };

  // 이름, 날짜, 총 인원 정렬
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

  return (
    <div>
      <BasicMenu />
      <div className="py-10">
        <ReservationTable
          data={isSearchActive ? filteredReserve : reserves}
          handleSort={handleSort}
          moveToDining={moveToDining}
          handleDelete={handleDelete}
          searchName={searchName}
          handleSearchInputChange={handleSearchInputChange}
          handleKeyPress={handleKeyPress}
          handleSearchName={handleSearchName}
        />
        <ReservationTable
          data={dining}
          moveToDining={moveToDining}
          moveToReserves={moveToReserves}
          searchName={searchName}
          handleSearchInputChange={handleSearchInputChange}
          handleKeyPress={handleKeyPress}
          handleSearchName={handleSearchName}
          isDining={true}
        />
      </div>
    </div>
  );
};

export default Reservation;
