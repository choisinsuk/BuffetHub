import { useEffect, useState } from "react";
import useCustomMove from "../../hook/useCustomMove";
import { getList } from "../../api/reserveApi";
import PageComponent from "../common/pagecomponent";


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

const ListComponent = () => {
  const {
    page,
    size,
    moveToMyReserve,
    moveToModifyReserve,
    moveToChangeReserve,
  } = useCustomMove();

  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size]);

  // 날짜와 시간을 나누는 함수
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString(); // 날짜 부분만 추출
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // 시간 부분만 추출 (HH:MM)
    return { formattedDate, formattedTime };
  };

  // 현재 경로에 따라 이동 함수 선택
  const getMoveFunction = () => {
    const currentPath = window.location.pathname;
    if (currentPath.includes("/reserve/changereserve")) {
      return moveToChangeReserve;
    } else if (currentPath.includes("/user/myreserve")) {
      return moveToMyReserve;
    } else if (currentPath.includes("/user/modifypage")) {
      return moveToModifyReserve; // 추가적인 경로에 대한 처리
    }
    return null; // 기본값
  };

  const movePage = getMoveFunction(); // 동적으로 이동 함수 선택

  return (
    <>
      {/* 테이블을 하나로 합치고 그 안에 예약 정보들을 추가 */}
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
                  <input type="radio" name="reserve" />
                </td>
                <td className="border border-black">{reserve.rsNb}</td>
                <td className="border border-black">{formattedDate}</td>{" "}
                {/* 날짜만 출력 */}
                <td className="border border-black">{formattedTime}</td>{" "}
                {/* 시간만 출력 */}
                <td className="border border-black">
                  성인 {reserve.rsAdultPersonCnt}명, 아동{" "}
                  {reserve.rsChildPersonCnt}명, 미취학{" "}
                  {reserve.rsPreagePersonCnt}명
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <PageComponent serverData={serverData} movePage={movePage}></PageComponent>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default ListComponent;
