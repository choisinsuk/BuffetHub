import React from "react"; // React 라이브러리 가져오기
import BasicLayout from "../../layouts/BasicLayout"; // 기본 레이아웃 컴포넌트 가져오기
import { Link } from "react-router-dom"; // React Router에서 Link 컴포넌트 가져오기

// MyPage: 사용자 정보를 표시하는 컴포넌트
const MyPage = () => {
  return (
    <BasicLayout> {/* 기본 레이아웃으로 감싸기 */}
      <div className="flex flex-col items-center"> {/* 세로로 정렬된 컨테이너 */}
        <div className="text-4xl text-center mb-4"> {/* 제목, 중앙 정렬 및 아래 여백 */}
          MyPage
        </div>

        <div className="mb-1 text-2xl"> {/* 사용자 정보 제목 */}
          - 사용자 정보 -
        </div>

        <div className="mb-6 text-lg text-center"> {/* 사용자 정보 내용 */}
          <p>이름: 홍길동</p> 
          <p>주소: 서울특별시 금천구 가산디지털2로</p> 
          <p>연락처: 000-0000-0000</p> 
          <p>이메일: hong@example.com</p> 
          <p>가입일: 2024년 10월 4일</p> 
        </div>
      </div>

      
      <div className="mb-4 w-full flex flex-col items-center"> {/* 버튼 컨테이너 */}
        <div className="flex space-x-4 text-center" style={{ fontSize: '18px' }}> {/* 버튼들, 수평으로 정렬 */}
          <Link to="/notice" className="border-2 border-black p-3 w-40 flex items-center justify-center">
            개인정보 수정 {/* 개인정보 수정 링크 */}
          </Link>
          <Link to="/reviews" className="border-2 border-black p-3 w-40 flex items-center justify-center">
            로그 아웃 {/* 로그 아웃 링크 */}
          </Link>
          <Link to="/qa" className="border-2 border-black p-3 w-40 flex items-center justify-center">
            계정 탈퇴 {/* 계정 탈퇴 링크 */}
          </Link>
        </div>
      </div>
    </BasicLayout>
  );
};

export default MyPage; // MyPage 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
