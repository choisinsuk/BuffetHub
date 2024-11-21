import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getUserWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slice/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");
  const dispatch = useDispatch()
  const {moveToPath} = useCustomLogin();

  useEffect(() => {
    getAccessToken(authCode).then((accessToken) => {
      console.log(accessToken);
      getUserWithAccessToken(accessToken).then((userInfo) => {
        console.log("------------------------");
        console.log(userInfo);

        dispatch(login(userInfo))

        //소셜 회원이 아니라면
        if(userInfo && !userInfo.social) {
          moveToPath("/")
        } else {
          moveToPath("/mypage/userinfo")
        }
      });
    });
  }, [authCode]);

  return (
    <div>
      <div>Kakao Login Redirect</div>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
