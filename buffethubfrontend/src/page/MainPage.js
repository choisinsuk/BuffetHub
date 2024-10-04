import BasicLayout from "../layouts/BasicLayout";

const MainPage = () => {
    return (
        <BasicLayout>
      <div className="text-4xl text-center">
                <div>Main Page</div>
        <div className="mt-10">
          <div className="mt-2" style={{ fontSize: '20px' }}>(뷔페내부 전경 사진)</div>
          <div className="mt-2" style={{ fontSize: '20px' }}>(뷔페 메뉴 소개)</div>
          <div className="mt-2" style={{ fontSize: '20px' }}>(공지사항)</div>
          <div className="mt-2" style={{ fontSize: '20px' }}>(추천 이벤트)</div>
        </div>
            </div>
        </BasicLayout>
    );
};
 
export default MainPage;
