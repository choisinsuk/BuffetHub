//필요한 모듈 가져오기
import BasicMenu from "../components/menu/BasicMenu";

//컴포넌트 정의
const ListLayout = ({ children }) => {
  return (
    <>
      <BasicMenu></BasicMenu>

      {/*div태그는 메인 콘텐츠와 사이드바를 포함하는 컨테이너. 반응형 레이아웃을 위해 flexbox를 사용한다.*/}
      <div className="bg-white my-5 w-full flex-row space-y-4 md:flex-row md:space-y-0">
        {/*main태그는 메인 콘텐츠 영역을 저의하며, 배경색과 패딩을 설정한다.*/}
        <main className="bg-sky-200 w-full px-5 py-20 text-center">
          <div className="text-3xl">예약 정보 관리</div>
        </main>

        <div className="bg-red-200 w-full px-2 py-4 text-center">
          <div className="text-3xl">검색창</div>
        </div>  
      </div>
      
      <hr className="my-4" />

      <div className="bg-white my-5 w-full flex-row space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <main className="bg-sky-200 w-full px-5 py-20 text-center">
        <div className="text-3xl">회원 리스트 들어갈 자리</div>
        </main>
      </div>
      
    </>
  );
}
//컴포넌트 내보내기
export default ListLayout;
