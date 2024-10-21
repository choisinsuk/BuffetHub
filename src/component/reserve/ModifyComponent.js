import { useEffect, useState } from "react";
import { getOne, deleteOne, putOne } from "../../api/reserveApi"; // 예약 불러오기, 삭제, 수정 API
import DateTimePicker from "./calendar";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hook/useCustomMove";

const initState = {
  rsNb: 0,
  rsAdultPersonCnt: 0,
  rsChildPersonCnt: 0,
  rsPreagePersonCnt: 0,
  rsTotalPersonCnt: 0,

  rsVisitAdultCnt: 0,
  rsVisitChildCnt: 0,
  rsVisitPreageCnt: 0,
  rsVisitTotalCnt: 0,

  rsNm: "",
  rsPhn: "",
  rsSignificant: "",

  rsDt: "",
  rsPaymentCompleteYn: false,
  rsVisitYn: false,

  urId: "",
};

const ModifyComponent = ({ rsNb }) => {
  const [reserve, setReserve] = useState({ ...initState });
  const [selectedDate, setSelectedDate] = useState(null);

  // 모달 창을 위한 상태
  const [result, setResult] = useState(null); // 결과 상태

  const { moveToMyReserve } = useCustomMove();

  // 예약 데이터 불러오기
  useEffect(() => {
    console.log("rsNb:", rsNb);
    if (rsNb) {
      getOne(rsNb)
        .then((data) => {
          console.log("Fetched Data:", data); // 데이터 확인
          if (data) {
            setReserve(data);
            setSelectedDate(new Date(data.rsDt)); // 날짜를 Date 객체로 변환
          } else {
            console.error("예약 정보를 찾을 수 없습니다.");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [rsNb]);

  // 입력 값 변경 핸들러
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

  // 날짜 변경 핸들러
  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      const localISODateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

      setReserve((prev) => ({ ...prev, rsDt: localISODateTime }));
    }
  };

  // 예약 수정 처리
  const handleClickModify = () => {
    putOne(reserve)
      .then(() => {
        setResult("수정완료"); // 결과 데이터 변경
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 예약 삭제 처리
  const handleClickDelete = () => {
    deleteOne(rsNb)
      .then(() => {
        setResult("삭제완료");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const closeModal = () => {
    moveToMyReserve();
  };

  return (
    <div className="border border-black">
      {/* 모달 처리 */}
      {result && (
        <ResultModal
          title={"Edit result"}
          content={`${result}`}
          callbackFn={closeModal}
        />
      )}
      <div className="p-2">
        <div className="flex flex-row text-sm m-2">
          <div className="p-3 pr-0">예약자 성함</div>
          <input
            type="text"
            size={10}
            className="m-3"
            name="rsNm"
            value={reserve.rsNm} // rsNm 값을 연결
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
            value={reserve.rsPhn} // rsPhn 값을 연결
            onChange={handleChangeReserve}
          />
          <div className="m-2">- 제외 11자 입력</div>
        </div>
      </div>

      <div className="flex flex-row text-sm m-3">
        <div className="flex flex-col m-4">
          <div>성인</div>
          <input
            type="number"
            size={3}
            className="m-4 text-center"
            min={0}
            max={20}
            value={reserve.rsAdultPersonCnt} // 성인 인원수 연결
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
            min={0}
            max={20}
            value={reserve.rsChildPersonCnt} // 아동 인원수 연결
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
            min={0}
            max={20}
            value={reserve.rsPreagePersonCnt} // 미취학 인원수 연결
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
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>

      <div className="text-sm flex flex-row mt-5">
        <div className="mr-3 ml-3">특이사항</div>
        <textarea
          rows={4}
          cols={50}
          name="rsSignificant"
          value={reserve.rsSignificant} // 특이사항 연결
          onChange={handleChangeReserve}
        />
      </div>

      <div className="flex justify-center mt-5">
        <button
          type="button"
          className="bg-orange-300 w-32 h-10 border border-black rounded"
          onClick={handleClickModify}
        >
          예약수정
        </button>
        <button
          type="button"
          className="bg-red-500 w-32 h-10 border border-black rounded ml-3"
          onClick={handleClickDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default ModifyComponent;
