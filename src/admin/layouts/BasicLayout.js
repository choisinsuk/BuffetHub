//필요한 모듈 가져오기
import BasicMenu from "../components/menu/BasicMenu";

//컴포넌트 정의
//BasicLayout 컴포넌트는 children 이라는 props를 받아서 렌더링한다.
const BasicLayout = ({ children }) => {
  return (
    <>
      <BasicMenu></BasicMenu>

      {/*div태그는 메인 콘텐츠와 사이드바를 포함하는 컨테이너. 반응형 레이아웃을 위하 flexbox를 사용한다.*/}
      <div className="bg-white my-5 w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        
        {/*main태그는 메인 콘텐츠 영역을 저의하며, 배경색과 패딩을 설정한다.*/}
        <main className="bg-sky-300 md:w-2/3 lg:w-3/4 px-5 py-40">
          <h1 className="text-2xl md:text-4xl">{children}</h1>
        </main>

        {/*aside 태그는 사이드바를 정의하며, 배경색과 패딩을 설정합니다.*/}
        <aside className="bg-green-300 md:w-1/3 lg:w-1/4 px-5 py-40">
          <h1 className="text-2xl md:text-4xl">Sidebar</h1>
        </aside>
      </div>
    </>
  );
}

//컴포넌트 내보내기
export default BasicLayout;
