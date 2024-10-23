import { Navigate } from "react-router-dom";
import { getUserAuthCode } from "../../util/cookieUtil";

const PrivateRoute = ({ children, requiredRole }) => {
  const userAuthCode = getUserAuthCode(); // 쿠키에서 urAuthCode 추출

  // 비로그인 사용자일 경우
  if (!userAuthCode) {
    return <Navigate to="/user/login" />;
  }

  // 관리자가 필요한 페이지인데 관리자가 아닐 경우
  if (requiredRole === "ADMIN" && userAuthCode !== "ADMIN") {
    return <Navigate to="/unauthorized" />; // 접근 거부 페이지로 리다이렉트
  }

  // 사용자가 필요한 페이지인데 일반 사용자가 아닐 경우
  if (requiredRole === "USER" && userAuthCode !== "USER") {
    return <Navigate to="/unauthorized" />; // 접근 거부 페이지로 리다이렉트
  }

  return children; // 조건을 만족할 경우 자식 컴포넌트 렌더링
};

export default PrivateRoute;
