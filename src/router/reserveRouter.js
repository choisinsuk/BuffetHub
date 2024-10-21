import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;
const Reserve = lazy(() => import("../page/reserve/ReservePage"));
const Regist = lazy(() => import("../page/reserve/RegistPage"))
const List = lazy(() => import("../page/reserve/ListPage"))
const Modify = lazy(() => import("../page/reserve/ModifyPage"))

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
      path: "regist",
      element: <Suspense fallback={Loading}>
        <Regist/>
      </Suspense>
    },
    { // 예약 리스트 페이지(list)
      path: "list",
      element: <Suspense fallback={Loading}>
        <List/>
      </Suspense>
    },
    { // 예약 수정 페이지(modify)
      path: "modify/:rsNb",
      element: <Suspense fallback={Loading}>
        <Modify/>
      </Suspense>
    }
    
  ];
};

export default reserveRouter;
