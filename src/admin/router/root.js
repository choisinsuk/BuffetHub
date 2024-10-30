import { lazy, Suspense } from "react";

// 페이지가 로드되는 동안 표시할 로딩 메시지를 정의
const Loading = <div>Loading....</div>;

// 비동기적 컴포넌트 로드
const Main = lazy(() => import("../pages/main"));
const Reserve = lazy(() => import("../pages/reservation"));
const BuffetInfo = lazy(() => import("../pages/buffetinfo"));
const UserList = lazy(() => import("../pages/userlist"));
const NoticeBoard = lazy(() => import("../pages/board/notice/noticeBoard"));
const Create = lazy(() => import("../pages/board/notice/create"));
const NoticeModify = lazy(() => import("../pages/board/notice/noticeModify"))
const FreeBoard = lazy(() => import("../pages/board/free/freeBoard"))
const FreeCreate = lazy(() => import("../pages/board/free/freeCreate"))
const FreeModify = lazy(() => import("../pages/board/free/freeModify"))




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
},
{
  path: "freeBoard",
  element: <Suspense fallback={Loading}><FreeBoard/></Suspense>
},
{
  path: "freeCreate",
  element: <Suspense fallback={Loading}><FreeCreate/></Suspense>
},
{
  path: "freeModify/:ftNb",
  element: <Suspense fallback={Loading}><FreeModify/></Suspense>
}

];

export default adminRouter;
