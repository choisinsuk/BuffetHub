import { useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/freeBoardApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
  FTNb: 0,
  ftTitle: "",
  ftCtt: "",
  ftRegdt: "",
  complete: false,
};

const FreeModifyComponent = ({ FTNb }) => {
  const [freeboard, setFreeboard] = useState({ ...initState });

  //모달 창을 위한 상태
  const [result, setResult] = useState(null);

  //이동을 위한 기능들
  const { moveToList, moveToRead } = useCustomMove();

  useEffect(() => {
    getOne(FTNb).then((data) => setFreeboard(data));
  }, [FTNb]);

  const handleClickModify = () => {
    // 수정 버튼 클릭시
    putOne(freeboard).then((data) => {
      //console.log("modify result: " + data)
      setResult("Modified");
    });
  };

  const handleClickDelete = () => {
    // 석제 버튼 클릭시
    deleteOne(FTNb).then((data) => {
      //console.log("delete result: " + data)
      setResult("Deleted");
    });
  };

  //모달 창이 close 될때
  const closeModal = () => {
    if (result === "Deleted") {
      moveToList();
    } else {
      moveToRead(FTNb);
    }
  };

  const handleChangeFreeboard = (e) => {
    freeboard[e.target.name] = e.target.value;
    setFreeboard({ ...freeboard });
  };
  const handleChangeFreeboardComplete = (e) => {
    const value = e.target.value;
    freeboard.complete = value === "Y";
    setFreeboard({ ...freeboard });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {result ? (
        <ResultModal
          ftTitle={"처리결과"}
          content={result}
          callbackFn={closeModal}
        ></ResultModal>
      ) : (
        <></>
      )}
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          {" "}
          <div className="w-1/5 p-6 text-right font-bold">FTNB</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
            {freeboard.FtNb}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">FTCTT</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bggray-100">
            {freeboard.ftCtt}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">FTITLE</div>{" "}
          <input
            className="w-4/5 p-6 rounded-r border border-solid borderneutral-300 shadow-md"
            name="ftTitle"
            type={"text"}
            value={freeboard.ftTitle}
            onChange={handleChangeFreeboard}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">FTREDGF</div>{" "}
          <input
            className="w-4/5 p-6 rounded-r border border-solid borderneutral-300 shadow-md"
            name="ftRegdt"
            type={"date"}
            value={freeboard.ftRegdt}
            onChange={handleChangeFreeboard}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">COMPLETE</div>{" "}
          <select
            name="status"
            className="border-solid border-2 
 rounded m-1 p-2"
            onChange={handleChangeFreeboardComplete}
            value={freeboard.complete ? "Y" : "N"}
          >
            <option value="Y">Completed</option>
            <option value="N">Not Yet</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleClickModify}
        >
          Modify
        </button>
      </div>
    </div>
  );
};

export default FreeModifyComponent;
