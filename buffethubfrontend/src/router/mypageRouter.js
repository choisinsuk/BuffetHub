import { lazy, Suspense } from "react";
import MyPagePage from "../page/mypage/MyPage"; // 마이 페이지 컴포넌트 가져오기
const Loading = <div>Loading...</div>;
const Myreserve = lazy(() => import("../page/reserve/MyReservePage"));

// mypageRouter: 마이 페이지 관련 라우트를 정의하는 함수
const mypageRouter = () => {
  return [
    {
      path: "", // 기본 경로 (마이 페이지 메인)
      element: <MyPagePage />, // 마이 페이지를 렌더링
    },
    { // 예약 리스트를 보여주는 페이지
      path: "myreserve",
      element: (
        <Suspense fallback={Loading}>
          <Myreserve />
        </Suspense>
      ),
    },
  ];
};

export default mypageRouter; // mypageRouter 함수를 다른 파일에서 사용할 수 있도록 내보냄
