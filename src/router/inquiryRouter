import InquiryListPage from "../page/inquiry/InquiryListPage";
import AddInquiry from "../page/inquiry/AddInquiry";
import InquiryModify from "../page/inquiry/InquiryModify";

export default function inquiryRouter() {
  return [
    {
      path: "list", // 고객 문의 목록 경로
      element: <InquiryListPage />,
    },
    {
      path: "create", // 고객 문의 작성 경로
      element: <AddInquiry />,
    },
    {
      path: "modify/:cqNb", // 고객 문의 수정 경로
      element: <InquiryModify />,
    },
  ];
}
