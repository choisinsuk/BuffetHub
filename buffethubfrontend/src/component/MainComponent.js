import React from "react";

// MainComponent: 게시판 정보를 표시하는 컴포넌트
const MainComponent = () => {
  return (
    <div className="p-4 text-center"> {/* 전체 컨테이너, 패딩 및 중앙 정렬 */}
      <h1 className="text-3xl font-bold mb-4"> 
        MainComponent
      </h1>
      <p> MAIN </p> {/* main 정보 내용 */}
    </div>
  );
};

export default MainComponent; // MainComponent를 다른 파일에서 사용할 수 있도록 내보냄
