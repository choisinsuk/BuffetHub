import { lazy, Suspense } from "react";

// 페이지가 로드되는 동안 표시할 로딩 메시지를 정의
const Loading = <div>Loading....</div>;

// 비동기적 컴포넌트 로드
const Main = lazy(() => import("../pages/main"));
const Reserve = lazy(() => import("../pages/reservation"));
const BuffetInfo = lazy(() => import("../pages/buffetinfo"));
const UserList = lazy(() => import("../pages/userlist"));
const NoticeBoard = lazy(() => import("../pages/board/noticeBoard"));
const Create = lazy(() => import("../pages/board/create"));
const NoticeModify = lazy(() => import("../pages/board/noticeModify"))


const adminRouter = () => [
  {
    path: "", // 기본 경로는 /admin 자체
    element: <Suspense fallback={Loading}><Main /></Suspense>
  },
  {
    path: "reserve", // 상대 경로
    element: <Suspense fallback={Loading}><Reserve /></Suspense>
  },
  {
    path: "infoManager", // 상대 경로
    element: <Suspense fallback={Loading}><BuffetInfo /></Suspense>
  },
  {
    path: "userManager", // 상대 경로
    element: <Suspense fallback={Loading}><UserList /></Suspense>
  },
  {
    path: "noticeboard", // 상대 경로
    element: <Suspense fallback={Loading}><NoticeBoard /></Suspense>
  },
  {
    path: "create",
    element: <Suspense fallback={Loading}><Create/></Suspense>
},

{
  path: "noticemodify/:ntNb",
  element: <Suspense fallback={Loading}><NoticeModify/></Suspense>
}

];

export default adminRouter;
