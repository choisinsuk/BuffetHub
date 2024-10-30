import React, { useEffect, useState } from "react"; // React와 훅 임포트
import { Link, useNavigate } from "react-router-dom"; // Link와 페이지 이동을 위한 훅 임포트
import BasicMenu from "../../../components/menu/BasicMenu"; // 기본 메뉴 컴포넌트 임포트
import { setAuthToken, getList, getOne } from "../../../../api/freeBoardApi"; // API 함수 임포트

const FreeBoard = () => {
  const [freeBoards, setFreeBoards] = useState([]); // 자유게시판 목록 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [filteredFreeBoards, setFilteredFreeBoards] = useState([]); // 필터링된 자유게시판 목록 상태
  const [selectedFreeBoard, setSelectedFreeBoard] = useState(null); // 선택된 자유게시판 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [freeBoardsPerPage] = useState(10); // 페이지당 자유게시판 수
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

  // 컴포넌트가 처음 렌더링될 때 호출
  useEffect(() => {
    setAuthToken(); // JWT 토큰 설정
    fetchFreeBoards(); // 자유게시판 목록 가져오기
  }, []);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString); // 문자열을 Date 객체로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 포맷팅
    const day = String(date.getDate()).padStart(2, '0'); // 일 포맷팅
    const hours = String(date.getHours()).padStart(2, '0'); // 시 포맷팅
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 분 포맷팅
    const seconds = String(date.getSeconds()).padStart(2, '0'); // 초 포맷팅
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // 최종 포맷 반환
  };

  // 자유게시판 목록을 가져오는 비동기 함수
  const fetchFreeBoards = async () => {
    try {
      const response = await getList({ page: 0, size: 100 }); // API 호출하여 자유게시판 목록 가져오기
      const sortedFreeBoards = response
        .map(freeBoard => ({
          ...freeBoard,
          ftRegdt: formatDate(freeBoard.ftRegdt), // 포맷팅된 날짜로 변환
        }))
        .sort((a, b) => new Date(b.ftRegdt) - new Date(a.ftRegdt)); // 날짜 기준으로 내림차순 정렬
      setFreeBoards(sortedFreeBoards); // 상태 업데이트
      setFilteredFreeBoards(sortedFreeBoards); // 필터링된 목록도 업데이트
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error); // 오류 로그
      alert("자유게시판을 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요."); // 오류 메시지
    }
  };

  // 검색어가 변경될 때마다 호출
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFreeBoards(freeBoards); // 검색어가 비어있으면 모든 자유게시판 목록 표시
    } else {
      const results = freeBoards.filter((freeBoard) =>
        freeBoard.ftTitle.toLowerCase().includes(searchTerm.toLowerCase()) // 검색어가 제목에 포함된 자유게시판 필터링
      );
      setFilteredFreeBoards(results); // 필터링된 결과로 상태 업데이트
    }
  }, [searchTerm, freeBoards]); // 검색어 또는 자유게시판 목록이 변경될 때마다 실행

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 현재 페이지 상태 업데이트
  };

  // 현재 페이지의 자유게시판 목록 계산
  const indexOfLastFreeBoard = currentPage * freeBoardsPerPage; // 마지막 게시글 인덱스
  const indexOfFirstFreeBoard = indexOfLastFreeBoard - freeBoardsPerPage; // 첫 번째 게시글 인덱스
  const currentFreeBoards = filteredFreeBoards.slice(
    indexOfFirstFreeBoard,
    indexOfLastFreeBoard // 현재 페이지에 해당하는 자유게시판 목록
  );

  const totalPages = Math.ceil(filteredFreeBoards.length / freeBoardsPerPage); // 총 페이지 수

  // 검색 입력 핸들러
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // 입력값으로 검색어 상태 업데이트
  };

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredFreeBoards(freeBoards); // 검색어가 비어있으면 모든 목록 표시
    } else {
      const results = freeBoards.filter((freeBoard) =>
        freeBoard.ftTitle.toLowerCase().includes(searchTerm.toLowerCase()) // 검색어가 제목에 포함된 자유게시판 필터링
      );
      setFilteredFreeBoards(results); // 필터링된 결과로 상태 업데이트
    }
  };

  // 제목 클릭 시 게시글 상세 데이터 가져오기
  const handleTitleClick = async (ftNb) => {
    try {
      const data = await getOne(ftNb); // API 호출하여 게시글 데이터 가져오기
      setSelectedFreeBoard(data); // 선택된 게시글 상태 업데이트
    } catch (error) {
      console.error("자유게시판을 불러오는 중 오류 발생:", error); // 오류 로그
      alert("자유게시판을 불러오는 중 오류가 발생했습니다."); // 오류 메시지
    }
  };

  // 상세보기 닫기 핸들러
  const handleCloseDetail = () => {
    setSelectedFreeBoard(null); // 선택된 게시글 상태 초기화
  };

  // 페이지네이션 배열 생성 함수
  const createPaginationArray = () => {
    const maxPagesToShow = 5; // 한 번에 보여줄 최대 페이지 수
    const pages = []; // 페이지 배열
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2)); // 시작 페이지 계산
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1); // 끝 페이지 계산

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i); // 페이지 배열에 추가
    }
    return pages; // 최종 페이지 배열 반환
  };

  const paginationArray = createPaginationArray(); // 페이지 배열 생성

  return (
    <div>
      <BasicMenu /> {/* 기본 메뉴 컴포넌트 렌더링 */}

      <div className="bg-white my-5 w-full flex-col space-y-4">
        <main className="bg-orange-100 w-5/6 mx-auto px-3 py-20 rounded-lg flex items-center justify-center text-center shadow-lg border-2-black ">
          <div className="text-5xl text-fontColor font-bold ">
            자유게시판 관리 {/* 제목 표시 */}
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
                placeholder="제목으로 검색" // 검색 입력 필드 플레이스홀더
                value={searchTerm} // 상태에서 검색어 값 가져오기
                onChange={handleInputChange} // 입력 변경 시 핸들러 호출
                className="w-1/4 border border-gray-400 p-2 hover:border-gray-700 "
              />
              <button
                onClick={handleSearch} // 검색 버튼 클릭 시 검색 실행
                className="ml-2 px-3 bg-orange-200 text-fontColor py-2 rounded 
                    hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
              >
                검색 {/* 검색 버튼 텍스트 */}
              </button>

              <Link to="/admin/freeCreate"> {/* 새 게시글 작성 링크 */}
                <button
                  type="button"
                  className="ml-2 px-3 bg-orange-200 text-fontColor py-2 rounded 
                    hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                >
                  작성 {/* 작성 버튼 텍스트 */}
                </button>
              </Link>
            </td>
          </tr>

          <tr>
            <td className="py-2 px-1 border-b font-bold text-fontColor ">
              자유게시판 번호 {/* 번호 헤더 */}
            </td>
            <td className="py-2 px-5 border-b font-bold text-fontColor ">
              자유게시판 제목 {/* 제목 헤더 */}
            </td>
            <td className="py-2 px-2 border-b font-bold text-fontColor ">
              입력날짜 {/* 날짜 헤더 */}
            </td>
            <td className="py-2 px-1 border-b font-bold text-fontColor ">
              삭제 {/* 삭제 헤더 */}
            </td>
          </tr>
          {currentFreeBoards.length > 0 ? ( // 현재 페이지의 게시글이 있는 경우
            currentFreeBoards.map((freeBoard, index) => (
              <tr
                key={freeBoard.ftNb} // 각 게시글의 고유 키
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"} // 짝수와 홀수 행에 다른 배경색 적용
              >
                <td className="py-2 px-4 border-b">
                  {indexOfFirstFreeBoard + index + 1} {/* 번호 표시 */}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleTitleClick(freeBoard.ftNb)} // 제목 클릭 시 상세 보기 호출
                    className="text-blue-500 underline"
                  >
                    {freeBoard.ftTitle} {/* 게시글 제목 표시 */}
                  </button>
                </td>
                <td className="py-2 px-4 border-b">{freeBoard.ftRegdt}</td> {/* 등록 날짜 표시 */}
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() =>
                      navigate(`/admin/freeModify/${freeBoard.ftNb}`) // 수정 버튼 클릭 시 수정 페이지로 이동
                    }
                    className="ml-2 px-3 bg-orange-200 text-fontColor py-2 rounded 
                    hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                  >
                    삭제 {/* 삭제 버튼 텍스트 */}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-2">
                검색 결과가 없습니다. {/* 검색 결과가 없을 경우 메시지 표시 */}
              </td>
            </tr>
          )}
          <tr>
            <td colSpan={4}>
              {totalPages > 1 && ( // 페이지가 1개 이상일 경우 페이지네이션 표시
                <div className="flex justify-center m-4">
                  {paginationArray.map((page) => (
                    <button
                      key={page} // 페이지 버튼의 고유 키
                      onClick={() => handlePageChange(page)} // 페이지 클릭 시 페이지 변경 핸들러 호출
                      className={`mx-1 px-3 py-1 rounded ${
                        currentPage === page // 현재 페이지와 비교하여 스타일 변경
                          ? " bg-orange-300 text-fontColor rounded hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                          : "bg-orange-100 text-fontColor rounded hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                      }`}
                    >
                      {page} {/* 페이지 번호 표시 */}
                    </button>
                  ))}
                </div>
              )}
            </td>
          </tr>
        </table>
      </div>

      {selectedFreeBoard && ( // 선택된 게시글이 있는 경우 상세보기 모달 표시
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg w-3/5 h-auto">
            <h2 className="py-5 text-xl font-bold">제목 : {selectedFreeBoard.ftTitle}</h2> {/* 선택된 게시글 제목 표시 */}
            <hr />
            <p className="py-5 text-left">
              <span className="text-2xl font-bold">
                내용
                <hr className="pt-5" />
              </span>
              <br />
              {selectedFreeBoard.ftCtt} {/* 선택된 게시글 내용 표시 */}
            </p>
            <p className="mt-4">입력날짜: {selectedFreeBoard.ftRegdt}</p> {/* 등록 날짜 표시 */}
            <button
              onClick={handleCloseDetail} // 닫기 버튼 클릭 시 상세보기 닫기 핸들러 호출
              className="bg-gray-500 text-white p-2 mt-4"
            >
              닫기 {/* 닫기 버튼 텍스트 */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeBoard; // FreeBoard 컴포넌트 내보내기
