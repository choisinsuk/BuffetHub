import React from "react";
import NoticePage from "../page/board/notices/NoticePage"; // 공지사항 페이지 컴포넌트 가져오기
import NoticeDetail from "../page/common/NoticeDetail"; // 공지사항 상세 페이지 컴포넌트 가져오기
import EditNotice from "../page/common/EditNotice"; // 공지사항 상세 수정 페이지 컴포넌트 가져오기


// noticeRouter: 공지사항 관련 라우트를 정의하는 함수
const NoticeRouter = () => {
  return [
    {
      path: "", // 공지사항 경로를 빈 문자열로 설정하여 /notices에서 NoticePage를 보여줌
      element: <NoticePage />, // 공지사항 페이지를 렌더링
    },
    {
      path: ":number", // 공지사항 번호에 따라 상세 페이지를 보여줌
      element: <NoticeDetail />, // 공지사항 상세 페이지를 렌더링
    },
    {
      path: "edit", // 수정 페이지 경로
      element: <EditNotice />, // 수정 페이지 컴포넌트
    },
  ];
};

export default NoticeRouter; // NoticeRouter 함수를 다른 파일에서 사용할 수 있도록 내보냄
