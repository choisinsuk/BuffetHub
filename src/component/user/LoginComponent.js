import { useState } from "react";
import { Link } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getCookie } from "../../util/cookieUtil";
import KakaoLoginComponent from "./KakaoLoginComponent";

const initState = {
  username: "",
  password: "",
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });

  const { doLogin, moveToPath } = useCustomLogin();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = (e) => {
    doLogin(loginParam) //loginSlice 비동기 호출
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert("아이디과 패스워드를 다시 확인하세요");
        } else {
          // 사용자 역할 확인
          const userRole = data.urAuthCode; // 여기서 'role'은 서버에서 반환된 사용자 역할입니다.

          // accessToken과 refreshToken 저장
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          console.log("AccessToken", data.accessToken)
          console.log("로그인 성공, 쿠키 확인: ", getCookie("user"));

          // 사용자 역할에 따라 리다이렉션 경로 설정
          if (userRole === "ADMIN") {
            moveToPath("/admin"); // 관리자 페이지로 이동
          } else {
            moveToPath("/"); // 일반 사용자 메인 페이지로 이동
          }
        }
      });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">
          로그인
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            placeholder="아이디"
            name="username"
            type={"text"}
            value={loginParam.username}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            placeholder="비밀번호"
            name="password"
            type={"password"}
            value={loginParam.password}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full justify-center">
          <div className="w-4/5 p-6 flex justify-center font-bold">
            <button
              className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
              onClick={handleClickLogin}
            >
              로그인
            </button>
          </div>
        </div>
      </div>

      <div className="w-4/5">
        <ul className="flex p-4 text-white font-bold">
          <li className="pr-6 text-2xl text-gray-500">
            <Link to={"/user/search/id"}>아이디 찾기</Link>
          </li>
          <li className="pr-6 text-2xl text-gray-500">
            <Link to={"/user/search/password"}>비밀번호 찾기</Link>
          </li>
          <li className="pr-6 text-2xl text-gray-500">
            <Link to={"/user/register"}>회원가입</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex p-4 text-white font-bold">
          <li className="pr-6 text-2xl text-gray-500">
            <KakaoLoginComponent />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoginComponent;
