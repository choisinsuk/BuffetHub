import React, { useState, useEffect } from "react";
import BasicMenu from "../components/menu/BasicMenu";
import ReservationStatsChart from "./components/main/UserChart";
import axios from "axios";

const Main = () => {
  const [totalCounts, setTotalCounts] = useState({
    성인: 0,
    청소년: 0,
    미취학: 0,
  });
  
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜 상태

  const totalRevenue = priceData 
    ? (totalCounts["성인"] * priceData.dayAdultPrice) +
      (totalCounts["청소년"] * priceData.dayChildPrice) +
      (totalCounts["미취학"] * priceData.dayKidsPrice)
    : 0;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const axiosInstance = axios.create({
      baseURL: "http://localhost:8080/api/admin/",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const fetchPrices = async () => {
      try {
        const response = await axiosInstance.get("prices");
        setPriceData(response.data);
      } catch (error) {
        console.error("가격 정보를 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReservationsByDate = async (date) => {
      try {
        const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
        const response = await axiosInstance.get(`reservations/${formattedDate}`);
        console.log('Fetched reservations:', response.data); // 추가된 로그
        setTotalCounts(response.data);
      } catch (error) {
        console.error("예약 정보를 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchPrices();
    fetchReservationsByDate(selectedDate); // 초기 로드 시 오늘 날짜의 예약 데이터 가져오기
  }, [selectedDate]);

  const changeDate = (offset) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + offset);
    setSelectedDate(newDate);
  };

  // CustomDate 컴포넌트 정의
  const CustomDate = ({ date, format = "yyyy년 mm월 dd일" }) => {
    // 원하는 형식으로 날짜를 설정합니다.
    const formattedDate = format
      .replace("yyyy", date.getFullYear())
      .replace("mm", String(date.getMonth() + 1).padStart(2, '0')) // 월을 두 자리로 표시
      .replace("dd", String(date.getDate()).padStart(2, '0')); // 일을 두 자리로 표시

    return (
      <div>
        {formattedDate}
      </div>
    );
  };

  return (
    <div>
      <BasicMenu />
      
      <div className="bg-white my-5 w-full flex-col space-y-4">
        <main className="bg-orange-100 w-5/6 mx-auto px-3 py-14 rounded-lg flex items-center justify-center text-center shadow-lg border-2-black">
          <div className="text-5xl text-fontColor font-bold ">
            <p className="pb-2">관리자님</p>
            <p>어서오십시오</p>
          </div>
        </main>

        {/* 날짜 선택 및 버튼 */}
        <div className="flex justify-center mb-4">
          <button onClick={() => changeDate(-1)} className="mx-2">◀</button>
          <span className="text-2xl"><CustomDate date={selectedDate} format="yyyy년 mm월 dd일" /></span>
          <button onClick={() => changeDate(1)} className="mx-2">▶</button>
        </div>

        {/* 예약 인원 및 매출 정보 */}
        <main className="border-2 border-gray-200 w-5/6 mx-auto px-3 py-14 rounded-lg flex items-center justify-start text-center shadow-2xl border-2-black ">
          <table>
            <tr>
              <td>
                <div className="text-2xl text-fontColor font-bold mx-10 flex flex-row">
                  <ReservationStatsChart setTotalCounts={setTotalCounts} />
                </div>
              </td>
            </tr>
          </table>

          <table className="border-2 border-black">
            <tr className="border-2 border-black">
              <td colSpan={5} className="py-3 text-center">예약 정보 현황</td>
            </tr>

            <tr className="border-2 border-black">
              <td className="px-10 py-3">분류</td>
              <td className="px-10">인원 수</td>
              <td className="px-10">단가</td>
              <td className="px-10">예상 매출 금액</td>
              <td className="px-10 border-2 border-black">예상 총 매출 금액</td>
            </tr>

            <tr className="border-2 border-black">
              <td className="py-3">성인</td>
              <td>{totalCounts["성인"]}명</td>
              <td>{priceData ? priceData.dayAdultPrice.toLocaleString() : 0}원</td>
              <td>
                {priceData ? (totalCounts["성인"] * priceData.dayAdultPrice).toLocaleString() : 0}원
              </td>
              <td rowSpan={3} className="border-2 border-black">{totalRevenue.toLocaleString()}원</td>
            </tr>

            <tr className="border-2 border-black">
              <td className="py-3">청소년</td>
              <td>{totalCounts["청소년"]}명</td>
              <td>{priceData ? priceData.dayChildPrice.toLocaleString() : 0}원</td>
              <td>
                {priceData
                  ? (totalCounts["청소년"] * priceData.dayChildPrice).toLocaleString()
                  : 0}원
              </td>
            </tr>

            <tr>
              <td className="py-3">미취학</td>
              <td>{totalCounts["미취학"]}명</td>
              <td>{priceData ? priceData.dayKidsPrice.toLocaleString() : 0}원</td>
              <td>
                {priceData ? (totalCounts["미취학"] * priceData.dayKidsPrice).toLocaleString() : 0}원
              </td>
            </tr>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Main;
