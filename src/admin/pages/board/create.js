import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postAdd, putOne, getOne, setAuthToken } from "../../../api/noticeApi";

const Create = () => {
  const [newNotice, setNewNotice] = useState({ ntTitle: "", ntCtt: "" });
  const [ntNb, setNtNb] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setAuthToken();
    
    const query = new URLSearchParams(location.search);
    const titleParam = query.get('title');
    const contentParam = query.get('content');
    const idParam = query.get('id');
    setNtNb(idParam);

    if (idParam) {
      fetchNoticeData(idParam);
    }
    if (titleParam) {
      setNewNotice((prev) => ({ ...prev, ntTitle: decodeURIComponent(titleParam) }));
    }
    if (contentParam) {
      setNewNotice((prev) => ({ ...prev, ntCtt: decodeURIComponent(contentParam) }));
    }
  }, [location.search]);

  const fetchNoticeData = async (id) => {
    try {
      const noticeData = await getOne(id);
      setNewNotice({ ntTitle: noticeData.ntTitle, ntCtt: noticeData.ntCtt });
    } catch (error) {
      console.error("공지사항을 불러오는 중 오류가 발생했습니다:", error);
      alert("공지사항을 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    try {
      if (ntNb) {
        await putOne({ ...newNotice, ntNb });
        alert("공지사항이 성공적으로 수정되었습니다.");
      } else {
        await postAdd(newNotice);
        alert("공지사항이 성공적으로 작성되었습니다.");
      }
      
      navigate(-1); // 이전 페이지로 이동
      console.log("Navigating back to the previous page"); // 로그 추가
    } catch (error) {
      console.error("공지사항 작성/수정 중 오류 발생:", error);
      alert("공지사항 작성/수정 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="bg-white my-5 w-full text-center px-10 py-10">
      <h2 className="text-xl font-bold mb-4">{ntNb ? "공지사항 수정" : "공지사항 작성"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="ntTitle"
            placeholder="제목"
            value={newNotice.ntTitle}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <textarea
            name="ntCtt"
            placeholder="내용"
            value={newNotice.ntCtt}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
            rows="4"
          />
        </div>
        <button type="submit" className="bg-orange-200 text-black p-2 font-semibold">
          {ntNb ? "수정" : "작성"}
        </button>
    
      </form>
    </div>
  );
};

export default Create;
