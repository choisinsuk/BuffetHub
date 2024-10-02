// Suspense, lazy는 비동기적 컴포넌트를 로드할 때 사용된다 */
import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter";
//브라우저 기반의 라우터를 생성하는 함수
const { createBrowserRouter } = require("react-router-dom");

//페이지가 로드 되는 동안 표시할 로딩 메시지를 정의
const Loading = <div>Loading....</div>;

//비동기적 메인 페이지 로드
const Main = lazy(() => import("../pages/main"));
const About = lazy(() => import("../pages/about"));
const Notice = lazy(() => import("../pages/board/Notice"));
const CustomErinquiry = lazy(() => import("../pages/board/CustomErinquiry"));
const ReviewBoard = lazy(() => import("../pages/board/ReviewBoard"));
const TodoIndex = lazy(() => import("../pages/todo/Indexpage")); //todo 이하 메뉴에서 필요한 하위 메뉴를 보여주고 페이지들의 화면을 보여주는 아웃렛 설정
//중첩적으로 라우팅이 적용될 때 기존 컴포넌트의 구조 유지
// const TodoList = lazy(() => import("../pages/todo/ListPage")); 페이지 주소 안바끼고 다른 페이지로 넘어감
//라우터 설정
const Make = lazy(() => import("../pages/board/Make"));
const Answer = lazy(() => import("../pages/board/Answer"));

const root = createBrowserRouter([
  {
    /*경로가 빈 문자열인 경우, Suspense 컴포넌트를 사용하여 Main컴포넌트를 로드한다.*/

    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },

  {
    path: "about",
    element: (
      <Suspense fallback={Loading}>
        <About />
      </Suspense>
    ),
  },

  {
    path: "notice",
    element: (
      <Suspense fallback={Loading}>
        <Notice />
      </Suspense>
    ),
  },

  {
    path: "customErinquiry",
    element: (
      <Suspense fallback={Loading}>
        <CustomErinquiry />
      </Suspense>
    ),
  },

  {
    path: "reviewBoard",
    element: (
      <Suspense fallback={Loading}>
        <ReviewBoard />
      </Suspense>
    ),
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
])

//라우터 내보내기
export default root;
