import { lazy, Suspense } from "react";
import PrivateRoute from "./PrivateRoute";

// 페이지가 로드되는 동안 표시할 로딩 메시지를 정의
const Loading = <div>Loading....</div>;

// 비동기적 컴포넌트 로드
const Main = lazy(() => import("../pages/main"));
const Reserve = lazy(() => import("../pages/reservation"));
const BuffetInfo = lazy(() => import("../pages/buffetinfo"));
const UserList = lazy(() => import("../pages/userlist"));
const NoticeBoard = lazy(() => import("../pages/board/NoticeBoard"));

const adminRouter = () => [
  {
    path: "", // 기본 경로는 /admin 자체
    element: <PrivateRoute />, // PrivateRoute가 부모로 동작
    children: [  // Outlet을 통해 자식 컴포넌트 렌더링
      {
        path: "", // 기본 경로는 메인 페이지
        element: (
          <Suspense fallback={Loading}>
            <Main />
          </Suspense>
        ),
      },
      {
        path: "reserve", // 상대 경로
        element: (
          <Suspense fallback={Loading}>
            <Reserve />
          </Suspense>
        ),
      },
      {
        path: "infoManager", // 상대 경로
        element: (
          <Suspense fallback={Loading}>
            <BuffetInfo />
          </Suspense>
        ),
      },
      {
        path: "userManager", // 상대 경로
        element: (
          <Suspense fallback={Loading}>
            <UserList />
          </Suspense>
        ),
      },
      {
        path: "noticeBoard", // 상대 경로
        element: (
          <Suspense fallback={Loading}>
            <NoticeBoard />
          </Suspense>
        ),
      },
    ],
  },
];

export default adminRouter;
