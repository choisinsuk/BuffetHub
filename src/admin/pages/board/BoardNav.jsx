import React from "react";
import { useNavigate } from "react-router-dom";

const BoardNav = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="mt-8 flex justify-center space-x-4">
      <button
        type="button"
        className="w-1/4 max-w-lg rounded p-3 border border-gray-500 text-2xl"
        onClick={() => handleNavigate("/Notice")}
      >
        공지사항 관리
      </button>

      <button
        type="button"
        className="w-1/4 max-w-lg rounded p-3 border border-gray-500 text-2xl"
        onClick={() => handleNavigate("/reviewBoard")}
      >
        후기 게시판 관리
      </button>

      <button
        type="button"
        className="w-1/4 max-w-lg rounded p-3 border border-gray-500 text-2xl"
        onClick={() => handleNavigate("/UserInquiries")}
      >
        고객문의 관리
      </button>
    </div>
  );
};

export default BoardNav;