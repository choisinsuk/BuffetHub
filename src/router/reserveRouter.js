import { lazy, Suspense } from "react";
import VisitStatusToggle from "../component/reserve/VisitStatusToggle";
import { useParams } from "react-router-dom";

const Loading = <div>Loading...</div>;
const Reserve = lazy(() => import("../page/reserve/ReservePage"));
const Regist = lazy(() => import("../page/reserve/RegistPage"))
const List = lazy(() => import("../page/reserve/ListPage"))
const Modify = lazy(() => import("../page/reserve/ModifyPage"))

// VisitStatusToggle을 사용할 때 rsNb를 전달하는 Wrapper 컴포넌트
const VisitStatusToggleWrapper = () => {
  const { rsNb } = useParams(); // URL 파라미터에서 rsNb 가져오기
  return <VisitStatusToggle rsNb={Number(rsNb)} initialVisitStatus={false} />; // 기본 방문 상태는 false로 설정
};
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
    },
    { // 방문 상태 변경 시 통계 테이블 업데이트 테스트
      path: "visit/:rsNb",
      element: <Suspense fallback={Loading}>
        <VisitStatusToggleWrapper/>
      </Suspense>

    }
    
  ];
};

export default reserveRouter;
