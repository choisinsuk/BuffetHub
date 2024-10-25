import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import BasicMenu from "../../components/menu/BasicMenu";
import { setAuthToken, getList, getOne } from "../../../api/freeBoardApi";

const FreeBoard = () => {
  const [freeBoards, setFreeBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFreeBoards, setFilteredFreeBoards] = useState([]);
  const [selectedFreeBoard, setSelectedFreeBoard] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [freeBoardsPerPage] = useState(10); // 페이지당 표시할 게시글 수

  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken();
    fetchFreeBoards(); // 자유게시판 불러옴
  }, []);

  const fetchFreeBoards = async () => {
    try {
      const response = await getList({ page: 0, size: 100 });
     //자유게시판 등록 날짜를 기준으로 내림차순 정렬
     const sortedFreeBoards = response.sort((a, b) => new Date(b.ftRegdt) - new Date(a.ftRegdt));

      setFreeBoards(response);
      setFilteredFreeBoards(response);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      alert("자유게시판을 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFreeBoards(freeBoards);
    } else {
      const results = freeBoards.filter((freeBoard) =>
        freeBoard.ftTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFreeBoards(results);
    }
  }, [searchTerm, freeBoards]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastFreeBoard = currentPage * freeBoardsPerPage;
  const indexOfFirstFreeBoard= indexOfLastFreeBoard - freeBoardsPerPage;
  const currentFreeBoards = filteredFreeBoards.slice(indexOfFirstFreeBoard, indexOfLastFreeBoard);

  const totalPages = Math.ceil(filteredFreeBoards.length / freeBoardsPerPage);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredFreeBoards(freeBoards);
    } else {
      const results = freeBoards.filter((freeBoard) =>
        freeBoard.ftTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFreeBoards(results);
    }
  };

  const handleTitleClick = async (ftNb) => {
    try {
      const data = await getOne(ftNb);
      setSelectedFreeBoard(data);
    } catch (error) {
      console.error("자유게시판을 불러오는 중 오류 발생:", error);
      alert("자유게시판을 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleCloseDetail = () => {
    setSelectedFreeBoard(null);
  };

  // 페이지네이션 숫자 배열 생성
  const createPaginationArray = () => {
    const totalPages = Math.ceil(filteredFreeBoards.length / freeBoardsPerPage);
    const maxPagesToShow = 5;
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const paginationArray = createPaginationArray();

  return (
    <div>
      <BasicMenu />

      <div className="bg-white my-5 w-full flex-col space-y-4">
        <main className="bg-orange-100 w-5/6 mx-auto px-3 py-20 rounded-lg flex items-center justify-center text-center shadow-lg border-2-black ">
          <div className="text-5xl text-fontColor font-bold ">자유게시판 관리</div>
        </main>
      </div>


      <div className="bg-gray-200 my-5 w-5/6 text-center px-10 py-10 justify-center ">
        <h2 className="text-xl font-bold">자유게시판 리스트</h2>
        <div className="mb-4 flex items-center justify-center">
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={handleInputChange}
            className="border border-black p-2"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2">
            검색
          </button>
          <Link to="/admin/freeCreate">
            <button type="button" className="bg-green-500 text-white p-2 ml-2">
              작성
            </button>
          </Link>
        </div>
        <table className="w-full bg-white border-collapse text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">자유게시판 번호</th>
              <th className="py-2 px-4 border-b">자유게시판 제목</th>
              <th className="py-2 px-4 border-b">입력날짜</th>
              <th className="py-2 px-4 border-b">상세보기</th>
            </tr>
          </thead>
          <tbody>
  {currentFreeBoards.length > 0 ? (
    currentFreeBoards.map((freeBoard, index) => (
      <tr key={freeBoard.ftNb} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
        <td className="py-2 px-4 border-b">{indexOfFirstFreeBoard + index + 1}</td> {/* 번호를 1부터 시작하도록 계산 */}
        <td className="py-2 px-4 border-b">
          <button onClick={() => handleTitleClick(freeBoard.ftNb)} className="text-blue-500 underline">
            {freeBoard.ftTitle}
          </button>
        </td>
        <td className="py-2 px-4 border-b">{freeBoard.ftRegdt}</td>
        <td className="py-2 px-4 border-b">
          <button onClick={() => navigate(`/admin/freeBoardModify/${freeBoard.ftNb}`)} className="bg-yellow-500 text-white p-2">
            수정
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={4} className="py-2">검색 결과가 없습니다.</td>
    </tr>
  )}
</tbody>

        </table>

        {/* 페이지네이션 추가 */}
        {totalPages > 1 && (
          <div className="flex justify-center m-4">
            {paginationArray.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        {selectedFreeBoard && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded shadow-lg w-3/5 h-auto">
              <h2 className="py-5 text-xl font-bold">제목 : {selectedFreeBoard.ftTitle}</h2>
              <hr/>
              <p className="py-5 text-left"><span className="text-2xl font-bold">내용<hr className="pt-5"/></span><br/>{selectedFreeBoard.ftCtt}</p>
              <p className="mt-4">입력날짜: {selectedFreeBoard.ftRegdt}</p>
              <button onClick={handleCloseDetail} className="bg-gray-500 text-white p-2 mt-4">
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreeBoard;
