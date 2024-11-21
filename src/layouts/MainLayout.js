import BasicMenu from "../component/menus/BasicMenu";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Header - 가로 100%, 높이 10% */}
        <BasicMenu className="flex-shrink-0 w-full" />

        <div className="flex-1 flex flex-col">
          {/* Main - 가로 100%, 높이 90%로 변경 */}
          <main className="w-full flex-1 overflow-auto">
            {children}
          </main>

          {/* Footer - 가로 100%, 높이 10% */}
          <footer className="flex-shrink-0 w-full bg-orange-100 flex items-center text-center justify-center text-black" style={{ fontSize: '0.8rem' }}>
            <table className="text-center">
              <tr>
                <td colSpan={2}>서울특별시 금천구 가산디지털2로 101 한라원앤원타워3층</td>
              </tr>

              <tr>
                <td>
                  팩스 : 02-000-0000
                </td>
                <td>
                  대표전화 : 0000-0000
                </td>
              </tr>

              <tr>
                <td colSpan={2}>(주)BuffetHub 대표 : 불꽃놀이 COPYRIGHT © 2024 BuffetHub.</td>
              </tr>

              <tr>
                <td>Email : kosmo@ikosmo.co.kr</td>
                <td>ALL RIGHT RESERVED.</td>
              </tr>
            </table>
          </footer>
        </div>
      </div>
    </>
  );
}

export default MainLayout;