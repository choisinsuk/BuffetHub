import { lazy, Suspense } from "react";
import MyPage from "../page/mypage/MyPage"; // 마이 페이지 컴포넌트 가져오기
import ChangePasswordComponent from "../component/mypage/ChangePasswordComponent.js";

const Loading = <div>Loading...</div>;
const MyReserve = lazy(() => import("../component/reserve/MyReserveComponent.js")); // 예약 페이지 컴포넌트
const UserModifyComponent = lazy(() =>
  import("../component/mypage/UserModifyComponent.js")
); // 내 정보 관리 컴포넌트 가져오기

// mypageRouter: 마이 페이지 관련 라우트를 정의하는 함수
const mypageRouter = () => {
  return [
    {
      path: "", // 기본 경로 (마이 페이지 메인)
      element: <MyPage />, // 마이 페이지를 렌더링
      children: [
        // 자식 경로 정의
        {
          path: "myreservations", // 내 예약 경로
          element: (
            <Suspense fallback={Loading}>
              <MyReserve />
            </Suspense>
          ),
        },
        {
          path: "userinfo", // 내 정보 관리 경로
          element: (
            <Suspense fallback={Loading}>
              <UserModifyComponent />
            </Suspense>
          ),
        },
        {
          path: "change-password", // 내 정보 관리 경로
          element: (
            <Suspense fallback={Loading}>
              <ChangePasswordComponent />
            </Suspense>
          ),
        },
      ],
    },
  ];
};

export default mypageRouter; // mypageRouter 함수를 다른 파일에서 사용할 수 있도록 내보냄
