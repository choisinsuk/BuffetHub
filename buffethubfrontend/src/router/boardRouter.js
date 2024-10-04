import BoardPage from "../page/board/BoardPage";

const boardRouter = () => {
  return [
    {
      path: "",
      element: <BoardPage />, // 게시판 페이지를 렌더링
    },
  ];
};

export default boardRouter;
