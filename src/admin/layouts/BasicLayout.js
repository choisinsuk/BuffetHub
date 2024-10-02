// 필요한 모듈 가져오기
import BasicMenu from "../components/menu/BasicMenu";

// 컴포넌트 정의
// BasicLayout 컴포넌트는 children 이라는 props를 받아서 렌더링한다.
const BasicLayout = ({ children }) => {
  return (
    <>
      <BasicMenu />

      {/* div 태그는 메인 콘텐츠와 사이드바를 포함하는 컨테이너. 반응형 레이아웃을 위하여 flexbox를 사용한다. */}
      <div className="bg-white my-5 w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        {children}
        <main className="bg-sky-400 w-full px-3 py-20 flex items-center justify-center"> {/* 텍스트 중앙 정렬 */}
          <h1 className="text-white text-2xl">HELLO WELLCOME admin</h1> {/* 원하는 텍스트 */}
        </main>
      </div>
    </>
  );
}

// 컴포넌트 내보내기
export default BasicLayout;
