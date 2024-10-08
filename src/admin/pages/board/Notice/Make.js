import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import BoardLayout from "../../../layouts/BoardParts/BoardLayout"; 

const API_URL = 'http://localhost:8080/api'; // Spring Boot 서버 URL

const Make = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [menuTitle, setMenuTitle] = useState("");
  const [content, setContent] = useState("");

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !menuTitle.trim() || !content.trim()) {
      alert("작성해주세요");
      return;
    }

    const newPost = { title, menuTitle, content };

    try {
      const response = await axios.post(`${API_URL}/posts`, newPost);
      console.log("게시물 작성 성공:", response.data);
      navigate("/notice");
    } catch (error) {
      console.error("게시물 작성 중 오류:", error);
      alert("게시물 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <BoardLayout>
      <div className="text-5xl text-center">
        <div className="bg-customColor1 w-full px-3 py-20 rounded-lg flex items-center justify-center text-white text-bold">공지사항 작성</div>
      </div>
      <div className="mt-8">
        <div className="mx-auto w-full">
          <div className="flex flex-col">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full border border-gray-400 rounded p-2 mb-2"
              placeholder="TITLE"
            />
            <input
              type="text"
              value={menuTitle}
              onChange={(e) => setMenuTitle(e.target.value)} 
              className="w-full border border-gray-400 rounded p-2 mb-2"
              placeholder="새로운 메뉴 출시!"
            />
            <textarea
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="w-full h-60 border border-gray-400 rounded p-2"
              placeholder="내용을 입력하세요."
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleGoBack} 
          className="bg-blue-500 text-white rounded p-2 mr-2"
        >
          뒤로가기
        </button>
        <button
          onClick={handleSubmit} 
          className="bg-yellow-500 text-white rounded p-2"
        >
          작성완료
        </button>
      </div>
    </BoardLayout>
  );
};

export default Make;
