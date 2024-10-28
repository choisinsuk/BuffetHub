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
  const [freeBoardsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken();
    fetchFreeBoards();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const fetchFreeBoards = async () => {
    try {
      const response = await getList({ page: 0, size: 100 });
      const sortedFreeBoards = response
        .map(freeBoard => ({
          ...freeBoard,
          ftRegdt: formatDate(freeBoard.ftRegdt), // 포맷팅된 날짜로 변환
        }))
        .sort((a, b) => new Date(b.ftRegdt) - new Date(a.ftRegdt));
      setFreeBoards(sortedFreeBoards);
      setFilteredFreeBoards(sortedFreeBoards);
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
  const indexOfFirstFreeBoard = indexOfLastFreeBoard - freeBoardsPerPage;
  const currentFreeBoards = filteredFreeBoards.slice(
    indexOfFirstFreeBoard,
    indexOfLastFreeBoard
  );

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

  const createPaginationArray = () => {
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
          <div className="text-5xl text-fontColor font-bold ">
            자유게시판 관리
          </div>
        </main>
      </div>

      <div className="w-5/6 justify-center flex m-auto flex-col py-4 pb-10">
        <table className="m-auto w-full text-center">
          <tr>
            <td colSpan={4} className="pt-5 font-bord">
              <hr className="pt-4 w-full border-orange-200 border-t-2 justify-center text-center items-center " />
            </td>
          </tr>
          <tr>
            <td colSpan={4} className="text-right px-4 py-5">
              <input
                type="text"
                placeholder="제목으로 검색"
                value={searchTerm}
                onChange={handleInputChange}
                className="w-1/4 border border-gray-400 p-2 hover:border-gray-700 "
              />
              <button
                onClick={handleSearch}
                className="ml-2 px-3 bg-orange-200 text-fontColor py-2 rounded 
                    hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
              >
                검색
              </button>

              <Link to="/admin/freeCreate">
                <button
                  type="button"
                  className="ml-2 px-3 bg-orange-200 text-fontColor py-2 rounded 
                    hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                >
                  작성
                </button>
              </Link>
            </td>
          </tr>

          <tr>
            <td className="py-2 px-1 border-b font-bold text-fontColor ">
              자유게시판 번호
            </td>
            <td className="py-2 px-5 border-b font-bold text-fontColor ">
              자유게시판 제목
            </td>
            <td className="py-2 px-2 border-b font-bold text-fontColor ">
              입력날짜
            </td>
            <td className="py-2 px-1 border-b font-bold text-fontColor ">
              수정 및 삭제
            </td>
          </tr>
          {currentFreeBoards.length > 0 ? (
            currentFreeBoards.map((freeBoard, index) => (
              <tr
                key={freeBoard.ftNb}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-2 px-4 border-b">
                  {indexOfFirstFreeBoard + index + 1}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleTitleClick(freeBoard.ftNb)}
                    className="text-blue-500 underline"
                  >
                    {freeBoard.ftTitle}
                  </button>
                </td>
                <td className="py-2 px-4 border-b">{freeBoard.ftRegdt}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() =>
                      navigate(`/admin/freeModify/${freeBoard.ftNb}`)
                    }
                    className="ml-2 px-3 bg-orange-200 text-fontColor py-2 rounded 
                    hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                  >
                    수정
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-2">
                검색 결과가 없습니다.
              </td>
            </tr>
          )}
          <tr>
            <td colSpan={4}>
              {totalPages > 1 && (
                <div className="flex justify-center m-4">
                  {paginationArray.map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`mx-1 px-3 py-1 rounded ${
                        currentPage === page
                          ? " bg-orange-300 text-fontColor rounded hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                          : "bg-orange-100 text-fontColor rounded hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </td>
          </tr>
        </table>
      </div>

      {selectedFreeBoard && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg w-3/5 h-auto">
            <h2 className="py-5 text-xl font-bold">제목 : {selectedFreeBoard.ftTitle}</h2>
            <hr />
            <p className="py-5 text-left">
              <span className="text-2xl font-bold">
                내용
                <hr className="pt-5" />
              </span>
              <br />
              {selectedFreeBoard.ftCtt}
            </p>
            <p className="mt-4">입력날짜: {selectedFreeBoard.ftRegdt}</p>
            <button
              onClick={handleCloseDetail}
              className="bg-gray-500 text-white p-2 mt-4"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeBoard;
