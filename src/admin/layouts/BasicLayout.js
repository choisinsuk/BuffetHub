import { useNavigate } from "react-router-dom"; // useNavigate 훅 가져오기
import BasicMenu from "../components/menu/BasicMenu"; // 기본 메뉴 컴포넌트 가져오기
import ReviewList from "../pages/board/review/ReviewList";
import InquiriesList from "../pages/board/UserInquiries/InquiriesList"

// BasicLayout 컴포넌트 정의
const BasicLayout = ({ children }) => {
  // 페이지 간 이동을 위한 useNavigate 훅 사용
  const navigate = useNavigate();

  // 예약 리스트를 보여주는 함수
  const handleToReserve = () => {
    navigate("/Reserve")
  };
  // 공지사항 관리 페이지로 이동하는 함수
  const handleGoToNotice = () => {
    navigate("/Notice");
  };

  const handleGoToReview = () => {
    navigate("/reviewBoard");
  };

  const handleGoToInqiries = () => {
    navigate("/Notice");
  };
  return (
    <>
      {/* 상단 메뉴 컴포넌트 */}
      <BasicMenu />

      {/* 메인 콘텐츠 컨테이너 */}
      <div className="bg-white my-5 w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 px-8 md:px-12 pb-8">
        {/* 메인 페이지 환영 메시지 */}
        <main className="bg-customColor2 w-full px-3 py-20 rounded-lg flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold text-center">
            관리자로 로그인하셨습니다.
            <br />
            어서오세요
          </h1>
        </main>
      </div>

      {/* 버튼 컨테이너 */}
      <div className="container mx-auto mt-5 mb-20 w-full">
        {/* 예약 리스트 확인 버튼 */}
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-customColor3 text-white font-bold w-full rounded-lg p-4 border border-solid border-neutral-100 text-xl"
            onClick={handleToReserve}
          >
            예약 리스트 확인
          </button>
        </div>

        {/* 공지사항 작성 버튼 */}
        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="bg-customColor3 text-white font-bold w-full rounded-lg p-4 border border-solid border-neutral-100 text-xl"
            onClick={handleGoToNotice}
          >
            공지사항 작성
          </button>
        </div>

        {/* 페이지 미리보기 (iframe) */}
        <div className="flex justify-center space-x-4 mt-10">
          {/* 왼쪽 iframe 미리보기 */}
          <div className="w-1/2 text-center">
            <h2 className="text-center">후기 게시판 미리보기</h2>
            <ReviewList />
            <button
            type="button"
            className="bg-customColor3 text-white font-bold w-full 
            rounded-lg p-4 border border-solid border-neutral-100 text-xl mt-2"
            onClick={handleGoToReview}
          >후기 게시판 바로가기</button>
          </div>

          {/* 오른쪽 iframe 미리보기 */}
          <div className="w-1/2 text-center">
            <h2 className="text-center">사용자 문의 미리보기</h2>
            <InquiriesList />
            <button type="button"
            className="bg-customColor3 text-white font-bold w-full 
            rounded-lg p-4 border border-solid border-neutral-100 text-xl mt-2"
            onClick={handleGoToInqiries}
          >문의 게시판 바로가기</button>
          </div>
        </div>
      </div>
    </>
  );
};

// 컴포넌트 내보내기
export default BasicLayout;
