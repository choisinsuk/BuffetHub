import { useState } from "react";
import { Link } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getCookie } from "../../util/cookieUtil";

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
          alert("이메일과 패스워드를 다시 확인하세요");
        } else {
          // alert("로그인 성공");
          console.log("로그인 성공, 쿠키 확인: ", getCookie("user"));
          moveToPath(-1);
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
            <Link to={"/searchId"}>아이디 찾기</Link>
          </li>
          <li className="pr-6 text-2xl text-gray-500">
            <Link to={"/searchPw"}>비밀번호</Link>
          </li>
          <li className="pr-6 text-2xl text-gray-500">
            <Link to={"/register"}>회원가입</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoginComponent;
