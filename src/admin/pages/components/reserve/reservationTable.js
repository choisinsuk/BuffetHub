import React from 'react';

const ReservationTable = ({ data, handleSort, moveToDining, handleDelete, moveToReserves, searchName, handleSearchInputChange, handleKeyPress, handleSearchName, isDining }) => {
  return (
    <div className="w-5/6 mx-auto mb-5 pb-5 px-2 rounded-lg flex justify-center text-center shadow-md border-4">
      <main className="text-center rounded justify-center w-full ">
        <p className="text-3xl text-fontColor font-bold mb-4 pt-2">
          {isDining ? "매장 내" : "예약 리스트"}
        </p>
        <hr className="w-full mx-auto border-2"/>

        <table className="w-full border-collapse rounded-lg border-black">
          <thead>
            <tr>
              <td colSpan={10} className="text-right pt-4">
                <div className="mb-6 pr-2 text-right">
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded w-1/5 text-left"
                    placeholder="회원 이름을 검색하세요"
                    value={searchName}
                    onChange={handleSearchInputChange}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    className="ml-2 px-3 bg-customColor2 text-fontColor py-2 rounded 
                    hover:bg-customColor3 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                    onClick={handleSearchName}
                  >
                    검색
                  </button>
                </div>
              </td>
            </tr>
            <tr className="bg-gray-200">
              <th className="py-2 px-2 border-b">예약번호</th>
              <th className="py-2 px-4 border-b">예약자 ID</th>
              <th className="py-2 px-4 border-b">
                예약자 이름
                <span
                  onClick={() => handleSort("name")}
                  className="cursor-pointer ml-1 text-gray-500"
                >
                  ▼
                </span>
              </th>
              <th className="py-2 px-4 border-b">
                예약일자
                <span
                  onClick={() => handleSort("date")}
                  className="cursor-pointer ml-1 text-gray-500"
                >
                  ▼
                </span>
              </th>
              <th className="py-2 px-2 border-b">
                총인원
                <span
                  onClick={() => handleSort("totalPerson")}
                  className="cursor-pointer ml-1 text-gray-500"
                >
                  ▼
                </span>
              </th>
              <th className="py-2 px-2 border-b">성인</th>
              <th className="py-2 px-2 border-b">아동</th>
              <th className="py-2 px-2 border-b">미취학</th>
              <th className="py-2 px-2 border-b">전화번호</th>
              <th className="py-2 px-2 border-b">상태 변경</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-2">
                  회원이 없습니다.
                </td>
              </tr>
            ) : (
              data.map((reserve, index) => (
                <tr
                  key={reserve.rsNb}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2 px-4 border-b">{reserve.rsNb}</td>
                  <td className="py-2 px-4 border-b">{reserve.urId}</td>
                  <td className="py-2 px-4 border-b">{reserve.rsNm}</td>
                  <td className="py-2 px-4 border-b">{reserve.rsDt}</td>
                  <td className="py-2 px-2 border-b">
                    {reserve.rsTotalPersonCnt}명
                  </td>
                  <td className="py-2 px-2 border-b">
                    {reserve.rsAdultPersonCnt}명
                  </td>
                  <td className="py-2 px-2 border-b">
                    {reserve.rsChildPersonCnt}명
                  </td>
                  <td className="py-2 px-2 border-b">
                    {reserve.rsPreagePersonCnt}명
                  </td>
                  <td className="py-2 px-2 border-b">{reserve.rsPhn}</td>
                  <td className="py-2 px-2 border-b">
                    {isDining ? (
                      <>
                        <button
                          className="ml-2 px-2 bg-customColor2 text-fontColor py-2 rounded hover:bg-customColor3 font-bold"
                          onClick={() => moveToReserves(reserve.rsNb)}
                        >
                          되돌리기
                        </button>
                        <button
                          className="ml-2 px-2 bg-customColor2 text-fontColor py-2 rounded hover:bg-customColor3 font-bold"
                          onClick={() => moveToDining(reserve.rsNb)}
                        >
                          결제
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="ml-2 px-2 bg-customColor2 text-fontColor py-2 rounded hover:bg-customColor3 font-bold"
                          onClick={() => moveToDining(reserve.rsNb)}
                        >
                          입장
                        </button>
                        <button
                          className="ml-2 px-2 bg-customColor2 text-fontColor py-2 rounded hover:bg-customColor3 font-bold"
                          onClick={() => handleDelete(reserve.rsNb)}
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ReservationTable;
