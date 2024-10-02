import React, { useState } from "react"; // React 및 useState 훅 가져오기
import { useNavigate } from "react-router-dom"; // 라우팅을 위한 useNavigate 훅 가져오기
import axios from "axios"; // HTTP 요청을 위한 axios 가져오기
import BoardLayout from "../../layouts/BoardParts/BoardLayout"; // 레이아웃 컴포넌트 가져오기

const Make = () => {
  const navigate = useNavigate(); // navigate 함수 초기화
  // 상태 관리: 제목, 메뉴 제목, 내용 초기화
  const [title, setTitle] = useState("TITLE");
  const [menuTitle, setMenuTitle] = useState("새로운 메뉴 출시!");
  const [content, setContent] = useState("새로운 메뉴가 출시되었습니다!");

  // 뒤로가기 버튼 클릭 시 이전 페이지로 이동
  const handleGoBack = () => {
    navigate(-1);
  };

  // 제출 버튼 클릭 시 실행되는 함수
  const handleSubmit = async () => {
    // 제목, 메뉴 제목, 내용이 비어 있는지 확인
    if (!title.trim() || !menuTitle.trim() || !content.trim()) {
      alert("작성해주세요"); // 경고 메시지
      return;
    }

    // 새 게시글 데이터 생성
    const newPost = {
      title,
      menuTitle,
      content,
    };

    try {
      // 백엔드에 새 게시글 전송
      const response = await axios.post('/api/posts', newPost);
      console.log("게시물 작성 성공:", response.data); // 성공 메시지 로그
      navigate("/notice"); // 공지사항 관리 페이지로 이동
    } catch (error) {
      console.error("게시물 작성 중 오류:", error); // 오류 로그
      alert("게시물 작성 중 오류가 발생했습니다."); // 사용자에게 오류 알림
    }
  };

  // 내용 편집 영역에 포커스 시 기본 내용 지우기
  const handleContentFocus = (e) => {
    if (content === "새로운 메뉴가 출시되었습니다!") {
      setContent(""); // 기본 내용 지우기
    }
  };

  return (
    <BoardLayout>
      <div className="text-5xl text-center">
        <div>공지사항 작성</div> {/* 공지사항 작성 제목 */}
      </div>
      <div className="mt-8">
        <table className="mx-auto text-center w-full border-none">
          <thead>
            <tr>
              <th className="p-2 text-left">
                <div contentEditable  className="w-full border border-gray-400 rounded p-2"
                  onInput={(e) => setTitle(e.currentTarget.textContent)} // 제목 입력 시 상태 업데이트
                  suppressContentEditableWarning={true} // 경고 방지
                >
                  {title} {/* 제목 표시 */}
                </div>
              </th>
              <th className="p-2 text-left">
                <div contentEditable
                  className="w-full border border-gray-400 rounded p-2"
                  onInput={(e) => setMenuTitle(e.currentTarget.textContent)} // 메뉴 제목 입력 시 상태 업데이트
                  suppressContentEditableWarning={true} // 경고 방지
                >
                  {menuTitle} {/* 메뉴 제목 표시 */}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 h-96" colSpan="2">
                <div
                  contentEditable
                  className="w-full h-full border border-gray-400 rounded p-2"
                  onInput={(e) => setContent(e.currentTarget.textContent)} // 내용 입력 시 상태 업데이트
                  onFocus={handleContentFocus} // 포커스 시 기본 내용 지우기 (포커스는 텍스트 입력 필드나 버튼을 클릭할 때 요소가 활성하면서 입력가능해진 상태)
                  suppressContentEditableWarning={true} // 경고 방지
                >
                  {content} {/* 내용 표시 */}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleGoBack} // 뒤로가기 버튼 클릭 시 함수 실행
          className="bg-blue-500 text-white rounded p-2 mr-2"
        >
          뒤로가기
        </button>
        <button
          onClick={handleSubmit} // 제출 버튼 클릭 시 함수 실행
          className="bg-yellow-500 text-white rounded p-2"
        >
          작성완료
        </button>
      </div>
    </BoardLayout>
  );
};

export default Make; // Make 컴포넌트 내보내기
