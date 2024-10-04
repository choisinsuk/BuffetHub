import BuffetinfoPage from "../page/buffetinfo/BuffetinfoPage";

const buffetinfoRouter = () => {
  return [
    {
      path: "",
      element: <BuffetinfoPage />, // 뷔페정보 페이지를 렌더링
    },
  ];
};

export default buffetinfoRouter;
