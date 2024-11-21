import React, { useEffect, useState } from "react"; // useEffect와 useState를 import
import axios from "axios";

const PriceTable = ({ priceTable }) => {
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [prices, setPrices] = useState(priceTable); // 가격 정보를 상태로 관리

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
        setPrices(response.data); // 가격 정보를 상태로 업데이트
      } catch (error) {
        console.error("가격 정보를 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchPrices(); // 가격 정보를 가져오는 함수 호출
  }, []); // 빈 배열을 의존성 배열로 설정하여 컴포넌트 마운트 시 한 번만 실행

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시할 컴포넌트
  }

  return (
    <div className="w-full flex text-center justify-center ">
        <table className=" w-5/6 text-fontColor border-black border-1 min-h-[200px] outline-double shadow-xl bg-white">
          <thead>
            <tr>
              <th className="py-3 px-10 text-3xl bg-orange-100" colSpan={3}>
                <p className="py-1">가격표</p>
              </th>
            </tr>
            <tr className="text-center">
              <th className="py-3 text-center text-2xl">항목</th>
              <th className="py-3 text-center text-2xl">평일</th>
              <th className="py-3 text-center text-2xl">주말</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-10 text-lg text-center ">
                일반
                <br />
                (13세~)
              </td>
              <td className="py-10 text-2xl text-center ">{prices.dayAdultPrice}원</td>
              <td className="py-10 text-2xl text-center ">{prices.weekAdultPrice}원</td>
            </tr>
            <tr>
              <td className="py-10 text-lg">
                아동
                <br />
                (8세~13세)
              </td>
              <td className="py-10 text-2xl">{prices.dayChildPrice}원</td>
              <td className="py-10 text-2xl">{prices.weekChildPrice}원</td>
            </tr>
            <tr>
              <td className="py-10 text-lg">
                미취학아동
                <br />
                (3~7세)
              </td>
              <td className="py-10 text-2xl">{prices.dayKidsPrice}원</td>
              <td className="py-10 text-2xl">{prices.weekKidsPrice}원</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="text-center">
              <td className="pt-4 pb-5 text-center text-lg" colSpan={3}>
                운영시간 오전 11시 ~ 오후 21시 [ 라스트 8시 ]
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
  );
};

export default PriceTable;
