import React, { useEffect, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import BasicMenu from "../../../component/menus/BasicMenu"; 
import { setAuthToken, getList, getOne } from "../../../api/inquiryApi"; 

const InquiryListPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [inquiriesPerPage] = useState(10);
  const navigate = useNavigate(); 

  useEffect(() => {
    setAuthToken();
    fetchInquiries();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchInquiries = async () => {
    try {
      const response = await getList({ page: 0, size: 100 });
      const formattedInquiries = response.map((inquiry) => ({
        ...inquiry,
        cqRegdt: formatDate(inquiry.cqRegdt),
      }));
      setInquiries(formattedInquiries);
      setFilteredInquiries(formattedInquiries);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      alert("문의 데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

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
    setCurrentPage(pageNumber);
  };

  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = filteredInquiries.slice(
    indexOfFirstInquiry,
    indexOfLastInquiry
  );

  const totalPages = Math.ceil(filteredInquiries.length / inquiriesPerPage);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredInquiries(inquiries);
    } else {
      const results = inquiries.filter((inquiry) =>
        inquiry.cqTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInquiries(results);
    }
  };

  const handleTitleClick = async (cqNb) => {
    try {
      const data = await getOne(cqNb);
      setSelectedInquiry(data);
    } catch (error) {
      console.error("문의 상세 정보를 불러오는 중 오류가 발생했습니다:", error);
      alert("문의 상세 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleCloseDetail = () => {
    setSelectedInquiry(null);
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

      <div className="bg-gray-200 my-5 w-full text-center px-10 py-10">
        <h2 className="text-2xl font-bold mb-4">고객 문의</h2>
        
        <input
          type="text"
          placeholder="제목으로 검색"
          value={searchTerm}
          onChange={handleInputChange}
          className="border p-2 mb-4 w-1/4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 ml-2"
        >
          검색
        </button>

        <Link to="/inquiry/add"> {/* 작성 페이지로 이동하는 버튼 */}
          <button
            type="button"
            className="ml-2 px-3 bg-green-500 text-white py-2 rounded font-bold"
          >
            작성
          </button>
        </Link>

        <table className="w-full bg-white border-collapse text-center mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">문의 번호</th>
              <th className="py-2 px-4 border-b">문의 제목</th>
              <th className="py-2 px-4 border-b">회원 아이디</th>
              <th className="py-2 px-4 border-b">등록 날짜</th>
              <th className="py-2 px-4 border-b">수정</th> 
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
                      className="bg-blue-500 text-white px-3 py-1 rounded"
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
                  currentPage === page ? "bg-blue-300" : "bg-gray-200"
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
            <p className="py-5 text-left">내용: {selectedInquiry.cqCtt}</p>
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
