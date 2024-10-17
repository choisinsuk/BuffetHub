import React, { lazy, Suspense } from "react"; // lazy 로딩을 위한 임포트

// EditNoticeComponent를 lazy 로딩으로 임포트
const EditNoticeComponent = lazy(() => import("../components/EditNoticeComponent")); // 공지사항 수정 컴포넌트

const editNoticeRouter = () => {
  return [
    {
      path: "edit", // 공지사항 수정 경로
      element: (
        <Suspense fallback={<div>Loading...</div>}> {/* 로딩 중일 때 표시할 컴포넌트 */}
          <EditNoticeComponent /> {/* EditNoticeComponent를 렌더링 */}
        </Suspense>
      ),
    },
  ];
};

export default editNoticeRouter; // editNoticeRouter를 기본으로 내보냄 
