import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BoardLayout from "../../layouts/BoardParts/BoardLayout";

const Answer = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("제목 : ");
  const [menuTitle, setMenuTitle] = useState("글쓴이 : ");
  const [content, setContent] = useState("내용 : ");

  const titleRef = useRef(null);
  const menuTitleRef = useRef(null);
  const contentRef = useRef(null);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !menuTitle.trim() || !content.trim()) {
      alert("작성해주세요");
      return;
    }

    const newPost = {
      title,
      menuTitle,
      content,
    };

    try {
      const response = await axios.post('/api/posts', newPost);
      console.log("후기 작성 성공:", response.data);
      navigate("/reviewBoard");
    } catch (error) {
      console.error("게시물 작성 중 오류:", error);
      alert("게시물 작성 중 오류가 발생했습니다.");
    }
  };

  const handleInput = (setter, initialText) => (e) => {
    const text = e.currentTarget.textContent;
    if (text === initialText) {
      return;
    }
    setter(text);
  };

  const handleBlur = (e, initialText) => {
    if (e.currentTarget.textContent.trim() === "") {
      e.currentTarget.textContent = initialText;
    }
  };

  const handleFocus = (e, initialText) => {
    if (e.currentTarget.textContent === initialText) {
      e.currentTarget.textContent = "";
    }
  };

  return (
    <BoardLayout>
      <div className="text-5xl text-center">
        <div>후기게시판 작성</div>
      </div>
      <div className="mt-8">
        <table className="mx-auto text-center w-full border-none">
          <thead>
            <tr>
              <th className="p-2 text-left">
                <div
                  ref={titleRef}
                  contentEditable
                  className="w-full border border-gray-400 rounded p-2"
                  onInput={handleInput(setTitle, "제목 : ")}
                >
                  {title}
                </div>
              </th>
              <th className="p-2 text-left">
                <div
                  ref={menuTitleRef}
                  contentEditable
                  className="w-full border border-gray-400 rounded p-2"
                  onInput={handleInput(setMenuTitle, "글쓴이 : ")}
                  suppressContentEditableWarning={true}
                >
                  {menuTitle}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 h-48" colSpan="2"> {/* Adjusted height for the content area */}
                <div
                  ref={contentRef}
                  contentEditable
                  className="w-full h-full border border-gray-400 rounded p-2 text-left"
                  onInput={handleInput(setContent, "내용 : ")}
                  suppressContentEditableWarning={true}
                >
                  {content}
                </div>
                
              </td>
            </tr>
          </tbody>
        </table>
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

export default Answer;
