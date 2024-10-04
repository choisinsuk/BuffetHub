import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Link } from "react-router-dom";

const MyPage = () => {
  return (
    <BasicLayout>
      <div className="flex flex-col items-center">
        <div className="text-4xl text-center mb-4">
          MyPage
        </div>

        <div className="mb-1 text-2xl">
          - 사용자 정보 -
        </div>

        <div className="mb-6 text-lg text-center">
          <p>이름: 홍길동</p>
          <p>주소: 서울특별시 금천구 가산디지털2로</p>
          <p>연락처: 000-0000-0000</p>
          <p>이메일: hong@example.com</p>
          <p>가입일: 2024년 10월 4일</p>
        </div>
      </div>

      {/* 버튼들이 footer 바로 위에 위치하도록 이동 */}
      <div className="mb-4 w-full flex flex-col items-center">
        <div className="flex space-x-4 text-center" style={{ fontSize: '18px' }}>
          <Link to="/notice" className="border-2 border-black p-3 w-40 flex items-center justify-center">
            개인정보 수정
          </Link>
          <Link to="/reviews" className="border-2 border-black p-3 w-40 flex items-center justify-center">
            로그 아웃
          </Link>
          <Link to="/qa" className="border-2 border-black p-3 w-40 flex items-center justify-center">
            계정 탈퇴
          </Link>
        </div>
      </div>
    </BasicLayout>
  );
};

export default MyPage;
