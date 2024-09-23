import { lazy, Suspense } from "react";
import userRouter from "./userRouter.js";

import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../page/user/MainPage.js"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "user",
    children: userRouter(),
  },
]);

export default root;
