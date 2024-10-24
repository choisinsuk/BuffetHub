import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne, putOne, deleteOne, setAuthToken } from "../../../../api/noticeApi"; // noticeApi에서 필요한 함수 임포트

const initState = {
    ntNb: 0,
    ntTitle: '',
    ntCtt: '',
    ntRegdt: '',
    complete: false,
};

const NoticeModify = () => {
    const { ntNb } = useParams(); // URL 파라미터에서 공지사항 번호 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
    const [noticeBoard, setNoticeBoard] = useState({ ...initState }); // 공지사항 상태 초기화

    // 컴포넌트가 마운트될 때 토큰을 설정
    useEffect(() => {
        setAuthToken(); // JWT 토큰 설정
    }, []);

    // 공지사항 데이터를 가져오는 useEffect
    useEffect(() => {
        if (ntNb) {
            getOne(ntNb) // noticeApi의 getOne 함수 사용
                .then((data) => {
                    if (data) {
                        setNoticeBoard(data); // 가져온 데이터를 상태에 설정
                    } else {
                        console.error("공지사항 정보를 찾을 수 없습니다.");
                    }
                })
                .catch((e) => {
                    console.error("공지사항을 가져오는 중 오류 발생:", e);
                });
        }
    }, [ntNb]);

    // 입력값 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNoticeBoard({ ...noticeBoard, [name]: value }); // 상태 업데이트
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지
        try {
            await putOne(noticeBoard); // noticeApi의 putOne 함수 사용
            alert("공지사항이 성공적으로 수정되었습니다.");
            navigate('/noticeBoard'); // 수정 후 공지사항 목록으로 이동
        } catch (error) {
            console.error("공지사항 수정 중 오류 발생:", error);
            alert("공지사항 수정 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    // 공지사항 삭제 핸들러
    const handleDelete = async () => {
        if (ntNb) {
            try {
                await deleteOne(ntNb); // noticeApi의 deleteOne 함수 사용
                alert("공지사항이 성공적으로 삭제되었습니다.");
                navigate('/noticeBoard'); // 삭제 후 공지사항 목록으로 이동
            } catch (error) {
                console.error("공지사항 삭제 중 오류 발생:", error);
                alert("공지사항 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
            }
        } else {
            alert("게시글 ID가 없습니다.");
        }
    };

    // navigate(-1) 호출을 컴포넌트 외부에서 하던 것을 삭제
    // 이 부분은 더 이상 필요하지 않습니다.

    return (
        <div className="bg-white my-5 w-full text-center px-10 py-10">
            <h2 className="text-xl font-bold mb-4">공지사항 수정</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="ntTitle"
                        placeholder="제목"
                        value={noticeBoard.ntTitle}
                        onChange={handleInputChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <textarea
                        name="ntCtt"
                        placeholder="내용"
                        value={noticeBoard.ntCtt}
                        onChange={handleInputChange}
                        required
                        className="border p-2 w-full"
                        rows="4"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">
                    수정
                </button>
                <button type="button" onClick={handleDelete} className="bg-red-500 text-white p-2 ml-2">
                    삭제
                </button>
                <button type="button" onClick={() => navigate(-1)} className="bg-gray-500 text-white p-2 ml-2">
                    취소
                </button>
            </form>
        </div>
    );
};

export default NoticeModify;
