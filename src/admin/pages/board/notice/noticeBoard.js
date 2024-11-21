import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BasicMenu from "../../../components/menu/BasicMenu";
import { setAuthToken, getList, getOne } from "../../../../api/noticeApi";

const NoticeBoard = () => {
  // 공지사항 목록 상태
  const [notices, setNotices] = useState([]);
  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");
  // 필터링된 공지사항 상태
  const [filteredNotices, setFilteredNotices] = useState([]);
  // 선택된 공지사항 상태
  const [selectedNotice, setSelectedNotice] = useState(null);

  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지당 표시할 공지사항 수
  const [noticesPerPage] = useState(10); 

  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken(); // 인증 토큰 설정
    fetchNotices(); // 공지사항을 불러옴
  }, []);

  // 날짜 형식을 yyyy-mm-dd hh:mm:ss 형태로 포맷팅
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // 포맷팅된 날짜 반환
  };

  // 공지사항을 API를 통해 불러오는 비동기 함수
  const fetchNotices = async () => {
    try {
      const response = await getList({ page: 0, size: 100 }); // API 호출
      // 공지사항 등록 날짜를 기준으로 내림차순 정렬
      const sortedNotices = response
        .map(notice => ({
          ...notice,
          ntRegdt: formatDate(notice.ntRegdt), // 날짜 포맷팅 적용
        }))
        .sort((a, b) => new Date(b.ntRegdt) - new Date(a.ntRegdt));

      setNotices(sortedNotices); // 상태 업데이트
      setFilteredNotices(sortedNotices); // 필터링된 공지사항 상태 업데이트
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      alert("공지사항을 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요."); // 오류 알림
    }
  };

  useEffect(() => {
    // 검색어가 비어있을 경우 필터링된 공지사항을 원래 공지사항 목록으로 설정
    if (searchTerm.trim() === "") {
      setFilteredNotices(notices);
    } else {
      // 검색어를 포함한 공지사항 필터링
      const results = notices.filter((notice) =>
        notice.ntTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotices(results); // 필터링된 상태 업데이트
    }
  }, [searchTerm, notices]); // 검색어 또는 공지사항 목록이 변경될 때마다 재실행

  // 페이지 변경 처리 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 현재 페이지 상태 업데이트
  };

  // 현재 페이지에 해당하는 공지사항 인덱스 계산
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = filteredNotices.slice(
    indexOfFirstNotice,
    indexOfLastNotice
  ); // 현재 페이지의 공지사항 목록

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);

  // 검색어 입력 처리 함수
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // 검색어 상태 업데이트
  };

  // 검색 버튼 클릭 시 검색 처리
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredNotices(notices);
    } else {
      const results = notices.filter((notice) =>
        notice.ntTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotices(results); // 필터링된 상태 업데이트
    }
  };

  // 제목 클릭 시 공지사항 상세 정보 가져오는 함수
  const handleTitleClick = async (ntNb) => {
    try {
      const data = await getOne(ntNb); // API 호출
      setSelectedNotice(data); // 선택된 공지사항 상태 업데이트
    } catch (error) {
      console.error("공지사항을 불러오는 중 오류 발생:", error);
      alert("공지사항을 불러오는 중 오류가 발생했습니다."); // 오류 알림
    }
  };

  // 상세 정보 닫기
  const handleCloseDetail = () => {
    setSelectedNotice(null); // 선택된 공지사항 초기화
  };

  // 페이지네이션 숫자 배열 생성
  const createPaginationArray = () => {
    const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);
    const maxPagesToShow = 5; // 한 페이지에 표시할 최대 페이지 수
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i); // 페이지 배열에 추가
    }
    return pages; // 생성된 페이지 배열 반환
  };

  const paginationArray = createPaginationArray(); // 페이지네이션 배열 생성

  return (
    <div>
      <BasicMenu /> {/* 기본 메뉴 컴포넌트 */}

      <div className="bg-white my-5 w-full flex-col space-y-4">
        <main className="bg-orange-100 w-5/6 mx-auto px-3 py-20 rounded-lg flex items-center justify-center text-center shadow-lg border-2-black ">
          <div className="text-5xl text-fontColor font-bold ">
            공지사항 관리
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
                onChange={handleInputChange} // 검색어 입력 시 핸들러 호출
                className="w-1/4 border border-gray-400 p-2 hover:border-gray-700 "
              />
              <button onClick={handleSearch} className="ml-2 px-3 bg-orange-200 text-fontColor py-2 rounded 
                    hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out">
                검색
              </button>

              <Link to="/admin/create"> {/* 공지사항 작성 페이지로 이동 */}
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
            <td className="py-2 px-1 border-b font-bold text-fontColor ">공지사항 번호</td>
            <td className="py-2 px-5 border-b font-bold text-fontColor ">공지사항 제목</td>
            <td className="py-2 px-2 border-b font-bold text-fontColor ">입력날짜</td>
            <td className="py-2 px-1 border-b font-bold text-fontColor ">수정 및 삭제</td>
          </tr>
          {currentNotices.length > 0 ? (
            currentNotices.map((notice, index) => ( // 현재 페이지의 공지사항 목록 출력
              <tr
                key={notice.ntNb}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"} // 홀짝 행 색상 다르게
              >
                <td className="py-2 px-4 border-b">
                  {indexOfFirstNotice + index + 1} {/* 공지사항 번호 */}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleTitleClick(notice.ntNb)} // 제목 클릭 시 상세 정보 요청
                    className="text-blue-500 underline"
                  >
                    {notice.ntTitle} {/* 공지사항 제목 */}
                  </button>
                </td>
                <td className="py-2 px-4 border-b">{notice.ntRegdt}</td> {/* 입력 날짜 */}
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() =>
                      navigate(`/admin/noticeModify/${notice.ntNb}`) // 수정 버튼 클릭 시 수정 페이지로 이동
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
                검색 결과가 없습니다. {/* 검색 결과가 없을 때 표시 */}
              </td>
            </tr>
          )}

          <tr>
            <td colSpan={4}>
              {totalPages > 1 && ( // 총 페이지 수가 1보다 클 때만 페이지네이션 표시
                <div className="flex justify-center m-4">
                  {paginationArray.map((page) => ( // 페이지 숫자 출력
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)} // 페이지 변경 시 핸들러 호출
                      className={`mx-1 px-3 py-1 rounded ${
                        currentPage === page
                          ? " bg-orange-300 text-fontColor rounded hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                          : "bg-orange-100 text-fontColor rounded hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                      }`}
                    >
                      {page} {/* 페이지 번호 */}
                    </button>
                  ))}
                </div>
              )}
            </td>
          </tr>
        </table>
      </div>

      {selectedNotice && ( // 선택된 공지사항이 있을 때만 상세 보기 표시
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg w-3/5 h-auto">
            <h2 className="py-5 text-xl font-bold">
              제목 : {selectedNotice.ntTitle} {/* 선택된 공지사항 제목 */}
            </h2>
            <hr />
            <p className="py-5 text-left">
              <span className="text-2xl font-bold">
                내용
                <hr className="pt-5" />
              </span>
              <br />
              {selectedNotice.ntCtt} {/* 선택된 공지사항 내용 */}
            </p>
            <p className="mt-4">입력날짜: {selectedNotice.ntRegdt}</p> {/* 입력 날짜 */}
            <button
              onClick={handleCloseDetail} // 닫기 버튼 클릭 시 상세 보기 닫기
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

export default NoticeBoard; // NoticeBoard 컴포넌트 내보내기
