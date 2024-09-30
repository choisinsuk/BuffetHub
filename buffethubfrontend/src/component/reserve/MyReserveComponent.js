const MyReserveComponent = () => {
  return (
    <div className="text-sm flex flex-col justify-center w-5/6">
      <div className="m-7">
        <div className="font-bold text-lg">진행중 예약</div>
        <div className="border border-black m-5 flex flex-col">
          <table className="m-10 ">
            <tr>
              <td className="border border-black"></td>
              <td className="border border-black">예약 번호</td>
              <td className="border border-black">예약일</td>
              <td className="border border-black">예약 시간</td>
              <td className="border border-black">인원 수</td>
            </tr>
            <tr>
              <td className="border border-black">
                <input type="radio" />
              </td>
              <td className="border border-black">66</td>
              <td className="border border-black">2024.09.27</td>
              <td className="border border-black">16:30</td>
              <td className="border border-black">
                성인 2명, 아동 1명, 미취학 1명
              </td>
            </tr>
          </table>
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

      <div className="m-7">
        <div className="font-bold text-lg">지난 예약</div>
        <div className="border border-black m-5 flex flex-col">
          <table className="m-10 ">
            <tr>
              <td className="border border-black"></td>
              <td className="border border-black">예약 번호</td>
              <td className="border border-black">예약일</td>
              <td className="border border-black">예약 시간</td>
              <td className="border border-black">인원 수</td>
            </tr>
            <tr>
              <td className="border border-black">
                <input type="radio" />
              </td>
              <td className="border border-black">4</td>
              <td className="border border-black">2024.08.20</td>
              <td className="border border-black">18:30</td>
              <td className="border border-black">
                성인 5명, 아동 0명, 미취학 0명
              </td>
            </tr>
          </table>
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
      </div>
    </div>
  );
};

export default MyReserveComponent;
