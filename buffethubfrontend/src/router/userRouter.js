import { lazy, Suspense } from "react";
import JoinPage from "../page/user/JoinPage";
import SearchPage from "../page/user/SearchPage";

const Loading = <div>Loading...</div>;
const Login = lazy(() => import("../page/user/LoginPage"));
const Myreserve = lazy(() => import("../page/reserve/MyReservePage"));
const KakaoRedirect = lazy(() => import("../page/user/KakaoRedirectPage"))

const userRouter = () => {
  return [
    {
      path: "login",
      element: (
        <Suspense fallback={Loading}>
          <Login />
        </Suspense>
      ),
    },
    { // 예약 리스트를 보여주는 페이지
      path: "myreserve",
      element: (
        <Suspense fallback={Loading}>
          <Myreserve />
        </Suspense>
      ),
    },
    {
      path: "register",
      element: (
        <Suspense fallback={Loading}>
          <JoinPage />
        </Suspense>
      ),
    },
    {
      path: "search/*", // SearchPage의 경로 설정
      element: (
        <Suspense fallback={Loading}>
          <SearchPage />
        </Suspense>
      ),
    },
    {
      path: "kakao",
      element: (
        <Suspense fallback={Loading}>
          <KakaoRedirect />
        </Suspense>
      ),
    },
  ];
};

export default userRouter;
