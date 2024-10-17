import { Link, Outlet, useLocation } from "react-router-dom";
import AsideSubPageLayout from "../../layouts/AsideSubPageLayout";

const MyPage = () => {

  const location = useLocation();

  const asideContent = (
    <div>
      <h2 style={{ fontWeight: "bold" }}>마이페이지</h2>{" "}
      {/* 굵은 글씨로 제목 설정 */}
      <ul>
        <li style={{ margin: "10px 0" }}>
          <span>- </span>
          <Link to="/mypage/myreservations" className={`cursor-pointer ${location.pathname === "/mypage/myreservations" ? "font-bold" : ""}`}>내 예약</Link> {/* 내 예약 링크 */}
        </li>
        <li style={{ margin: "10px 0" }}>
          <span>- </span>
          <Link to="/mypage/userinfo" className={`cursor-pointer ${location.pathname === "/mypage/userinfo" ? "font-bold" : ""}`}>내 정보 관리</Link>{" "}
          {/* 내 정보 수정 링크 */}
        </li>
      </ul>
    </div>
  );

  return (
    <AsideSubPageLayout asideContent={asideContent}>
      <Outlet /> {/* 자식 컴포넌트를 이곳에 렌더링 */}
    </AsideSubPageLayout>
  );
};

export default MyPage;
