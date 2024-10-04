import BuffetinfoPage from "../page/buffetinfo/BuffetinfoPage"; // 뷔페 정보 페이지 컴포넌트 가져오기

// buffetinfoRouter: 뷔페 정보 관련 라우트를 정의하는 함수
const buffetinfoRouter = () => {
  return [
    {
      path: "", // 기본 경로 (뷔페 정보 메인)
      element: <BuffetinfoPage />, // 뷔페정보 페이지를 렌더링
    },
  ];
};

export default buffetinfoRouter; // buffetinfoRouter 함수를 다른 파일에서 사용할 수 있도록 내보냄
