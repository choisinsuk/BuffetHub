import React, { useState } from "react"; // React와 useState 훅 가져오기
import { useNavigate } from "react-router-dom"; // useNavigate 훅 가져오기
import BasicLayout from "../layouts/BasicLayout"; // BasicLayout 컴포넌트 가져오기

const Main = () => {
  

  return (
    <>
      <BasicLayout /> {/* 기본 레이아웃 컴포넌트 렌더링 */}
    </>
  );
};

export default Main; // Main 컴포넌트 내보내기
