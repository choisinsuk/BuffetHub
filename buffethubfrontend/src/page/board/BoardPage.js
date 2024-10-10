import BasicLayout from "../../layouts/BasicLayout"; // 레이아웃 컴포넌트 가져오기
import { Link } from "react-router-dom"; // React Router의 Link 컴포넌트 가져오기

// Board: 게시판을 표시하는 컴포넌트
const Board = () => {
  return (
    <BasicLayout> {/* 기본 레이아웃으로 감싸기 */}
      <div className="flex flex-col items-center"> {/* 세로로 정렬된 컨테이너 */}
        <div className="text-4xl text-center mb-4"> {/* 제목, 중앙 정렬 및 아래 여백 */}
          Board
        </div>
        
        <div className="flex space-x-4 text-center" style={{ fontSize: '18px' }}> {/* 메뉴 링크를 가로로 나열 */}
          <Link to="/notice" className="border-2 border-black p-3 w-40 flex items-center justify-center"> {/* 공지사항 링크 */}
            공지사항
          </Link>
          <Link to="/reviews" className="border-2 border-black p-3 w-40 flex items-center justify-center"> {/* 후기 게시판 링크 */}
            후기 게시판
          </Link>
          <Link to="/qa" className="border-2 border-black p-3 w-40 flex items-center justify-center"> {/* Q&A 링크 */}
            Q&A
          </Link>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Board; // Board 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
