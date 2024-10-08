import ListComponent from "./ListComponent";

const MyReserveComponent = () => {
  
  return (
    <div className="text-sm flex flex-col justify-center w-5/6">
      <div className="m-7">
        <div className="font-bold text-lg">진행중 예약</div>
        <div className="border border-black m-5 flex flex-col">
          <ListComponent></ListComponent>
          <div className="p-5">
            <div className="flex flex-row justify-center">
              <button
                 type="button"
                className="bg-orange-300 w-32 h-10 border border-black rounded m-5"
              >
                예약수정
              </button>
              <button
                type="button"
                className="bg-red-600 w-32 h-10 border border-black rounded m-5"
              >
                예약삭제
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="m-7">
        <div className="font-bold text-lg">지난 예약</div>
        <div className="border border-black m-5 flex flex-col">
        <ListComponent past={true}></ListComponent>
          <div className="p-5">
            <div className="flex flex-row justify-center">
              <button
                type="button"
                className="bg-orange-300 w-32 h-10 border border-black rounded m-5"
              >
                후기 작성
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MyReserveComponent;
