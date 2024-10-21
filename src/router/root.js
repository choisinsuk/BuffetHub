import { lazy, Suspense } from "react"; // lazy와 Suspense를 사용해 비동기적으로 컴포넌트를 로드
import userRouter from "./userRouter.js"; // 사용자 관련 라우터 임포트
import reserveRouter from "./reserveRouter.js"; // 예약 관련 라우터 임포트
import buffetinfoRouter from "./buffetinfoRouter"; // 뷔페 정보 관련 라우터 임포트
import boardRouter from "./boardRouter.js"; // 게시판 관련 라우터 임포트
import mypageRouter from "./mypageRouter.js"; // 마이페이지 관련 라우터 임포트
import noticeRouter from "./noticeRouter.js"; // 공지사항 관련 라우터 임포트

// 관리자 라우터 임포트
import adminRouter from "../admin/router/root.js";
// 결제완료 페이지 임포트
import SuccessPage from "../page/SuccessPage.js";

const { createBrowserRouter } = require("react-router-dom"); // react-router-dom에서 createBrowserRouter를 임포트

const Loading = <div>Loading...</div>; // 로딩 중 표시할 컴포넌트

// Main 컴포넌트를 lazy 로딩으로 임포트
const Main = lazy(() => import("../page/MainPage.js"));

// 브라우저 라우터를 생성
const root = createBrowserRouter([
  {
    path: "", // 기본 경로
    element: (
      <Suspense fallback={Loading}> {/* 로딩 중일 때 Loading 컴포넌트를 보여줌 */}
        <Main /> {/* Main 컴포넌트를 렌더링 */}
      </Suspense>
    ),
  },
  { // 결제 성공 경로
    path: "success",
    element: <Suspense fallback={Loading}> {/* 로딩 중일 때 Loading 컴포넌트를 보여줌 */}
    <SuccessPage/> {/* SuccessPage 컴포넌트를 렌더링 */}
  </Suspense>
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
    path: "admin", // /admin 경로 추가
    children: adminRouter(), // adminRouter에서 자식 라우터를 가져옴
  }
]);

export default root;
