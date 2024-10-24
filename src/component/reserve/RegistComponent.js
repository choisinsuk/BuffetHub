import { useState } from "react";
import DateTimePicker from "./calendar";
import { postRegist } from "../../api/reserveApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hook/useCustomMove";
import { useNavigate } from "react-router-dom";

const initState = {
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

  bvNb: 0,
  urId: "",
};

const RegistComponent = () => {
  const [reserve, setReserve] = useState({ ...initState });
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  // 결과 데이터가 있는 경우 ResultModal을 보여준다
  const [result, setResult] = useState(null); // 결과 상태

  const { moveToMyReserve } = useCustomMove();

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

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
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
    // 예약자 성함과 전화번호가 공란인지 체크
    if (!reserve.rsNm.trim()) {
      alert("예약자 성함을 입력해 주세요."); // 알림 표시
      return;
    }

    // 예약자 성함: 공백 없는 한글 및 길이 체크
    const nameRegex = /^[가-힣]+$/; // 공백 없는 한글만 허용
    if (!nameRegex.test(reserve.rsNm)) {
      alert("예약자 성함은 한글로만 입력 가능하며 공백은 포함될 수 없습니다."); // 알림 표시
      return;
    }

    if (reserve.rsNm.length > 10) {
      alert("예약자 성함은 최대 10자까지 입력 가능합니다."); // 알림 표시
      return;
    }

    if (!reserve.rsPhn.trim()) {
      alert("전화번호를 입력해 주세요."); // 알림 표시
      return;
    }

    // 전화번호: 공백 없는 숫자 및 길이 체크
    const phoneRegex = /^[0-9]+$/; // 숫자만 허용
    if (!phoneRegex.test(reserve.rsPhn)) {
      alert("전화번호는 숫자만 입력 가능하며 공백은 포함될 수 없습니다."); // 알림 표시
      return;
    }

    if (reserve.rsPhn.length > 11) {
      alert("전화번호는 최대 11자까지 입력 가능합니다."); // 알림 표시
      return;
    }

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

    // 사용자 정보를 설정
    const user = {
      urId: reserve.urId,
    };

    // reserve 객체에 user 필드 추가
    const reserveWithUser = { ...reserve, user };

    postRegist(reserveWithUser)
      .then((result) => {
        console.log(result);
        setResult(result.RSNB); // 결과 데이터 변경
        // 초기화
        setReserve({ ...initState });

        // 예약 성공 후 moveToList 호출
        alert("예약이 완료되었습니다.");
        moveToMyReserve();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const closeModal = () => {
    setResult(null);
    moveToMyReserve();
  };

  return (
    <div className="border border-black w-5/6">
      {/* 모달처리 */}
      {result ? (
        <ResultModal
          title={"Add result"}
          content={`New ${result} Added`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <div className="flex justify-center py-3">
        <table className="border-2 border-black w-4/4">
          <thead className="border-2 border-black">
            <tr>
              <td
                colSpan={2}
                className="text-center text-3xl py-8 font-bold text-fontColor"
              >
                예약 하기
              </td>
            </tr>
          </thead>

          <tbody>
            <tr className="border-2 border-black">
              <td className="w-1/3">예약자 이름</td>
              <td className="w-1/3">
                <input
                  type="text"
                  size={10}
                  className="w-full bg-customColor2"
                  name="rsNm"
                  value={reserve.rsNm}
                  onChange={handleChangeReserve}
                />
              </td>
            </tr>

            <tr>
              <td className="w-1/3" colSpan={2}>
                현장 예약확인 시, 성함 및 번호 뒷자리가 사용됩니다.
              </td>
            </tr>

            <tr className="border-2 border-black">
              <td>핸드폰 번호</td>
              <th>
                <input
                  type="text"
                  size={11}
                  className="w-full bg-customColor2"
                  name="rsPhn"
                  value={reserve.rsPhn}
                  onChange={handleChangeReserve}
                />
              </th>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="">핸드폰 번호제외 11자 입력</div>
              </td>
            </tr>

            <tr>
              <td colSpan={2}>1-20인까지 정수만 입력 가능</td>
            </tr>

            <tr className="border-2 border-black">
              <td>성인</td>
              <td>
                <input
                  type="number"
                  size={3}
                  className="text-center w-full bg-customColor1"
                  min={0} // 최소값 설정
                  max={20} // 최대값 설정
                  value={reserve.rsAdultPersonCnt}
                  name="rsAdultPersonCnt"
                  onChange={handleChangeReserve}
                />
              </td>
            </tr>
            <tr className="border-2 border-black">
              <td>아동</td>
              <td>
                <input
                  type="number"
                  size={3}
                  className=" text-center w-full bg-customColor1"
                  min={0} // 최소값 설정
                  max={20} // 최대값 설정
                  value={reserve.rsChildPersonCnt}
                  name="rsChildPersonCnt"
                  onChange={handleChangeReserve}
                />
              </td>
            </tr>

            <tr className="border-2 border-black ">
              <td>미취학</td>
              <td>
                <input
                  type="number"
                  size={3}
                  className=" text-center w-full bg-customColor1"
                  min={0} // 최소값 설정
                  max={20} // 최대값 설정
                  value={reserve.rsPreagePersonCnt}
                  name="rsPreagePersonCnt"
                  onChange={handleChangeReserve}
                />
              </td>
            </tr>

            <tr className="border-2 border-black ">
              <td colSpan={2}>
                <p className="pt-3 text-lg">날짜를 선택해주세요</p>
                <div className="m-5 min-w-[500px] md:min-w-[500px] min-h-[300px]">
                  <DateTimePicker
                    selectedDate={selectedDate} // 선택된 날짜 전달
                    onDateChange={handleDateChange}
                  />{" "}
                  {/* 날짜 변경시 호출*/}
                </div>
              </td>
            </tr>

            <tr className="border-2 border-black ">
              <td>
                <div className="text-sm">
                  <div className="text-center m-auto h-auto">특이사항</div>
                </div>
              </td>

              <td colSpan={2}>
                <textarea
                  rows={4}
                  cols={50}
                  name="rsSignificant"
                  value={reserve.rsSignificant}
                  onChange={handleChangeReserve}
                />
              </td>
            </tr>
          </tbody>

          <tfoot className="border-2 border-black bg-customColor4">
            <tr>
              <td>
                <button
                  type="button"
                  className="bg-orange-300 w-32 h-10 border border-black rounded my-3"
                  onClick={handleClickRegist}
                >
                  예약접수
                </button>
              </td>

              <td>
                <button
                  type="button"
                  className="bg-orange-200 border rounded-lg py-5 px-10 text-fontColor 
                hover:bg-orange-400 hover:text-white transition duration-200 ease-in-out hover:shadow-xl hover:font-bold"
                  onClick={handleBackClick}
                >
                  뒤로가기
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default RegistComponent;
