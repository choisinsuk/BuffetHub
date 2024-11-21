import React, { useEffect, useState } from "react"; // React와 훅 임포트
import { useLocation, useNavigate } from "react-router-dom"; // URL 위치와 페이지 이동을 위한 훅 임포트
import { postAdd, putOne, getOne, setAuthToken } from "../../../../api/freeBoardApi"; // API 함수 임포트

const FreeCreate = () => {
  const [newFreeBoard, setNewFreeBoard] = useState({ ftTitle: "", ftCtt: "" }); // 새 게시글 상태 초기화
  const [ftNb, setFtNb] = useState(null); // 게시글 번호 상태 초기화
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
  const location = useLocation(); // 현재 URL 위치 가져오기

  useEffect(() => {
    setAuthToken(); // JWT 토큰 설정

    const query = new URLSearchParams(location.search); // URL 쿼리 파라미터 가져오기
    const titleParam = query.get('title'); // 제목 파라미터 가져오기
    const contentParam = query.get('content'); // 내용 파라미터 가져오기
    const idParam = query.get('id'); // 게시글 ID 파라미터 가져오기
    setFtNb(idParam); // 게시글 번호 상태 설정

    // 게시글 ID가 있을 경우 데이터 가져오기
    if (idParam) {
      fetchFreeBoardData(idParam);
    }
    
    // 제목과 내용 파라미터가 있을 경우 상태 업데이트
    if (titleParam) {
      setNewFreeBoard((prev) => ({ ...prev, ftTitle: decodeURIComponent(titleParam) }));
    }
    if (contentParam) {
      setNewFreeBoard((prev) => ({ ...prev, ftCtt: decodeURIComponent(contentParam) }));
    }
  }, [location.search]); // location.search가 변경될 때마다 실행

  // 게시글 데이터를 가져오는 함수
  const fetchFreeBoardData = async (id) => {
    try {
      const freeBoardData = await getOne(id); // 게시글 데이터 가져오기
      // 상태에 게시글 제목과 내용 설정
      setNewFreeBoard({ ftTitle: freeBoardData.ftTitle, ftCtt: freeBoardData.ftCtt });
    } catch (error) {
      console.error("자유게시판 불러오는 중 오류가 발생했습니다:", error); // 오류 로그
      alert("자유게시판 불러오는 중 오류가 발생했습니다."); // 오류 메시지
    }
  };

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target; // 이벤트 타겟에서 name과 value 가져오기
    setNewFreeBoard({ ...newFreeBoard, [name]: value }); // 상태 업데이트
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    try {
      if (ftNb) {
        // 게시글 ID가 있을 경우 수정
        await putOne({ ...newFreeBoard, ftNb });
        alert("자유게시판 성공적으로 수정되었습니다."); // 수정 성공 메시지
      } else {
        // 게시글 ID가 없을 경우 새 게시글 작성
        await postAdd(newFreeBoard);
        alert("자유게시판 성공적으로 작성되었습니다."); // 작성 성공 메시지
      }
      
      navigate(-1); // 이전 페이지로 이동
      console.log("Navigating back to the previous page"); // 로그 추가
    } catch (error) {
      console.error("자유게시판 작성/수정 중 오류 발생:", error); // 오류 로그
      alert("자유게시판 작성/수정 중 오류가 발생했습니다. 다시 시도해 주세요."); // 오류 메시지
    }
  };

  return (
    <div className="bg-white my-5 w-full text-center px-10 py-10">
      <h2 className="text-xl font-bold mb-4">{ftNb ? "자유게시판 수정" : "자유게시판 작성"}</h2> {/* 수정 또는 작성 제목 표시 */}
      <form onSubmit={handleSubmit} className="space-y-4"> {/* 폼 제출 시 handleSubmit 호출 */}
        <div>
          <input
            type="text"
            name="ftTitle" // 제목 입력 필드
            placeholder="제목" // 필드 플레이스홀더
            value={newFreeBoard.ftTitle} // 상태에서 제목 값 가져오기
            onChange={handleInputChange} // 입력 변경 시 핸들러 호출
            required // 필수 입력
            className="border p-2 w-full"
          />
        </div>
        <div>
          <textarea
            name="ftCtt" // 내용 입력 필드
            placeholder="내용" // 필드 플레이스홀더
            value={newFreeBoard.ftCtt} // 상태에서 내용 값 가져오기
            onChange={handleInputChange} // 입력 변경 시 핸들러 호출
            required // 필수 입력
            className="border p-2 w-full"
            rows="4" // 행 수 설정
          />
        </div>
        <button type="submit" className="bg-orange-200 text-black p-2 font-semibold">
          {ftNb ? "수정" : "작성"} {/* 수정 또는 작성 버튼 텍스트 설정 */}
        </button>
        
      </form>
    </div>
  );
};

export default FreeCreate; // 컴포넌트 내보내기
