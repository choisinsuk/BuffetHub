import { useEffect, useState } from "react";
import { getList } from "../../../api/freeBoardApi";
import useCustomMove from "../hooks/useCustomMove";
import PageComponent from "../common/pageFreeBoard";

const initState = {
  dtoList: [],
  pageNumList: [],
  prev: false, // 대문자 수정
  next: false, // 대문자 수정
  totalCount: 0, // 대문자 수정
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const FreeListComponent = () => {
  const { page, size, refresh, moveToList } = useCustomMove(); // moveToList 추가
  const [serverData, setServerData] = useState(initState); // 상태 변수 이름 수정

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getList({ page, size });
        console.log(data);
        setServerData(data);
      } catch (error) {
        console.error("공지사항 목록을 불러오는 중 오류 발생:", error);
        alert("공지사항 목록을 불러오는 중 오류가 발생했습니다.");
      }
    };
    
    fetchData(); // 데이터를 불러옴
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {serverData.dtoList.length > 0 ? ( // 데이터가 있는 경우에만 맵핑
          serverData.dtoList.map((freeBoard) => (
            <div
              key={freeBoard.ftNb} // 대문자 수정
              className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
            >
              <div className="flex">
                <div className="font-extrabold text-2xl p-2 w-1/12">
                  {freeBoard.ftNb} {/* 대문자 수정 */}
                </div>
                <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                  {freeBoard.ftTitle} {/* 대문자 수정 */}
                </div>
                <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                  {freeBoard.ftRegdt} {/* 대문자 수정 */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center">공지사항이 없습니다.</div> // 데이터가 없을 때 메시지
        )}
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} /> {/* 페이지네이션 추가 */}
    </div>
  );
};

export default FreeListComponent;
