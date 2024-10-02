//필요한 모듈 가져오기
import BasicMenu from "../../components/menu/BasicMenu";

//컴포넌트 정의
//BasicLayout 컴포넌트는 children 이라는 props를 받아서 렌더링한다.
const BoardLayout = ({ children }) => {
  return (
    <>
      <BasicMenu></BasicMenu>

      {/*div태그는 메인 콘텐츠와 사이드바를 포함하는 컨테이너. 반응형 레이아웃을 위하 flexbox를 사용한다.*/}
      <div className="bg-white my-5 w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <main className="bg-sky-300 w-full px-5 py-10">
          <h1 className="text-2xl md:text-4xl">{children}</h1>
        </main>


      </div>
    </>
  );
}

//컴포넌트 내보내기
export default BoardLayout;