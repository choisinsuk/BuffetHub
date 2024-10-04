import { lazy, Suspense } from "react";
import userRouter from "./userRouter.js";
import reserveRouter from "./reserveRouter.js";
import buffetinfoRouter from "./buffetinfoRouter";
import boardRouter from "./boardRouter.js";
import mypageRouter from "./mypageRouter.js";


const { createBrowserRouter } = require("react-router-dom");

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
    path: "mypage",
    children: mypageRouter(),
  },
  {
    path: "board",
    children: boardRouter(),
  },
  {
    path: "buffetinfo",
    children: buffetinfoRouter(),
  },
  {
    path: "reserve",
    children: reserveRouter(),
  },
  {
    path: "user",
    children: userRouter(),
  },
]);

export default root;
