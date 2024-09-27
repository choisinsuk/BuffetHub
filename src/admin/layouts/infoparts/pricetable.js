import React, { useState } from "react";

const PriceTable = () => {
  // 가격 설정
  const [daysPrice, setDaysPrice] = useState({
    adult: "27,500원",
    elementary: "15,900원",
    kids: "8,000원",
  });

  const [weekendPrice, setWeekendPrice] = useState({
    adult: "27,500원",
    elementary: "15,900원",
    kids: "8,000원",
  });

  const changePrice = (type, category) => {
    const newPrice = prompt( `${category}의 새로운 가격을 입력하세요 (예: 30,000원):`);
    if (newPrice) {
      if (type === "daysPrice") {
        setDaysPrice((prev) => ({
          ...prev,
          [category]: newPrice,
        }));
      } else {
        setWeekendPrice((prev) => ({
          ...prev,
          [category]: newPrice,
        }));
      }
    }
  };

  return (
    // 테이블 시작
    <main className="bg-slate-300 w-2/3 px-5 py-60 text-center">
      <table className="w-5/6 bg-white border border-black rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-400 text-black">
            <th className="py-2 px-4 border border-black">항목</th>
            <th className="py-2 px-4 border border-black">어른</th>
            <th className="py-2 px-4 border border-black">초등학생</th>
            <th className="py-2 px-4 border border-black">미취학</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="py-2 px-4 border border-black" rowSpan="2">평일 가격</td>
            <td className="py-2 px-4 border border-black">{daysPrice.adult}</td>
            <td className="py-2 px-4 border border-black">{daysPrice.elementary}</td>
            <td className="py-2 px-4 border border-black">{daysPrice.kids}</td>
          </tr>

          <tr>
            <td className="border border-black">
              <button className="ml-2 px-4 py-1 rounded bg-orange-500 text-white font-bold shadow-md hover:bg-orange-600 transition" onClick={() => changePrice("daysPrice", "adult")}> 수정 </button>
            </td>
            <td className="border border-black">
              <button className="ml-2 px-4 py-1 rounded bg-orange-500 text-white font-bold shadow-md hover:bg-orange-600 transition" onClick={() => changePrice("daysPrice", "elementary")}> 수정 </button>
            </td>
            <td className="border border-black">
              <button className="ml-2 px-4 py-1 rounded bg-orange-500 text-white font-bold shadow-md hover:bg-orange-600 transition" onClick={() => changePrice("daysPrice", "kids")}> 수정 </button>
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border border-black" rowSpan="2">주말 가격</td>
            <td className="py-2 px-4 border border-black">{weekendPrice.adult}</td>
            <td className="py-2 px-4 border border-black">{weekendPrice.elementary}</td>
            <td className="py-2 px-4 border border-black">{weekendPrice.kids}</td>
          </tr>

          <tr>
            <td className="border border-black">
              <button className="ml-2 px-4 py-1 rounded bg-orange-500 text-white font-bold shadow-md hover:bg-orange-600 transition" onClick={() => changePrice("weekendPrice", "adult")}> 수정 </button>
            </td>
            <td className="border border-black">
              <button className="ml-2 px-4 py-1 rounded bg-orange-500 text-white font-bold shadow-md hover:bg-orange-600 transition" onClick={() => changePrice("weekendPrice", "elementary")}> 수정 </button>
            </td>
            <td className="border border-black">
              <button className="ml-2 px-4 py-1 rounded bg-orange-500 text-white font-bold shadow-md hover:bg-orange-600 transition" onClick={() => changePrice("weekendPrice", "kids")}> 수정 </button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

export default PriceTable;