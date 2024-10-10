import React, { useEffect, useState } from "react";
import axios from "axios";

const PriceTable = () => {
  /* 상태 초기화 */
  const [priceTable, setPriceTable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/prices")
      .then((response) => {
        console.log(response.data);
        setPriceTable(response.data);
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
          {priceTable.map((price) => (
            <React.Fragment key={price.id}>
              {/* 평일 가격 */}
              <tr>
                <td className="py-2 px-1 border border-black" rowSpan="2">
                  평일 <br /> 가격
                </td>
                <td className="py-2 px-1 border border-black">{price.dayAdultPrice}원</td>
                <td className="py-2 px-1 border border-black">{price.dayChildPrice}원</td>
                <td className="py-2 px-1 border border-black">{price.dayKidsPrice}원</td>
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
                <td className="py-2 px-1 border border-black">{price.weekAdultPrice}원</td>
                <td className="py-2 px-1 border border-black">{price.weekChildPrice}원</td>
                <td className="py-2 px-1 border border-black">{price.weekKidsPrice}원</td>
              </tr>
              <tr>
                <td className="py-2 px-1 border border-black">버튼자리</td>
                <td className="py-2 px-1 border border-black">버튼자리</td>
                <td className="py-2 px-1 border border-black">버튼자리</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;
