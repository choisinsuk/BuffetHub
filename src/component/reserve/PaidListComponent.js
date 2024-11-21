import { useEffect, useState } from "react";
import useCustomMove from "../../hook/useCustomMove";
import { getPaidReservations } from "../../api/reserveApi";
import PageComponent from "../common/pagecomponent";
import { useLocation } from "react-router-dom";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const PaidListComponent = ({ setSelectedReserve }) => { // setSelectedReserve를 props로 받아옴
  const { page, size, moveToMyReserve, moveToModify, moveToList } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const location = useLocation();

  useEffect(() => {
    getPaidReservations({ page, size }).then((data) => {
      console.log("@@Received data: ",data);
      setServerData(data);
    });
  }, [page, size]);

  // 날짜와 시간을 나누는 함수
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { formattedDate, formattedTime };
  };

  // 현재 경로에 따라 movePage 함수 결정
  const determineMovePage = () => {
    if (location.pathname === "/reserve/list") {
      return moveToList;
    } else if (location.pathname === "/mypage/myreservations") {
      return moveToMyReserve;
    }
  }

  return (
    <>
      <table className="m-10">
        <thead>
          <tr>
            <td className="border border-black"></td>
            <td className="border border-black">예약 번호</td>
            <td className="border border-black">예약일</td>
            <td className="border border-black">예약 시간</td>
            <td className="border border-black">인원 수</td>
          </tr>
        </thead>
        <tbody>
          {serverData.dtoList.map((reserve) => {
            const { formattedDate, formattedTime } = formatDate(reserve.rsDt);

            return (
              <tr key={reserve.rsNb}>
                <td className="border border-black">
                  <input
                    type="radio"
                    name="reserve"
                    value={reserve.rsNb}
                    onChange={() => setSelectedReserve(reserve.rsNb)} // 선택된 예약 업데이트
                  />
                </td>
                <td className="border border-black">{reserve.rsNb}</td>
                <td className="border border-black">{formattedDate}</td>
                <td className="border border-black">{formattedTime}</td>
                <td className="border border-black">
                  성인 {reserve.rsAdultPersonCnt}명, 아동 {reserve.rsChildPersonCnt}명, 미취학 {reserve.rsPreagePersonCnt}명
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <PageComponent serverData={serverData} movePage={determineMovePage()}></PageComponent>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default PaidListComponent;
