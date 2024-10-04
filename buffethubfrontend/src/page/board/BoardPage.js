import BasicLayout from "../../layouts/BasicLayout";
import { Link } from "react-router-dom";  

const Board = () => {
  return (
    <BasicLayout>
      <div className="flex flex-col items-center">
        <div className="text-4xl text-center mb-4">
          
                      Board
        </div>
        
        <div className="flex space-x-4 text-center" style={{ fontSize: '18px' }}>
          <Link to="/notice" className="border-2 border-black p-3 w-40 flex items-center justify-center">
            공지사항
          </Link>
          <Link to="/reviews" className="border-2 border-black p-3 w-40 flex items-center justify-center">
            후기 게시판
          </Link>
          <Link to="/qa" className="border-2 border-black p-3 w-40 flex items-center justify-center">
            Q&A
          </Link>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Board;
