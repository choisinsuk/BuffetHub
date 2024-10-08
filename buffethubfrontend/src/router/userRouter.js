import { lazy, Suspense } from "react";
import LogoutPage from "../page/user/LogoutPage";

const Loading = <div>Loading...</div>;
const Login = lazy(() => import("../page/user/LoginPage"));
const Myreserve = lazy(() => import("../page/reserve/MyReservePage"))

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
    {
      path: "logout",
      element: (
        <Suspense fallback={Loading}>
          <LogoutPage></LogoutPage>
        </Suspense>
      ),
    },
    { // 예약 리스트를 보여주는 페이지
      path: "myreserve",
      element: (
        <Suspense fallback={Loading}>
          <Myreserve/>
        </Suspense>
      )
    }
  ];
};

export default userRouter;
