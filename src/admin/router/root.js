import { Suspense, lazy } from "react";

//브라우저 기반의 라우터를 생성하는 함수
const { createBrowserRouter } = require("react-router-dom");

//페이지가 로드 되는 동안 표시할 로딩 메시지를 정의
const Loading = <div>Loading....</div>;

//비동기적 메인 페이지 로드
const Main = lazy(() => import("../pages/main"));
const Reserve = lazy(() => import("../pages/reservation"))
const BuffetInfo = lazy(() => import("../pages/buffetinfo"))
const UserList = lazy(() => import("../pages/userlist"))
const NoticeBoard = lazy(() => import("../pages/board/NoticeBoard"))

const root = createBrowserRouter([
  {
    path: "/admin",
    element:<Suspense fallback={Loading}><Main /></Suspense>
  },
  
  {
    path: "/admin/reserve",
    element: <Suspense fallback={Loading}><Reserve/></Suspense>
  },

  {
    path: "/admin/infoManager",
    element: <Suspense fallback={Loading}><BuffetInfo/></Suspense>
  },

  {
    path: "/admin/userManager",
    element: <Suspense fallback={Loading}><UserList/></Suspense>
  },

  {
    path: "/admin/noticeBoard",
    element: <Suspense fallback={Loading}><NoticeBoard/></Suspense>
  }
])

//라우터 내보내기
export default root;