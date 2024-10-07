import { lazy, Suspense } from "react";
import LogoutPage from "../page/user/LogoutPage";
import JoinPage from "../page/user/JoinPage";

const Loading = <div>Loading...</div>;
const Login = lazy(() => import("../page/user/LoginPage"));
const Myreserve = lazy(() => import("../page/reserve/MyReservePage"));

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
    {
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
  ];
};

export default userRouter;
