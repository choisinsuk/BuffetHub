import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;
const Reserve = lazy(() => import("../page/reserve/ReservePage"));
const MakeReserve = lazy(() => import("../page/reserve/MakeReservePage"))
const ChangeReserve = lazy(() => import("../page/reserve/ChangeReservePage"))
const ModifyReserve = lazy(() => import("../page/reserve/ModifyReservePage"))

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
    {
      path: "makereserve",
      element: <Suspense fallback={Loading}>
        <MakeReserve/>
      </Suspense>
    },
    {
      path: "changereserve",
      element: <Suspense fallback={Loading}>
        <ChangeReserve/>
      </Suspense>
    },
    {
      path: "modifyreserve",
      element: <Suspense fallback={Loading}>
        <ModifyReserve/>
      </Suspense>
    }
    
  ];
};

export default reserveRouter;
