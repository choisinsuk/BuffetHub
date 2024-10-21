import BasicLayout from "../layouts/MainLayout";

const MainPage = () => {
    return (
        <BasicLayout>
            {/* 메인 페이지의 중앙에 위치한 텍스트 */}
            <div className="text-4xl text-center">
                <div>Main Page</div> {/* 메인 페이지 제목 */}
                <div className="mt-10">
                    {/* 페이지의 주요 내용 표시 */}
                    <div className="mt-2" style={{ fontSize: '20px' }}>(뷔페내부 전경 사진)</div> {/* 뷔페 내부 사진 설명 */}
                    <div className="mt-2" style={{ fontSize: '20px' }}>(뷔페 메뉴 소개)</div> {/* 뷔페 메뉴 소개 설명 */}
                    <div className="mt-2" style={{ fontSize: '20px' }}>(공지사항)</div> {/* 공지사항 설명 */}
                    <div className="mt-2" style={{ fontSize: '20px' }}>(추천 이벤트)</div> {/* 추천 이벤트 설명 */}
                </div>
            </div>
        </BasicLayout>
    );
};

export default MainPage;
