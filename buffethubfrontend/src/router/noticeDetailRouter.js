import { lazy, Suspense } from "react"; // lazy 로딩을 위한 임포트

// NoticeDetail 컴포넌트를 lazy 로딩으로 임포트
const NoticeDetail = lazy(() => import("../components/NoticeDetailComponent")); // 공지사항 세부 정보 컴포넌트
const EditNotice = lazy(() => import("../components/EditNotice")); // 공지사항 수정 컴포넌트

const noticeDetailRouter = () => {
  return [
    {
      path: "detail", // 공지사항 세부 정보 경로
      element: (
        <Suspense fallback={<div>Loading...</div>}> {/* 로딩 중일 때 표시할 컴포넌트 */}
          <NoticeDetail /> {/* NoticeDetail 컴포넌트를 렌더링 */}
        </Suspense>
      ),
    },
    {
      path: "edit", // 공지사항 수정 경로
      element: (
        <Suspense fallback={<div>Loading...</div>}> {/* 로딩 중일 때 표시할 컴포넌트 */}
          <EditNotice /> {/* EditNotice 컴포넌트를 렌더링 */}
        </Suspense>
      ),
    },
  ];
};

export default noticeDetailRouter; // noticeDetailRouter를 기본으로 내보냄
