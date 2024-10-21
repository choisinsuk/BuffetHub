import { useState } from "react";
import { postAdd } from "../../../api/NoticeApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  ntTitle: "",
  ntCtt: "",
  ntRegdt: "",
};

const AddComponent = () => {
  const [notice, setNotice] = useState({ ...initState });

  // 결과 데이터가 있는 경우에는 ResultModal 을 보여준다.
  const [result, setResult] = useState(null); //결과 상태

  const { moveToList } = useCustomMove(); //useCustomMove 활용

  const handleChangeNotice = (e) => {
    notice[e.target.name] = e.target.value;
    setNotice({ ...notice });
  };
  const handleClickAdd = () => {
    // console.log(notice)
    postAdd(notice)
      .then((result) => {
        console.log(result);
        setResult(result.TNO); //결과 데이터 변경
        //초기화
        setNotice({ ...initState });
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const closeModal = () => {
    setResult(null);
    moveToList(); //moveToList()호출
  };
  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {/*모달처리*/}
      {result ? (
        <ResultModal
        ntTitle={"Add Result"}
          content={`New ${result} Added`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">NTTITLE</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="ntTitle"
            type={"text"}
            value={notice.ntTitle}
            onChange={handleChangeNotice}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">NTCTT</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="ntCtt"
            type={"text"}
            value={notice.ntCtt}
            onChange={handleChangeNotice}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">NTREGDT</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="ntRegdt"
            type={"date"}
            value={notice.ntRegdt}
            onChange={handleChangeNotice}
          ></input>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white "
            onClick={handleClickAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddComponent;
