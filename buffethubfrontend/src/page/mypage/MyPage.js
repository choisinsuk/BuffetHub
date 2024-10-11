import { Link } from "react-router-dom";
import ReserveLayout from "../../layouts/ReserveLayout";

const MyPage = () => {
  const asideContent = (
    <div>
      <h2 style={{ fontWeight: "bold" }}>마이페이지</h2> {/* 굵은 글씨로 제목 설정 */}
      <ul>
        <li style={{ margin: "10px 0" }}> 
          <span>- </span> 
          <Link to="/mypage/myreservations">내 예약</Link> {/* 내 예약 링크 */}
        </li>
        <li style={{ margin: "10px 0" }}> 
          <span>- </span> 
          <Link to="/mypage/userinfo">내 정보 수정</Link> {/* 내 정보 수정 링크 */}
        </li>
      </ul>
    </div>
  );

  return (
    <ReserveLayout asideContent={asideContent}></ReserveLayout>
  );
};

export default MyPage;