import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BasicMenu from "../../../component/menus/BasicMenu";
import { setAuthToken, getList, getOne } from "../../../api/inquiryApi";

const InquiryListPage = () => {
  const [inquiries, setInquiries] = useState([]); // 문의 리스트 상태
  const [filteredInquiries, setFilteredInquiries] = useState([]); // 필터링된 문의 리스트 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [selectedInquiry, setSelectedInquiry] = useState(null); // 선택된 문의 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [inquiriesPerPage] = useState(10); // 페이지당 표시할 문의 수
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  useEffect(() => {
    setAuthToken();
    fetchInquiries(); // 문의 리스트 데이터 불러오기
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // 날짜 포맷팅 반환
  };

  const fetchInquiries = async () => {
    try {
      const response = await getList({ page: 0, size: 100 });
      const formattedInquiries = response.map((inquiry) => ({
        ...inquiry,
        cqRegdt: formatDate(inquiry.cqRegdt), // 날짜 포맷팅
      }));
      setInquiries(formattedInquiries); // 문의 리스트 상태 업데이트
      setFilteredInquiries(formattedInquiries); // 필터링된 문의 리스트 상태 업데이트
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      alert("문의 데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  // 검색어가 변경될 때마다 필터링된 문의 리스트 업데이트
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredInquiries(inquiries);
    } else {
      const results = inquiries.filter((inquiry) =>
        inquiry.cqTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInquiries(results);
    }
  }, [searchTerm, inquiries]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 현재 페이지 업데이트
  };

  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = filteredInquiries.slice(
    indexOfFirstInquiry,
    indexOfLastInquiry
  );

  const totalPages = Math.ceil(filteredInquiries.length / inquiriesPerPage);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // 검색어 상태 업데이트
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredInquiries(inquiries);
    } else {
      const results = inquiries.filter((inquiry) =>
        inquiry.cqTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInquiries(results); // 필터링된 문의 리스트 업데이트
    }
  };

  const handleTitleClick = async (cqNb) => {
    try {
      const data = await getOne(cqNb); // 문의 상세 정보 불러오기
      setSelectedInquiry(data); // 선택된 문의 상태 업데이트
    } catch (error) {
      console.error("문의 상세 정보를 불러오는 중 오류가 발생했습니다:", error);
      alert("문의 상세 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleCloseDetail = () => {
    setSelectedInquiry(null); // 선택된 문의 초기화
  };

  const createPaginationArray = () => {
    const maxPagesToShow = 5;
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages; // 페이지네이션 배열 반환
  };

  const paginationArray = createPaginationArray();

  return (
    <div>
      <BasicMenu /> {/* 메뉴 컴포넌트 */}

      {/* 고객 문의 박스 */}
      <div className="bg-white my-5 w-full flex-col space-y-4">
        <main className="bg-orange-100 w-5/6 mx-auto px-3 py-20 rounded-lg flex flex-col items-center justify-center text-center shadow-lg border-2-black">
          <h2 className="text-5xl font-bold mb-4 text-fontColor">고객 문의</h2>
          <div className="w-full flex justify-center mb-4">
            <input
              type="text"
              placeholder="제목으로 검색"
              value={searchTerm}
              onChange={handleInputChange}
              className="w-1/4 border border-gray-400 p-2 hover:border-gray-700 rounded"
            />
            <button
              onClick={handleSearch}
              className="ml-2 px-3 bg-orange-200 text-fontColor py-2 rounded hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
            >
              검색
            </button>
            <Link to="/inquiry/add"> {/* 작성 페이지로 이동하는 버튼 */}
              <button
                type="button"
                className="ml-2 px-3 bg-orange-200 text-fontColor py-2 rounded hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
              >
                작성
              </button>
            </Link>
          </div>
        </main>
      </div>

      {/* 문의 리스트 */}
      <div className="w-5/6 justify-center flex m-auto flex-col py-4 pb-10">
        <table className="m-auto w-full text-center bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b font-bold text-fontColor">문의 번호</th>
              <th className="py-2 px-4 border-b font-bold text-fontColor">문의 제목</th>
              <th className="py-2 px-4 border-b font-bold text-fontColor">회원 아이디</th>
              <th className="py-2 px-4 border-b font-bold text-fontColor">등록 날짜</th>
              <th className="py-2 px-4 border-b font-bold text-fontColor">수정</th>
            </tr>
          </thead>
          <tbody>
            {currentInquiries.length > 0 ? (
              currentInquiries.map((inquiry, index) => (
                <tr
                  key={inquiry.cqNb}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2 px-4 border-b">{inquiry.cqNb}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleTitleClick(inquiry.cqNb)}
                      className="text-blue-500 underline"
                    >
                      {inquiry.cqTitle}
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">{inquiry.usId}</td>
                  <td className="py-2 px-4 border-b">{inquiry.cqRegdt}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => navigate(`/inquiry/modify/${inquiry.cqNb}`)}
                      className="ml-2 px-3 bg-orange-200 text-fontColor py-2 rounded hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                    >
                      수정
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-2">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {paginationArray.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === page
                  ? "bg-orange-300 text-fontColor rounded hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
                  : "bg-orange-100 text-fontColor rounded hover:bg-customColor2 font-bold transition transform hover:scale-110 duration-200 ease-in-out"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>

    {selectedInquiry && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-5 rounded shadow-lg w-3/5 h-auto">
          <h2 className="py-5 text-xl font-bold">
            제목 : {selectedInquiry.cqTitle}
          </h2>
          <hr />
          <p className="py-5 text-left">
            <span className="text-2xl font-bold">
              내용
              <hr className="pt-5" />
            </span>
            <br />
            {selectedInquiry.cqCtt}
          </p>
          <p className="mt-4">등록 날짜: {selectedInquiry.cqRegdt}</p>
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

export default InquiryListPage; // InquiryListPage 컴포넌트 내보내기