import React, { useState,  useEffect } from "react"; // React와 useState 가져오기
import { useNavigate } from "react-router-dom"; // useNavigate 훅 가져오기
import BoardLayout from "../../../layouts/BoardParts/BoardLayout"; // BoardLayout 컴포넌트 가져오기
import BoardNav from "../BoardNav"
import axios from "axios"; 
import InquiriesList from "../UserInquiries/InquiriesList"


const API_URL = 'http://localhost:3000/api'; // Spring Boot 서버 URL

const UserInquiries = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("검색어:", searchTerm);
    // 검색 로직을 여기에 추가하세요
  };

  const handleInquiry = () => {
    navigate("/Inquiry");
  };

  // 게시글 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts`);
        setPosts(response.data); // 가져온 게시글 목록을 상태에 저장
      } catch (error) {
        console.error("게시글 가져오기 중 오류:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <BoardLayout>
      <div className="text-5xl text-center">
        <div className="bg-customColor1 w-full px-3 py-20 rounded-lg flex items-center justify-center text-white text-bold">고객 문의</div>
      </div>
      <BoardNav />
      <InquiriesList posts={posts} /> {/* InquiriesList에 posts 전달 */}

      <div className="mt-4 flex justify-center space-x-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="검색어 입력"
          className="border border-gray-500 p-0.5 rounded w-1/2 max-w-lg"
        />
        <button
          type="button"
          onClick={handleSearchSubmit}
          className="rounded p-0.125 bg-blue-500 text-white"
        >
          검색
        </button>
        <button
          type="button"
          onClick={handleInquiry}
          className="rounded p-1 bg-green-500 text-white"
        >
          작성
        </button>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: 5 }, (_, index) => (
          <button
            key={index + 1}
            type="button"
            onClick={() => handleNavigate(`/page${index + 1}`)}
            className="rounded p-2 bg-indigo-600 text-white hover:bg-indigo-500 transition duration-200"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </BoardLayout>
  );
};

export default UserInquiries;
