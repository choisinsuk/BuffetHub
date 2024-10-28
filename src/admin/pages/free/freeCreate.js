import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postAdd, putOne, getOne, setAuthToken } from "../../../api/freeBoardApi";

const FreeCreate = () => {
  const [newFreeBoard, setNewFreeBoard] = useState({ ftTitle: "", ftCtt: "" });
  const [ftNb, setFtNb] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setAuthToken();
    
    const query = new URLSearchParams(location.search);
    const titleParam = query.get('title');
    const contentParam = query.get('content');
    const idParam = query.get('id');
    setFtNb(idParam);

    if (idParam) {
      fetchFreeBoardData(idParam);
    }
    if (titleParam) {
      setNewFreeBoard((prev) => ({ ...prev, ftTitle: decodeURIComponent(titleParam) }));
    }
    if (contentParam) {
      setNewFreeBoard((prev) => ({ ...prev, ftCtt: decodeURIComponent(contentParam) }));
    }
  }, [location.search]);

  const fetchFreeBoardData = async (id) => {
    try {
      const freeBoardData = await getOne(id);
      setNewFreeBoard({ ftTitle: freeBoardData.ftTitle, ftCtt: freeBoardData.ftCtt });
    } catch (error) {
      console.error("자유게시판 불러오는 중 오류가 발생했습니다:", error);
      alert("자유게시판 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFreeBoard({ ...newFreeBoard, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (ftNb) {
        await putOne({ ...newFreeBoard, ftNb });
        alert("자유게시판 성공적으로 수정되었습니다.");
      } else {
        await postAdd(newFreeBoard);
        alert("자유게시판 성공적으로 작성되었습니다.");
      }
      
      navigate(-1);
      console.log("Navigating back to the previous page");
    } catch (error) {
      console.error("자유게시판 작성/수정 중 오류 발생:", error);
      alert("자유게시판 작성/수정 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="bg-white my-5 w-full text-center px-10 py-10">
      <h2 className="text-xl font-bold mb-4">{ftNb ? "자유게시판 수정" : "자유게시판 작성"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="ftTitle"
            placeholder="제목"
            value={newFreeBoard.ftTitle}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <textarea
            name="ftCtt"
            placeholder="내용"
            value={newFreeBoard.ftCtt}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
            rows="4"
          />
        </div>
        <button type="submit" className="bg-orange-200 text-black p-2 font-semibold">
          {ftNb ? "수정" : "작성"}
        </button>
      </form>
    </div>
  );
};

export default FreeCreate;
