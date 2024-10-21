import { Suspense, lazy } from "react"; // lazy와 Suspense를 사용해 비동기적으로 컴포넌트를 로드
import userRouter from "./userRouter.js"; // 사용자 관련 라우터 임포트
import reserveRouter from "./reserveRouter.js"; // 예약 관련 라우터 임포트
import buffetinfoRouter from "./buffetinfoRouter"; // 뷔페 정보 관련 라우터 임포트
import boardRouter from "./boardRouter.js"; // 게시판 관련 라우터 임포트
import mypageRouter from "./mypageRouter.js"; // 마이페이지 관련 라우터 임포트
import noticeRouter from "./noticeRouter.js"; // 공지사항 관련 라우터 임포트

const { createBrowserRouter } = require("react-router-dom"); // react-router-dom에서 createBrowserRouter를 임포트

const Loading = <div>Loading...</div>; // 로딩 중 표시할 컴포넌트

// 비동기적 페이지 컴포넌트 로딩
const Main = lazy(() => import("../admin/pages/main.js"));
const Reserve = lazy(() => import("../admin/pages/reservation.js"));
const BuffetInfo = lazy(() => import("../admin/pages/buffetinfo.js"));
const UserList = lazy(() => import("../admin/pages/userlist.js"));
const NoticeBoard = lazy(() => import("../admin/pages/board/NoticeBoard.js"));

// 브라우저 라우터를 생성
const root = createBrowserRouter([
  {
    path: "", // 기본 경로
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "mypage", // 마이페이지 경로
    children: mypageRouter(), // mypageRouter에서 자식 라우터를 가져옴
  },
  {
    path: "board", // 게시판 경로
    children: boardRouter(), // boardRouter에서 자식 라우터를 가져옴
  },
  {
    path: "buffetinfo", // 뷔페 정보 경로
    children: buffetinfoRouter(), // buffetinfoRouter에서 자식 라우터를 가져옴
  },
  {
    path: "reserve", // 예약 경로
    children: reserveRouter(), // reserveRouter에서 자식 라우터를 가져옴
  },
  {
    path: "user", // 사용자 관련 경로
    children: userRouter(), // userRouter에서 자식 라우터를 가져옴
  },
  {
    path: "notices", // 공지사항 경로
    children: noticeRouter(), // noticeRouter에서 자식 라우터를 가져옴
  },
  {
    path: "/admin", // 관리자 메인 경로
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "/admin/reserve", // 관리자 예약 경로
    element: (
      <Suspense fallback={Loading}>
        <Reserve />
      </Suspense>
    ),
  },
  {
    path: "/admin/infoManager", // 관리자 뷔페 정보 경로
    element: (
      <Suspense fallback={Loading}>
        <BuffetInfo />
      </Suspense>
    ),
  },
  {
    path: "/admin/userManager", // 관리자 사용자 관리 경로
    element: (
      <Suspense fallback={Loading}>
        <UserList />
      </Suspense>
    ),
  },
  {
    path: "/admin/noticeBoard", // 관리자 공지사항 게시판 경로
    element: (
      <Suspense fallback={Loading}>
        <NoticeBoard />
      </Suspense>
    ),
  },
]);

export default root; // root 라우터를 기본으로 내보냄
