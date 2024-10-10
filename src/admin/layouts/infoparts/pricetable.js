import React, { useEffect, useState } from "react";
import axios from "axios";

const PriceTable = () => {
  /* 상태 초기화 */
  const [priceTable, setPriceTable] = useState(null);  // 객체 형태로 수정
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/prices")
      .then((response) => {
        console.log(response.data);
        setPriceTable(response.data);  // 객체로 설정
        setLoading(false);
      })
      .catch((error) => {
        console.error("가격 정보를 불러오는 중 오류가 발생했습니다:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 객체에서 값을 직접 접근하여 렌더링
  return (
    <div className="center">
      <table className="w-5/6 bg-white border border-black rounded-lg shadow-lg shadow-gray-400/50 text-center mx-auto">
        <thead>
          <tr className="bg-gray-400 text-black">
            <th className="py-2 px-1 border border-black">항목</th>
            <th className="py-2 px-4 border border-black">어른</th>
            <th className="py-2 px-4 border border-black">초등학생</th>
            <th className="py-2 px-4 border border-black">미취학</th>
          </tr>
        </thead>

        <tbody>
          {/* 평일 가격 */}
          <tr>
            <td className="py-2 px-1 border border-black" rowSpan="2">
              평일 <br /> 가격
            </td>
            <td className="py-2 px-1 border border-black">{priceTable.dayAdultPrice}원</td>
            <td className="py-2 px-1 border border-black">{priceTable.dayChildPrice}원</td>
            <td className="py-2 px-1 border border-black">{priceTable.dayKidsPrice}원</td>
          </tr>
          <tr>
            <td className="py-2 px-1 border border-black">버튼자리</td>
            <td className="py-2 px-1 border border-black">버튼자리</td>
            <td className="py-2 px-1 border border-black">버튼자리</td>
          </tr>

          {/* 주말 가격 */}
          <tr>
            <td className="py-2 px-1 border border-black" rowSpan="2">
              주말 <br /> 가격
            </td>
            <td className="py-2 px-1 border border-black">{priceTable.weekAdultPrice}원</td>
            <td className="py-2 px-1 border border-black">{priceTable.weekChildPrice}원</td>
            <td className="py-2 px-1 border border-black">{priceTable.weekKidsPrice}원</td>
          </tr>
          <tr>
            <td className="py-2 px-1 border border-black">버튼자리</td>
            <td className="py-2 px-1 border border-black">버튼자리</td>
            <td className="py-2 px-1 border border-black">버튼자리</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;
