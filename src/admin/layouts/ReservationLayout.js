// 필요한 모듈 가져오기
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BasicMenu from "../components/menu/BasicMenu";
import Calendar from "../pages/parts/calendars";

// 컴포넌트 정의
const ReservationLayout = () => {
  const [reserves, setReserves] = useState([]);

  // API 호출 및 데이터 설정
  useEffect(() => {
    axios.get('http://localhost:8080/api/reserves') // 백엔드에서 예약 데이터를 가져옴
      .then(response => {
        setReserves(response.data); // 가져온 데이터를 상태로 저장
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      });
  }, []);

  return (
    <div>
      <BasicMenu></BasicMenu>

      {/* div태그는 메인 콘텐츠와 사이드바를 포함하는 컨테이너. 반응형 레이아웃을 위해 flexbox를 사용한다. */}
      <div className="bg-white my-5 w-full flex-row space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        {/* main태그는 메인 콘텐츠 영역을 저의하며, 배경색과 패딩을 설정한다. */}
        <main className="bg-customColor2 w-full px-3 py-20 rounded-lg flex items-center justify-center">
          <div className="text-3xl text-white font-bold">예약 정보 관리</div>
        </main>
      </div>

      <hr className="my-4" />

      <div className="bg-white my-5 w-full flex-row space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <main className="bg-yellow-200 w-full text-center">
          &nbsp;
          <div className="font-bold">조회할 날짜를 선택해주세요</div>
          &nbsp;
          <Calendar />
        </main>
      </div>

      <div className="bg-white my-5 w-full flex-row space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <main className="bg-red-200 w-full px-5 py-60 text-center">
          

          {/* 예약 리스트를 출력하는 테이블 */}
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">예약번호</th>
                <th className="py-2">예약자 ID</th>
                <th className="py-2">예약일자</th>
                <th className="py-2">총인원</th>
                <th className="py-2">성인 인원</th>
                <th className="py-2">아동 인원</th>
                <th className="py-2">미취학 인원</th>
              </tr>
            </thead>
            <tbody>
              {reserves.map((reserve) => (
                <tr key={reserve.rsNb}>
                  <td className="py-2">{reserve.rsNb}</td>
                  <td className="py-2">{reserve.urId}</td>
                  <td className="py-2">{reserve.rsDt}</td>
                  <td className="py-2">{reserve.rsTotalPersonCnt}</td>
                  <td className="py-2">{reserve.rsAdultPersonCnt}</td>
                  <td className="py-2">{reserve.rsChildPersonCnt}</td>
                  <td className="py-2">{reserve.rsPreagePersonCnt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

// 컴포넌트 내보내기
export default ReservationLayout;