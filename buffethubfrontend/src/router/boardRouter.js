import BoardPage from "../page/board/BoardPage"; // 게시판 페이지 컴포넌트 가져오기

// boardRouter: 게시판 관련 라우트를 정의하는 함수
const boardRouter = () => {
  return [
    {
      path: "", // 기본 경로 (게시판 메인)
      element: <BoardPage />, // 게시판 페이지를 렌더링
    },
  ];
};

export default boardRouter; // boardRouter 함수를 다른 파일에서 사용할 수 있도록 내보냄
