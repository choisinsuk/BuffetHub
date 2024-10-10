import MyPagePage from "../page/mypage/MyPage"; // 마이 페이지 컴포넌트 가져오기

// mypageRouter: 마이 페이지 관련 라우트를 정의하는 함수
const mypageRouter = () => {
  return [
    {
      path: "", // 기본 경로 (마이 페이지 메인)
      element: <MyPagePage />, // 마이 페이지를 렌더링
    },
  ];
};

export default mypageRouter; // mypageRouter 함수를 다른 파일에서 사용할 수 있도록 내보냄
