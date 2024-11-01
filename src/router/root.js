import { lazy, Suspense } from "react";  
import userRouter from "./userRouter.js";  // 사용자 관련 라우터 임포트
import reserveRouter from "./reserveRouter.js";  // 예약 관련 라우터 임포트
import buffetinfoRouter from "./buffetinfoRouter";  // 뷔페 정보 관련 라우터 임포트
import mypageRouter from "./mypageRouter.js";  // 마이페이지 관련 라우터 임포트 
import adminRouter from "../admin/router/root.js";  // 관리자 페이지 라우터 임포트
import SuccessPage from "../page/SuccessPage.js";  // 결제 완료 페이지 임포트

const { createBrowserRouter } = require("react-router-dom");  // react-router-dom에서 createBrowserRouter 임포트

// 로딩 중 표시할 컴포넌트 정의
const Loading = <div>Loading...</div>;  

// 메인 컴포넌트를 lazy 로딩 방식으로 설정
const Main = lazy(() => import("../page/MainPage.js"));  

// 공지사항 리스트 페이지 컴포넌트를 lazy 로딩 방식으로 설정
const NoticeBoard = lazy(() => import("../page/board/notice/NoticeBoard.js"));  

// 고객 문의 리스트, 추가, 수정 페이지 컴포넌트를 lazy 로딩 방식으로 설정
const InquiryList = lazy(() => import("../page/board/inquiry/InquiryListPage.js"));  
const InquiryAddPage = lazy(() => import("../page/board/inquiry/InquiryAddPage.js"));  
const InquiryModifyPage = lazy(() => import("../page/board/inquiry/InquiryModifyPage.js"));  

// 브라우저 라우터 설정
const root = createBrowserRouter([
  {   
    path: "",  // 기본 경로
    element: ( 
      <Suspense fallback={Loading}> {/* 페이지 로딩 중 로딩 컴포넌트 표시 */}
        <Main />  {/* 메인 페이지 렌더링 */}
      </Suspense>
    ),
  },
  {   
    path: "success",  // 결제 완료 경로
    element: (
      <Suspense fallback={Loading}> {/* 로딩 중 로딩 컴포넌트 표시 */}
        <SuccessPage />  {/* 결제 완료 페이지 렌더링 */}
      </Suspense>
    ),
  },
  {   
    path: "mypage",  // 마이페이지 경로
    children: mypageRouter(),  // mypageRouter에서 자식 라우터 설정 가져오기
  },
  {   
    path: "buffetinfo",  // 뷔페 정보 경로
    children: buffetinfoRouter(),  // buffetinfoRouter에서 자식 라우터 설정 가져오기
  },
  {   
    path: "reserve",  // 예약 관련 경로
    children: reserveRouter(),  // reserveRouter에서 자식 라우터 설정 가져오기
  },
  {   
    path: "user",  // 사용자 관련 경로
    children: userRouter(),  // userRouter에서 자식 라우터 설정 가져오기
  },
  {   
    path: "admin",  // 관리자 페이지 경로
    children: adminRouter(),  // adminRouter에서 자식 라우터 설정 가져오기
  },
  {   
    path: "board",  // 공지사항 리스트 경로
    element: (
      <Suspense fallback={Loading}> {/* 로딩 중 로딩 컴포넌트 표시 */}
        <NoticeBoard />  {/* 공지사항 리스트 페이지 렌더링 */}
      </Suspense>
    ),
  },
  {   
    path: "inquiry",  // 고객 문의 리스트 경로
    element: (
      <Suspense fallback={Loading}> {/* 로딩 중 로딩 컴포넌트 표시 */}
        <InquiryList />  {/* 고객 문의 리스트 페이지 렌더링 */}
      </Suspense>
    ),
  },
  {   
    path: "inquiry/add", // 새로운 고객 문의 작성 페이지 경로
    element: (
      <Suspense fallback={Loading}> {/* 로딩 중 로딩 컴포넌트 표시 */}
        <InquiryAddPage />  {/* 고객 문의 추가 페이지 렌더링 */}
      </Suspense>
    ),
  },
  {   
    path: "inquiry/modify/:cqNb", // 기존 고객 문의 수정 페이지 경로
    element: (
      <Suspense fallback={Loading}> {/* 로딩 중 로딩 컴포넌트 표시 */}
        <InquiryModifyPage />  {/* 고객 문의 수정 페이지 렌더링 */}
      </Suspense>
    ),
  },
]);

export default root; // 라우터 설정을 외부에서 사용할 수 있도록 내보내기
