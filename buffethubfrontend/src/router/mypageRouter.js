import MyPagePage from "../page/mypage/MyPage";

const mypageRouter = () => {
  return [
    {
      path: "",
      element: <MyPagePage />, // 마이 페이지를 렌더링
    },
  ];
};

export default mypageRouter;
