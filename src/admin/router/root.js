// Suspense, lazy는 비동기적 컴포넌트를 로드할 때 사용된다 */
import { Suspense, lazy } from "react";

//브라우저 기반의 라우터를 생성하는 함수
const { createBrowserRouter } = require("react-router-dom");

//페이지가 로드 되는 동안 표시할 로딩 메시지를 정의
const Loading = <div>Loading....</div>

//비동기적 메인 페이지 로드
const Main = lazy(() => import("../pages/main"))
const About = lazy(() => import("../pages/about"))

//라우터 설정
const root = createBrowserRouter([
  {
    /*경로가 빈 문자열인 경우, Suspense 컴포넌트를 사용하여 Main컴포넌트를 로드한다.*/

    path:"",
    element: <Suspense fallback = {Loading}><Main/></Suspense>
  },
  
  {
    path: "about",
    element: <Suspense fallback={Loading}><About/></Suspense>
    }
]);

//라우터 내보내기
export default root;