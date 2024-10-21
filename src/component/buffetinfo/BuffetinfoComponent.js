import BasicLayout from "../../layouts/BasicLayout"; // 기본 레이아웃 컴포넌트 가져오기
import BuffetItems from "./BuffetItems"; // 뷔페 정보 항목 컴포넌트
import BuffetPrice from "./BuffetPrice"; // 뷔페 가격 정보 컴포넌트

// Buffetinfo: 뷔페 정보를 표시하는 컴포넌트
const Buffetinfo = () => {
  return (
    <BasicLayout> {/* 기본 레이아웃으로 감싸기 */}
      <div className="flex flex-col items-center"> {/* 세로로 정렬된 컨테이너 */}
        <div className="text-4xl text-center mb-6"> {/* 제목, 중앙 정렬 및 아래 여백 */}
          Buffet Info
        </div>
        
        <div className="mt-10 text-center"> {/* 추가 정보 표시하는 컨테이너 */}
          <BuffetItems /> {/* 뷔페 정보 항목 컴포넌트 */}
          <BuffetPrice /> {/* 뷔페 가격 정보 컴포넌트 */}
        </div>
      </div>
    </BasicLayout>
  );
};

export default Buffetinfo; // Buffetinfo 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
