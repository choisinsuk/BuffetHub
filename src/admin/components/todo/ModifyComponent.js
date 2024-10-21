import { useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/noticeApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
  NtNb: 0,
  ntTitle: "",
  ntCtt: "",
  ntRegdt: "",
  complete: false,
};

const ModifyComponent = ({ NtNb }) => {
  const [notice, setNotice] = useState({ ...initState });

  //모달 창을 위한 상태
  const [result, setResult] = useState(null);

  //이동을 위한 기능들
  const { moveToList, moveToRead } = useCustomMove();

  useEffect(() => {
    getOne(NtNb).then((data) => setNotice(data));
  }, [NtNb]);

  const handleClickModify = () => {
    // 수정 버튼 클릭시
    putOne(notice).then((data) => {
      //console.log("modify result: " + data)
      setResult("Modified");
    });
  };

  const handleClickDelete = () => {
    // 석제 버튼 클릭시
    deleteOne(NtNb).then((data) => {
      //console.log("delete result: " + data)
      setResult("Deleted");
    });
  };

  //모달 창이 close 될때
  const closeModal = () => {
    if (result === "Deleted") {
      moveToList();
    } else {
      moveToRead(NtNb);
    }
  };

  const handleChangeNotice = (e) => {
    notice[e.target.name] = e.target.value;
    setNotice({ ...notice });
  };
  const handleChangeNoticeComplete = (e) => {
    const value = e.target.value;
    notice.complete = value === "Y";
    setNotice({ ...notice });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {result ? (
        <ResultModal
          ntTitle={"처리결과"}
          content={result}
          callbackFn={closeModal}
        ></ResultModal>
      ) : (
        <></>
      )}
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          {" "}
          <div className="w-1/5 p-6 text-right font-bold">NTNB</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
            {notice.NtNb}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">NTCTT</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bggray-100">
            {notice.ntCtt}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">NTTITLE</div>{" "}
          <input
            className="w-4/5 p-6 rounded-r border border-solid borderneutral-300 shadow-md"
            name="ntTitle"
            type={"text"}
            value={notice.ntTitle}
            onChange={handleChangeNotice}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">NTREDGF</div>{" "}
          <input
            className="w-4/5 p-6 rounded-r border border-solid borderneutral-300 shadow-md"
            name="ntRegdt"
            type={"date"}
            value={notice.ntRegdt}
            onChange={handleChangeNotice}
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
            onChange={handleChangenNticeComplete}
            value={notice.complete ? "Y" : "N"}
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

export default ModifyComponent;
