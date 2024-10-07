// Suspense, lazy는 비동기적 컴포넌트를 로드할 때 사용된다 */
import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter";
//브라우저 기반의 라우터를 생성하는 함수
const { createBrowserRouter } = require("react-router-dom");

//페이지가 로드 되는 동안 표시할 로딩 메시지를 정의
const Loading = <div>Loading....</div>;

//비동기적 메인 페이지 로드
const Main = lazy(() => import("../pages/main"));
const Notice = lazy(() => import("../pages/board/Notice/Notice"));
const UserInquiries = lazy(() => import("../pages/board/UserInquiries/UserInquiries"));
const ReviewBoard = lazy(() => import("../pages/board/review/ReviewBoard"));
const TodoIndex = lazy(() => import("../pages/todo/Indexpage"));
const Make = lazy(() => import("../pages/board/Make"));
const Answer = lazy(() => import("../pages/board/Answer"));

const Reserve = lazy(() => import("../pages/reservation"))
const BuffetInfo = lazy(() => import("../pages/buffetinfo"))
const UserList = lazy(() => import("../pages/userlist"))
const Inquiry = lazy(() => import("../pages/board/Inquiry"))

const root = createBrowserRouter([
  {
    path: "",
    element:<Suspense fallback={Loading}><Main /></Suspense>
  },
  
  {
    path: "/reserve",
    element: <Suspense fallback={Loading}><Reserve/></Suspense>
  },

  {
    path: "/infoManager",
    element: <Suspense fallback={Loading}><BuffetInfo/></Suspense>
  },

  {
    path: "/userManager",
    element: <Suspense fallback={Loading}><UserList/></Suspense>
    },

  {
    path: "notice",
    element:<Suspense fallback={Loading}><Notice /></Suspense>
  },

  {
    path: "UserInquiries",
    element:<Suspense fallback={Loading}><UserInquiries /></Suspense>
  },

  {
    path: "reviewBoard",
    element:  <Suspense fallback={Loading}><ReviewBoard /></Suspense>
  },

  {
    path: "todo",
    element: 
      <Suspense fallback={Loading}>
        <TodoIndex />
      </Suspense>,
    children: todoRouter()
  },
  {
    path: "make",
    element: 
      <Suspense fallback={Loading}>
        <Make />
      </Suspense>
  },
  {
    path: "answer",
    element: 
      <Suspense fallback={Loading}>
        <Answer />
      </Suspense>
  },
  {
    path: "inquiry",
    element: 
      <Suspense fallback={Loading}>
        <Inquiry />
      </Suspense>
  },
  
])

//라우터 내보내기
export default root;
