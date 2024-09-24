import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;
const Reserve = lazy(() => import("../page/reserve/ReservePage"));

const reserveRouter = () => {
  return [
    {
      path: "",
      element: (
        <Suspense fallback={Loading}>
          <Reserve />
        </Suspense>
      ),
    },
  ];
};

export default reserveRouter;
