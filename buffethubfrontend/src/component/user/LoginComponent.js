import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login, loginPostAsync } from "../../slice/loginSlice";

const initState = {
  id: "",
  pw: "",
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = (e) => {
    dispatch(loginPostAsync(loginParam))
    .unwrap()
    .then(data => {
      console.log("after unwrap...")
      console.log(data)
    })
  };

  return (
    <>
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
              name="id"
              type={"text"}
              value={loginParam.id}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              placeholder="비밀번호"
              name="pw"
              type={"password"}
              value={loginParam.pw}
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
    </>
  );
};

export default LoginComponent;
