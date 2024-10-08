import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;
const Reserve = lazy(() => import("../page/reserve/ReservePage"));
const MakeReserve = lazy(() => import("../page/reserve/MakeReservePage"))
const ChangeReserve = lazy(() => import("../page/reserve/ChangeReservePage"))
const ModifyReserve = lazy(() => import("../page/reserve/ModifyReservePage"))

const reserveRouter = () => {
  return [
    {// 예약 전단계 페이지
      path: "",
      element: (
        <Suspense fallback={Loading}>   
          <Reserve />
        </Suspense>
      ),
    },
    { // 예약 페이지(register)
      path: "makereserve",
      element: <Suspense fallback={Loading}>
        <MakeReserve/>
      </Suspense>
    },
    { // 예약 리스트 페이지(list)
      path: "changereserve",
      element: <Suspense fallback={Loading}>
        <ChangeReserve/>
      </Suspense>
    },
    { // 예약 수정 페이지(modify)
      path: "modifyreserve/:rsNb",
      element: <Suspense fallback={Loading}>
        <ModifyReserve/>
      </Suspense>
    }
    
  ];
};

export default reserveRouter;
