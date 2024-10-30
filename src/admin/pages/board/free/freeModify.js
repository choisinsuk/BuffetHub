import { useEffect, useState } from "react"; // React의 훅 임포트
import { useParams, useNavigate } from "react-router-dom"; // URL 파라미터와 페이지 이동을 위한 훅 임포트
import { getOne, putOne, deleteOne, setAuthToken } from "../../../../api/freeBoardApi"; // freeBoard 관련 API 함수 임포트

// 상태 초기화 객체
const initState = {
    ftNb: 0, // 게시글 번호
    ftTitle: '', // 게시글 제목
    ftCtt: '', // 게시글 내용
    ftRegdt: '', // 게시글 등록 날짜
    complete: false, // 완료 여부
};

const FreeModify = () => {
    const { ftNb } = useParams(); // URL 파라미터에서 게시글 번호 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
    const [freeBoard, setFreeBoard] = useState({ ...initState }); // 게시글 상태 초기화

    // 컴포넌트가 마운트될 때 JWT 토큰을 설정
    useEffect(() => {
        setAuthToken(); // JWT 토큰 설정
    }, []);

    // 게시글 데이터를 가져오는 useEffect
    useEffect(() => {
        if (ftNb) {
            getOne(ftNb) // freeBoardApi의 getOne 함수 사용
                .then((data) => {
                    if (data) {
                        setFreeBoard(data); // 가져온 데이터를 상태에 설정
                    } else {
                        console.error("자유게시판 정보를 찾을 수 없습니다."); // 오류 로그
                    }
                })
                .catch((e) => {
                    console.error("자유게시판 가져오는 중 오류 발생:", e); // 오류 로그
                });
        }
    }, [ftNb]);

    // 입력값 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target; // 이벤트 타겟에서 name과 value 가져오기
        console.log(`Field name: ${name}, value: ${value}`); // 값 확인용 로그 추가
        setFreeBoard({ ...freeBoard, [name]: value }); // 상태 업데이트
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
        console.log("Submitting freeBoard:", freeBoard); // 제출할 데이터 로그 추가

        // 제목과 내용 입력 확인
        if (!freeBoard.ftTitle || !freeBoard.ftCtt) {
            alert("제목과 내용을 모두 입력해주세요."); // 입력 확인 경고
            return;
        }

        try {
            await putOne(freeBoard); // freeBoardApi의 putOne 함수 사용
            alert("자유게시판 성공적으로 수정되었습니다."); // 수정 성공 메시지
            navigate(-1); // 수정 후 이전 페이지로 이동
        } catch (error) {
            console.error("자유게시판 수정 중 오류 발생:", error); // 오류 로그
            alert("자유게시판 수정 중 오류가 발생했습니다. 다시 시도해 주세요."); // 오류 메시지
        }
    };

    // 게시글 삭제 핸들러
    const handleDelete = async () => {
        if (ftNb) {
            try {
                await deleteOne(ftNb); // freeBoardApi의 deleteOne 함수 사용
                alert("자유게시판 성공적으로 삭제되었습니다."); // 삭제 성공 메시지
                navigate(-1); // 삭제 후 이전 페이지로 이동
            } catch (error) {
                console.error("자유게시판 삭제 중 오류 발생:", error); // 오류 로그
                alert("자유게시판 삭제 중 오류가 발생했습니다. 다시 시도해 주세요."); // 오류 메시지
            }
        } else {
            alert("게시글 ID가 없습니다."); // 게시글 ID가 없을 경우 경고 메시지
        }
    };

    // 취소 버튼 핸들러
    const handleCancel = () => {
        navigate(-1); // 이전 페이지로 이동
        console.log("Navigating back to the previous page"); // 로그 추가
    };

    return (
        <div className="bg-white my-5 w-full text-center px-10 py-10">
            <h2 className="text-xl font-bold mb-4">자유게시판 삭제</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="ftTitle" // 제목 입력 필드
                        placeholder="제목" // 필드 플레이스홀더
                        value={freeBoard.ftTitle} // 상태에서 제목 값 가져오기
                        onChange={handleInputChange} // 입력 변경 시 핸들러 호출
                        required // 필수 입력
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <textarea
                        name="ftCtt" // 내용 입력 필드
                        placeholder="내용" // 필드 플레이스홀더
                        value={freeBoard.ftCtt} // 상태에서 내용 값 가져오기
                        onChange={handleInputChange} // 입력 변경 시 핸들러 호출
                        required // 필수 입력
                        className="border p-2 w-full"
                        rows="4" // 행 수 설정
                    />
                </div>
             
                <button type="button" onClick={handleDelete} className="bg-orange-200 text-black p-2 ml-2 font-semibold">
                    삭제
                </button>
                <button type="button" onClick={handleCancel} className="bg-orange-200 text-black p-2 ml-2 font-semibold">
                    취소 
                </button>
            </form>
        </div>
    );
};

export default FreeModify; // 컴포넌트 내보내기
