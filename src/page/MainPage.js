import BasicLayout from "../layouts/MainLayout";
import BuffetPicture from "../images/buffet.png";

const MainPage = () => {
    return (
        <BasicLayout>
            {/* 메인 페이지의 중앙에 위치한 텍스트 */}
            <div className="text-4xl text-center">
                <div className="mt-10">
                    {/* 페이지의 주요 내용 표시 */}
                    <img src={BuffetPicture} alt="topimage" className="w-full" />
                    <div className="mt-2" style={{ fontSize: '20px' }}>(뷔페 메뉴 소개)</div>
                    <div className="mt-2" style={{ fontSize: '20px' }}>(공지사항)</div>
                    <div className="mt-2" style={{ fontSize: '20px' }}>(추천 이벤트)</div>
                </div>
            </div>
        </BasicLayout>
    );
};

export default MainPage;
