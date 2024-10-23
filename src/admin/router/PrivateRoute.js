import { Navigate, Outlet } from "react-router-dom";
import { getUserAuthCodeFromToken } from "../../util/cookieUtil";

const PrivateRoute = () => {
  const userAuthCode = getUserAuthCodeFromToken();

  // userAuthCode가 "ADMIN"일 때만 하위 경로로 이동
  return userAuthCode === "ADMIN" ? <Outlet /> : <Navigate to="/error" />;
};

export default PrivateRoute;
