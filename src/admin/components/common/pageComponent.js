import React from "react";

// PageComponent: 현재 페이지 번호와 함께 "Prev" 및 "Next" 버튼을 표시하는 페이지네이션 컴포넌트
const PageComponent = ({ serverData, movePage }) => {
  return (
    <div className="m-6 flex justify-center">
      {/* 이전 페이지가 있을 경우 "Prev" 버튼 표시 */}
      {serverData.prev ? (
        <div
          className="m-2 p-2 w-16 text-center font-bold text-blue-400"
          // 클릭 시 movePage 함수를 호출하여 이전 페이지로 이동
          onClick={() => movePage({ page: serverData.prevPage })}
        >
          Prev
        </div>
      ) : null}

      {/* 페이지 번호 목록 표시 */}
      {serverData.pageNumList.map((pageNum) => (
        <div
          key={pageNum} // 각 페이지 번호에 대한 고유 키
          className={`m-2 p-2 w-12 text-center rounded shadow-md text-white ${
            // 현재 페이지를 강조하여 다른 배경색 적용
            serverData.current === pageNum ? "bg-gray-500" : "bg-blue-400"
          }`}
          // 클릭 시 movePage 함수를 호출하여 해당 페이지로 이동
          onClick={() => movePage({ page: pageNum })}
        >
          {pageNum} {/* 페이지 번호 표시 */}
        </div>
      ))}

      {/* 다음 페이지가 있을 경우 "Next" 버튼 표시 */}
      {serverData.next ? (
        <div
          className="m-2 p-2 w-16 text-center font-bold text-blue-400"
          // 클릭 시 movePage 함수를 호출하여 다음 페이지로 이동
          onClick={() => movePage({ page: serverData.nextPage })}
        >
          Next
        </div>
      ) : null}
    </div>
  );
};

export default PageComponent;
