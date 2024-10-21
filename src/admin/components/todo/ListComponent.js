import { useEffect, useState } from "react";
import { getList } from "../../../api/NoticeApi"
import useCustomMove from "../hooks/useCustomMove"
import PageNotice from "../common/PageNotice"
import PageComponent from "../common/PageNotice";

const initState = {
  dtoList:[],
  pageNumList:[],
  pageRequestDTO: null,
  Prev: false,
  next: false,
  totoalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0
}

const ListComponent = () => {

  const {page, size, refresh, moveToList, moveToRead} = useCustomMove() //moveToList 추가

  //serverDate는 나중에 사용
  const [serverData, setServerDate] = useState(initState)

  useEffect(() => {

    getList({page,size}).then(data => {
      console.log(data)
      setServerDate(data)
    })

  }, [page, size, refresh])

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">

        {serverData.dtoList.map(notice =>
          <div
          key={notice.NtNb}
          className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
          >
            <div className="flex ">
              <div className="font-extrabold text-2xl p-2 w-1/12">
              {notice.NtNb}
              </div>
              <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
              {notice.title}
              </div>
              <div className="text-1xl m-1 p-2 w-2/10 font-medium">
              {notice.dueDate} 
      </div>
    </div>
    </div>
  )}
  </div>  
<PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
  </div>
  );
}
 export default ListComponent;