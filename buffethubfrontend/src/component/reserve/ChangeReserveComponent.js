const ChangeReserveComponent = () => {



  
  return <div className="text-sm flex flex-col justify-center w-5/6">
    <div className="flex flex-col border border-black m-5">
      <table className="m-10 ">
        <tr>
        <td className="border border-black"></td>
          <td className="border border-black">예약 번호</td>
          <td className="border border-black">예약일</td>
          <td className="border border-black">예약 시간</td>
          <td className="border border-black">인원 수</td>
        </tr>
        <tr>
        <td className="border border-black">
          <input type="radio"/>
        </td>
          <td className="border border-black">66</td>
          <td className="border border-black">2024.09.27</td>
          <td className="border border-black">16:30</td>
          <td className="border border-black">성인 2명, 아동 1명, 미취학 1명</td>
        </tr>
      </table>
      <div className="p-5">
      <div className="flex flex-row justify-center">
      <button type="button" className="bg-orange-300 w-32 h-10 border border-black rounded m-5">예약수정</button>
      <button type="button" className="bg-red-600 w-32 h-10 border border-black rounded m-5">예약삭제</button>
      </div>
      </div>
      </div>

      <div className="border border-black m-5">
      ▷ 예약 안내사항
        <br/> -온라인 예약, 변경 및 취소는 이용 날짜 기준 하루 전까지 가능하며 이용 당일 예약 변경은 불가합니다.
        <br/> -예약 후 노쇼 누적 시, 온라인 예약이 불가할 수 있습니다.
        <br/>
        <br/>▷ 미취학 아동은 만 4세(49개월) 미만입니다.
        <br/>▷ 아동은만 만 4세(49개월)~ 만 12세(초등학교 6학년)입니다.
        <br/>▷ 좌석은 지정 예약이 불가하며 예약하신 순차적으로 배정됩니다.
        <br/>▷ 예약 접수 시작일은 '1개월 전 1일' 입니다. 예) 3월 예약 : 2월 1일 오전 8시 부터 가능
        <br/>
        <br/>▷ 진행중 이벤트는 이벤트 페이지에서 확인 부탁드립니다.
      </div>


    
  </div>;
};

export default ChangeReserveComponent;
