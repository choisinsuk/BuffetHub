import { useState } from "react";
import { postAdd } from "../../../api/freeBoardApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  ftTitle: "",
  ftCtt: "",
  ftRegdt: "",
};

const FreeAddComponent = () => {
  const [freeboard, setFreeboard] = useState({ ...initState });

  // 결과 데이터가 있는 경우에는 ResultModal 을 보여준다.
  const [result, setResult] = useState(null); //결과 상태

  const { moveToList } = useCustomMove(); //useCustomMove 활용

  const handleChangeFreeboard = (e) => {
    freeboard[e.target.name] = e.target.value;
    setFreeboard({ ...freeboard });
  };
  const handleClickAdd = () => {
    // console.log(freeboard)
    postAdd(freeboard)
      .then((result) => {
        console.log(result);
        setResult(result.FTNB); //결과 데이터 변경
        //초기화
        setFreeboard({ ...initState });
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
        ftTitle={"Add Result"}
          content={`New ${result} Added`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">FTTITLE</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="ftTitle"
            type={"text"}
            value={freeboard.ftTitle}
            onChange={handleChangeFreeboard}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">FTCTT</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="ftCtt"
            type={"text"}
            value={freeboard.ftCtt}
            onChange={handleChangeFreeboard}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">FTREGDT</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="ftRegdt"
            type={"date"}
            value={freeboard.ftRegdt}
            onChange={handleChangeFreeboard}
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
export default FreeAddComponent;
