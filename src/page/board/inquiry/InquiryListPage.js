import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BasicMenu from "../../../component/menus/BasicMenu";
import { setAuthToken, getList, getOne } from "../../../api/inquiryApi"; // Inquiry API import

// 고객 문의 리스트 페이지 컴포넌트
const InquiryListPage = () => {
  const [inquiries, setInquiries] = useState([]); // 고객 문의 데이터를 저장할 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [filteredInquiries, setFilteredInquiries] = useState([]); // 검색된 문의 데이터를 저장할 상태
  const [selectedInquiry, setSelectedInquiry] = useState(null); // 선택된 고객 문의 상세 데이터 상태
  
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 상태
  const [inquiriesPerPage] = useState(10); // 페이지당 표시할 문의 수
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

  // 컴포넌트가 마운트될 때 인증 토큰 설정 및 문의 데이터 가져오기
  useEffect(() => {
    setAuthToken(); // 인증 토큰 설정 함수 호출
    fetchInquiries(); // 문의 리스트 가져오기
  }, []);

  // 날짜 형식을 'YYYY-MM-DD'로 변환하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 문의 데이터를 서버에서 가져와 상태에 저장하는 함수
  const fetchInquiries = async () => {
    try {
      const response = await getList({ page: 0, size: 100 });
      // 날짜 형식 적용 후 최신 순으로 정렬
      const sortedInquiries = response
        .map(inquiry => ({ ...inquiry, cqRegdt: formatDate(inquiry.cqRegdt) })) // 날짜 포맷 적용
        .sort((a, b) => new Date(b.cqRegdt) - new Date(a.cqRegdt)); // 최신순 정렬
      setInquiries(sortedInquiries); // 상태에 저장
      setFilteredInquiries(sortedInquiries); // 초기 검색 결과 상태 설정
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      alert("문의 데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  // 검색어가 변경될 때마다 필터링된 결과 업데이트
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredInquiries(inquiries); // 검색어가 없을 경우 전체 데이터를 사용
    } else {
      // 검색어를 포함한 문의 데이터 필터링
      const results = inquiries.filter(inquiry =>
        inquiry.cqTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInquiries(results);
    }
  }, [searchTerm, inquiries]);

  // 페이지 번호가 변경될 때 호출되는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지 번호 계산 및 현재 페이지에 표시할 문의 데이터 설정
  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = filteredInquiries.slice(indexOfFirstInquiry, indexOfLastInquiry);
  const totalPages = Math.ceil(filteredInquiries.length / inquiriesPerPage);

  // 검색어 입력 값 변경 시 호출되는 함수
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredInquiries(inquiries); // 검색어가 없으면 전체 문의 데이터 표시
    } else {
      const results = inquiries.filter(inquiry =>
        inquiry.cqTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInquiries(results);
    }
  };

  // 문의 제목 클릭 시 상세 정보 가져오기
  const handleTitleClick = async (cqNb) => {
    try {
      const data = await getOne(cqNb);
      setSelectedInquiry(data); // 선택된 문의 데이터를 상태에 저장
    } catch (error) {
      console.error("문의 상세 정보를 불러오는 중 오류가 발생했습니다:", error);
      alert("문의 상세 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  // 상세보기 닫기 버튼 클릭 시 호출되는 함수
  const handleCloseDetail = () => {
    setSelectedInquiry(null);
  };

  // 페이지네이션 배열 생성 함수
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
      <BasicMenu /> {/* 기본 메뉴 컴포넌트 */}
      <div className="bg-gray-200 my-5 w-full text-center px-10 py-10">
        <h2 className="text-2xl font-bold mb-4">고객 문의</h2>
        <input
          type="text"
          placeholder="제목으로 검색"
          value={searchTerm}
          onChange={handleInputChange} // 검색어 입력 변경 처리
          className="border p-2 mb-4 w-1/4"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2">검색</button>
        <table className="w-full bg-white border-collapse text-center mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">문의 번호</th>
              <th className="py-2 px-4 border-b">문의 제목</th>
              <th className="py-2 px-4 border-b">회원 아이디</th>
              <th className="py-2 px-4 border-b">등록 날짜</th>
            </tr>
          </thead>
          <tbody>
            {currentInquiries.length > 0 ? (
              currentInquiries.map((inquiry, index) => (
                <tr key={inquiry.cqNb} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-2 px-4 border-b">{inquiry.cqNb}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleTitleClick(inquiry.cqNb)} // 제목 클릭 시 상세 보기
                      className="text-blue-500 underline"
                    >
                      {inquiry.cqTitle}
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">{inquiry.usId}</td>
                  <td className="py-2 px-4 border-b">{inquiry.cqRegdt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-2">검색 결과가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {paginationArray.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)} // 페이지 번호 변경
                className={`mx-1 px-3 py-1 rounded ${currentPage === page ? "bg-blue-300" : "bg-gray-200"}`}
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
            <h2 className="py-5 text-xl font-bold">제목 : {selectedInquiry.cqTitle}</h2>
            <hr />
            <p className="py-5 text-left">내용: {selectedInquiry.cqCtt}</p>
            <p className="mt-4">등록 날짜: {selectedInquiry.cqRegdt}</p>
            <button onClick={handleCloseDetail} className="bg-gray-500 text-white p-2 mt-4">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryListPage;
