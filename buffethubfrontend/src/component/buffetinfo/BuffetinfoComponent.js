import React from "react";

// BuffetinfoComponent: 뷔페 정보를 표시하는 컴포넌트
const BuffetinfoComponent = () => {
  return (
    <div className="p-4 text-center"> {/* 전체 컨테이너, 패딩 및 중앙 정렬 */}
      <h1 className="text-3xl font-bold mb-4"> {/* 뷔페 제목, 큰 글씨 및 굵은 글씨 */}
        뷔페 정보
      </h1>
      <p>여기에 뷔페 정보가 들어갑니다.</p> {/* 뷔페 정보 내용 */}
    </div>
  );
};

export default BuffetinfoComponent; // BuffetinfoComponent를 다른 파일에서 사용할 수 있도록 내보냄
