import React, { useState } from "react";
import { findUserId } from "../../api/userApi"; // userApi에서 findUserId 함수를 임포트합니다.

const SearchIdComponent = () => {
  const [searchParam, setSearchParam] = useState({
    name: "",
    email: "",
  });
  const [userId, setUserId] = useState(null); // 아이디를 저장할 상태를 추가합니다.
  const [error, setError] = useState(""); // 에러 메시지를 저장할 상태를 추가합니다.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParam((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      const id = await findUserId(searchParam.name, searchParam.email);
      setUserId(id); // 성공적으로 아이디를 찾았으면 상태를 업데이트합니다.
      setError(""); // 에러를 초기화합니다.
    } catch (error) {
      setUserId(null); // 아이디를 찾지 못했으면 상태를 초기화합니다.
      setError("아이디를 찾을 수 없습니다. 성함과 이메일을 확인하세요."); // 에러 메시지를 설정합니다.
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">
          아이디 찾기
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            placeholder="성함"
            name="name"
            type="text"
            value={searchParam.name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            placeholder="이메일"
            name="email"
            type="email"
            value={searchParam.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full justify-center">
          <div className="w-4/5 p-6 flex justify-center font-bold">
            <button
              className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
              onClick={handleSearch}
            >
              아이디 찾기
            </button>
          </div>
        </div>
      </div>
      {userId && (
        <div className="text-center text-green-600">
          회원님의 아이디는 [ {userId} ] 입니다.
         </div>
      )}
      {error && (
        <div className="text-center text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchIdComponent;
