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

    fetchPrices();
  }, []);

  return (
    <div>
      <BasicMenu />
      <div className="bg-white my-5 w-full flex-col space-y-4">
        <main className="bg-orange-100 w-5/6 mx-auto px-3 py-14 rounded-lg flex items-center justify-center text-center shadow-lg border-2-black ">
          <div className="text-5xl text-fontColor font-bold ">
            <p className="pb-2">관리자님</p>
            <p>어서오십시오</p>
          </div>
        </main>

        <main className="border-2 border-gray-200 w-5/6 mx-auto px-3 py-14 rounded-lg flex items-center justify-start text-center shadow-2xl border-2-black">
          <table>
            <tr>
              <td className="pb-5 font-bold text-2xl">현재 예약 인원</td>
            </tr>
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
              <td colSpan={5} className="py-3">예약 정보 현황</td>
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
              <td>{priceData ? (priceData.dayChildPrice).toLocaleString() : 0}원</td>
              <td>
                {priceData
                  ? (totalCounts["청소년"] * priceData.dayChildPrice).toLocaleString()
                  : 0}원
              </td>
            </tr>

            <tr >
              <td className="py-3">미취학</td>
              <td>{totalCounts["미취학"]}명</td>
              <td>{priceData ? (priceData.dayKidsPrice).toLocaleString() : 0}원</td>
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
