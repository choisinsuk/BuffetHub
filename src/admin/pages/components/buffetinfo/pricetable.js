import React, { useEffect, useState } from "react";
import axios from "axios";

const PriceTable = () => {
  const [loading, setLoading] = useState(true);
  const [priceTable, setPriceTable] = useState({
    dayAdultPrice: 0,
    dayChildPrice: 0,
    dayKidsPrice: 0,
    weekAdultPrice: 0,
    weekChildPrice: 0,
    weekKidsPrice: 0,
  });

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
    const fetchPrices = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:8080/api/admin/prices");
        setPriceTable(response.data);
      } catch (error) {
        console.error("가격 정보를 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  const handleUpdate = async (priceType) => {
    const currentPrice = priceTable[priceType];
    const newPriceInput = prompt(`새 가격을 입력해주세요 [ 현재 가격: ${currentPrice} ]`);
    if (newPriceInput == null) return;

    const newPrice = parseInt(newPriceInput, 10);
    if (isNaN(newPrice) || newPrice < 0) {
      alert("정보가 올바르지 않습니다. 다시 입력하세요.");
      return;
    }

    const updatedPriceTable = { ...priceTable, [priceType]: newPrice };

    try {
      const id = 1; // 이 부분은 동적으로 수정할 수 있습니다.
      const response = await axiosInstance.put(`http://localhost:8080/api/admin/prices/${id}`, updatedPriceTable);
      setPriceTable(response.data); // 응답에서 새로운 가격 정보를 사용하여 상태 업데이트
      alert("가격이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("가격 업데이트 중 오류가 발생했습니다:", error);
      alert("가격 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="center">
      <table className="w-5/6 h-1/2 bg-white border border-black rounded-lg shadow-lg shadow-gray-400/50 text-center mx-auto">
        <thead>
          <tr className="bg-customColor3 text-black">
            <th className="py-2 px-1 border border-black">항목</th>
            <th className="py-2 px-4 border border-black">어른</th>
            <th className="py-2 px-4 border border-black">초등학생</th>
            <th className="py-2 px-4 border border-black">미취학</th>
          </tr>
        </thead>
        <tbody>
          {/* 평일 가격 */}
          <tr>
            <td className="py-2 px-1 border border-black" rowSpan="2">평일 <br /> 가격</td>
            <td className="py-2 px-1 border border-black">{priceTable.dayAdultPrice}원</td>
            <td className="py-2 px-1 border border-black">{priceTable.dayChildPrice}원</td>
            <td className="py-2 px-1 border border-black">{priceTable.dayKidsPrice}원</td>
          </tr>
          <tr>
            <td className="py-2 px-1 border border-black">
              <button className="ml-2 px-2 py-1 bg-customColor2 text-fontColor rounded 
                      hover:bg-customColor3 font-bold transition transform hover:scale-110 duration-300 ease-in-out"
              onClick={() => handleUpdate("dayAdultPrice")}>
                수정
              </button>
            </td>
            <td className="py-2 px-1 border border-black">
              <button className="ml-2 px-2 py-1 bg-customColor2 text-fontColor rounded 
                      hover:bg-customColor3 font-bold transition transform hover:scale-110 duration-300 ease-in-out"
              onClick={() => handleUpdate("dayChildPrice")}>
                수정
              </button>
            </td>
            <td className="py-2 px-1 border border-black">
              <button className="ml-2 px-2 py-1 bg-customColor2 text-fontColor rounded 
                      hover:bg-customColor3 font-bold transition transform hover:scale-110 duration-300 ease-in-out"
              onClick={() => handleUpdate("dayKidsPrice")}>
                수정
              </button>
            </td>
          </tr>

          {/* 주말 가격 */}
          <tr>
            <td className="py-2 px-1 border border-black" rowSpan="2">주말 <br /> 가격</td>
            <td className="py-2 px-1 border border-black">{priceTable.weekAdultPrice}원</td>
            <td className="py-2 px-1 border border-black">{priceTable.weekChildPrice}원</td>
            <td className="py-2 px-1 border border-black">{priceTable.weekKidsPrice}원</td>
          </tr>
          <tr>
            <td className="py-2 px-1 border border-black">
              <button className="ml-2 px-2 py-1 bg-customColor2 text-fontColor rounded 
                      hover:bg-customColor3 font-bold transition transform hover:scale-110 duration-300 ease-in-out"
              onClick={() => handleUpdate("weekAdultPrice")}>
                수정
              </button>
            </td>
            <td className="py-2 px-1 border border-black">
              <button className="ml-2 px-2 py-1 bg-customColor2 text-fontColor rounded 
                      hover:bg-customColor3 font-bold transition transform hover:scale-110 duration-300 ease-in-out"
              onClick={() => handleUpdate("weekChildPrice")}>
                수정
              </button>
            </td>
            <td className="py-2 px-1 border border-black">
              <button className="ml-2 px-2 py-1 bg-customColor2 text-fontColor rounded 
                      hover:bg-customColor3 font-bold transition transform hover:scale-110 duration-300 ease-in-out"
              onClick={() => handleUpdate("weekKidsPrice")}>
                수정
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;