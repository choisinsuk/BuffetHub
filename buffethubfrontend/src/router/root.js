import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../pages/MainPage"));
const Reserve = lazy(() => import("../pages/reserve/ReservePage"));

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
    path: "reserve",
    element: (
      <Suspense fallback={Loading}>
        <Reserve />
      </Suspense>
    ),
  },
]);

export default root;
