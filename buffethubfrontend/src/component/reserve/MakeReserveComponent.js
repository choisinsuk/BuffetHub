import { useState } from "react";
import DateTimePicker from "./calendar";
import { postRegist } from "../../api/reserveApi";

const initState = {
  rsAdultPersonCnt: 0,
  rsChildPersonCnt: 0,
  rsPreagePersonCnt: 0,
  rsTotalPersonCnt: 0,

  rsVisitAdultCnt: 0,
  rsVisitChildCnt: 0,
  rsVisitPreageCnt: 0,
  rsVisitTotalCnt: 0,

  rsNm: " ",
  rsPhn: " ",
  rsSignificant: " ",

  rsDt: " ",
  rsPaymentCompleteYn: false,
  rsVisitYn: false,

  bvNb: 0,
  urId: " ",
};

const MakeReserveComponent = () => {
  const [reserve, setReserve] = useState({ ...initState });
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChangeReserve = (e) => {
    const { name, value } = e.target;

    // 숫자형으로 변환
    const numericValue = parseInt(value, 10);

    // 0~20 사이의 값만 허용
    if (
      name === "rsAdultPersonCnt" ||
      name === "rsChildPersonCnt" ||
      name === "rsPreagePersonCnt"
    ) {
      if (numericValue >= 0 && numericValue <= 20) {
        setReserve((prev) => ({ ...prev, [name]: numericValue }));
      }
    } else {
      setReserve((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (date) {
      // 로컬 시간 기준으로 ISO 형식을 만듦
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      // 로컬 시간 기준으로 조합된 ISO 형식
      const localISODateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

      setReserve((prev) => ({ ...prev, rsDt: localISODateTime }));
    }
  };

  const handleClickRegist = () => {
    // 0~20 사이의 값 체크
    if (
      reserve.rsAdultPersonCnt < 0 ||
      reserve.rsAdultPersonCnt > 20 ||
      reserve.rsChildPersonCnt < 0 ||
      reserve.rsChildPersonCnt > 20 ||
      reserve.rsPreagePersonCnt < 0 ||
      reserve.rsPreagePersonCnt > 20
    ) {
      alert("예약 인원 수는 카테고리 당 20명 이하여야 합니다."); // 알림 표시
      return;
    }

    // 최소 1명 이상 예약
    const totalPersons =
      reserve.rsAdultPersonCnt +
      reserve.rsChildPersonCnt +
      reserve.rsPreagePersonCnt;
    if (totalPersons <= 0) {
      alert("예약 최소 인원수는 1명 이상이어야 합니다.");
      return;
    }

    postRegist(reserve)
      .then((result) => {
        console.log(result);
        // 초기화
        setReserve({ ...initState });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="border border-black">
      <div className="p-2">
        <div className="flex flex-row text-sm m-2 ">
          <div className="p-3 pr-0">예약자 성함</div>
          <input
            type="text"
            size={10}
            className="m-3"
            name="rsNm"
            value={reserve.rsNm}
            onChange={handleChangeReserve}
          />
          <div>
            현장 예약확인 시, 성함과 <br />
            핸드폰 번호 뒤 4자리가 필요합니다.
          </div>
        </div>
        <div className="flex flex-row text-sm">
          <div className="p-3 pr-0 ml-2">핸드폰 번호</div>
          <input
            type="text"
            size={11}
            className="m-3"
            name="rsPhn"
            value={reserve.rsPhn}
            onChange={handleChangeReserve}
          />
          <div className="m-2">- 제외 11자 입력</div>
        </div>
      </div>

      <div className="flex flex-row text-sm m-3 ">
        <div className="flex flex-col m-4">
          <div>성인</div>
          <input
            type="number"
            size={3}
            className="m-4 text-center"
            min={0} // 최소값 설정
            max={20} // 최대값 설정
            value={reserve.rsAdultPersonCnt}
            name="rsAdultPersonCnt"
            onChange={handleChangeReserve}
          />
        </div>
        <div className="flex flex-col m-4">
          <div>아동</div>
          <input
            type="number"
            size={3}
            className="m-4 text-center"
            min={0} // 최소값 설정
            max={20} // 최대값 설정
            value={reserve.rsChildPersonCnt}
            name="rsChildPersonCnt"
            onChange={handleChangeReserve}
          />
        </div>
        <div className="flex flex-col m-4">
          <div>미취학</div>
          <input
            type="number"
            size={3}
            className="m-4 text-center"
            min={0} // 최소값 설정
            max={20} // 최대값 설정
            value={reserve.rsPreagePersonCnt}
            name="rsPreagePersonCnt"
            onChange={handleChangeReserve}
          />
        </div>
        <div className="m-6">
          1-20인까지
          <br />
          정수만 입력 가능
        </div>
      </div>

      <div className="m-5 min-w-[300px] md:min-w-[400px] min-h-[300px]">
        <DateTimePicker
          selectedDate={selectedDate} // 선택된 날짜 전달
          onDateChange={handleDateChange} // 날짜 변경시 호출
        />
      </div>

      <div className="text-sm flex flex-row mt-5">
        <div className="mr-3 ml-3">특이사항</div>
        <textarea
          rows={4}
          cols={50}
          name="rsSignificant"
          value={reserve.rsSignificant}
          onChange={handleChangeReserve}
        />
      </div>

      <button
        type="button"
        className="bg-orange-300 w-32 h-10 border border-black rounded mt-5"
        onClick={handleClickRegist}
      >
        예약접수
      </button>
    </div>
  );
};

export default MakeReserveComponent;
