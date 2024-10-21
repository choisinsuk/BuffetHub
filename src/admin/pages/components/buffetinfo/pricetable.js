import React, { useEffect, useState } from "react";
import axios from "axios";

const PriceTable = () => {
  /* 상태 초기화 */
  const [loading, setLoading] = useState(true);
  
  // 가격 정보를 저장하는 state. 초기값은 모든 가격을 0으로 설정
  const [priceTable, setPriceTable] = useState({
    dayAdultPrice: 0,   // 평일 어른 가격
    dayChildPrice: 0,   // 평일 초등생 가격
    dayKidsPrice: 0,    // 평일 미취학 아동 가격
    weekAdultPrice: 0,  // 주말 어른 가격 가격
    weekChildPrice: 0,  // 주말 초등학생 가격
    weekKidsPrice: 0,   //주말 미취학 아동 가격
  });

  /*가격 정보 불러오기 */
  useEffect(() => {
    axios
      .post("http://localhost:8080/api/admin/prices")    // get방식으로 요청
      .then((response) => {
        setPriceTable(response.data);             // 받아온 데이터를 priceTable 상태에 저장
        setLoading(false);                        // 로딩 상태를 false로 변경
      })
      .catch((error) => {
        console.error("가격 정보를 불러오는 중 오류가 발생했습니다:", error);
        setLoading(false);
      });
  }, []);

  /*가격 업데이트를 처리하는 함수 */
  const handleUpdate = async (priceType) => {
    // 현재 가격을 가져온다.
    const currentPrice = priceTable[priceType];
    // 사용자에게 새로운 가격을 입력 받는다. 현재 가격을 기본값으로 표시
    const newPriceinput = prompt(`새 가격을 입력해주세요 [ 숫자만 : ${currentPrice} ]`);
    //취소시 함수 종료
    if (newPriceinput == null) return;

    //입력값을 정수로 변환
    const newPrice = parseInt(newPriceinput, 10);
    // 입력값이 숫자가 아닐 시 경고창 표시후 함수 종료
    if (isNaN(newPrice)) {
      alert("정보가 올바르지 않습니다. 다시 입력하세요.");
      return;
    }

    // 업데이트할 데이터 객체 생성
    // pricetable을 복사하고 변경괸 가격만 업데이트
    const updatedPriceTable = { ...priceTable, [priceType]: newPrice };

    try {
      // 업데이트 요청 보내기 (id=1로 가정)
      await axios.put("http://localhost:8080/api/admin/prices/1", updatedPriceTable);
      // 상태 업데이트하여 UI 갱신
      setPriceTable(updatedPriceTable);
      alert("가격이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("가격 업데이트 중 오류가 발생했습니다:", error);
      alert("가격 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 객체에서 값을 직접 접근하여 렌더링
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
            <td className="py-2 px-1 border border-black" rowSpan="2">
              평일 <br /> 가격
            </td>
            <td className="py-2 px-1 border border-black">
              {priceTable.dayAdultPrice}원
            </td>
            <td className="py-2 px-1 border border-black">
              {priceTable.dayChildPrice}원
            </td>
            <td className="py-2 px-1 border border-black">
              {priceTable.dayKidsPrice}원
            </td>
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
            <td className="py-2 px-1 border border-black" rowSpan="2">
              주말 <br /> 가격
            </td>
            <td className="py-2 px-1 border border-black">
              {priceTable.weekAdultPrice}원
            </td>
            <td className="py-2 px-1 border border-black">
              {priceTable.weekChildPrice}원
            </td>
            <td className="py-2 px-1 border border-black">
              {priceTable.weekKidsPrice}원
            </td>
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
