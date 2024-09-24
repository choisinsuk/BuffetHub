import { lazy, Suspense } from "react";
import LogoutPage from "../page/user/LogoutPage";

const Loading = <div>Loading...</div>;
const Login = lazy(() => import("../page/user/LoginPage"));

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
  ];
};

export default userRouter;
