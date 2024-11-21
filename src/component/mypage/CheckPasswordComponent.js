import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { checkPassword } from "../../api/userApi"; // 비밀번호 확인을 위한 API 함수

const CheckPasswordComponent = () => {
  const [formData, setFormData] = useState({
    username: "", // 사용자 ID
    password: "", // 비밀번호
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies(); // 쿠키 가져오기
  const navigate = useNavigate();

  // 기존 회원 정보를 불러오기 위한 useEffect
  useEffect(() => {
    const user = cookies.user; // 쿠키에서 토큰 가져오기

    if (!user) {
      setErrorMessage("사용자 인증이 필요합니다."); // 사용자 정보가 없을 경우 오류 메시지 설정
      return;
    }

    // 사용자 ID 자동 입력
    setFormData((prev) => ({
      ...prev,
      username: user.urId, // 쿠키에서 urId로 사용자 ID 설정
    }));
  }, [cookies]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    try {
      const isValid = await checkPassword(formData.username, formData.password);
      if (isValid) {
        // 비밀번호 확인 성공 시 mypage/userinfo로 이동
        navigate("/mypage/userinfo");
      } else {
        setErrorMessage("비밀번호가 올바르지 않습니다."); // 비밀번호가 틀린 경우 메시지 설정
      }
    } catch (error) {
      console.error("비밀번호 확인 실패", error);
      setErrorMessage("비밀번호 확인 중 오류가 발생했습니다."); // 오류 발생 시 메시지 설정
    }
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 사용자 정보를 보여주는 페이지로 이동
    navigate("/mypage/myreservations");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // 중앙 정렬
        marginTop: "20px",
        maxHeight: "90vh",
        overflowY: "auto",
        paddingRight: "20px",
      }}
    >
      <h2
        style={{
          color: "orange",
          marginBottom: "20px",
          fontWeight: "bold",
          fontSize: "24px",
        }}
      >
        뷔페 허브 개인정보 수정
      </h2>
      <p style={{ color: "black", fontSize: "14px", marginBottom: "20px" }}>
        회원님의 정보를 보호하기 위해 비밀번호를 한 번 더 입력해주세요.
      </p>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "600px",
          position: "relative", // 버튼 위치를 위한 상대적 위치 설정
          paddingBottom: "80px", // 폼 하단 공간 확보
        }}
      >
        {/* 아이디 입력 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <label
            style={{
              marginRight: "10px",
              fontWeight: "bold",
              fontSize: "20px",
              width: "100px",
            }}
          >
            아이디
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            readOnly // 수정 불가
            style={{
              padding: "10px",
              width: "calc(100% - 120px)", // 라벨 너비를 고려한 너비 조정
              border: "2px solid black",
              borderRadius: "4px",
              backgroundColor: "#f9f9f9", // 비활성화된 필드 스타일
            }}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <label
            style={{
              marginRight: "10px",
              fontWeight: "bold",
              fontSize: "20px",
              width: "100px",
            }}
          >
            비밀번호
          </label>
          <input
            type="password"
            name="password"
            value={formData.password} // 비밀번호 입력
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            } // 비밀번호 변경
            required // 필수 입력
            style={{
              padding: "10px",
              width: "calc(100% - 120px)", // 라벨 너비를 고려한 너비 조정
              border: "2px solid black",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* 취소, 확인 버튼 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center", // 버튼들을 중앙에 정렬
            gap: "10px", // 버튼 사이의 간격
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            onClick={handleCancel}
            style={{
              padding: "10px 20px",
              backgroundColor: "white", // 흰색 배경
              color: "black", // 글자 색상
              border: "2px solid black", // 검은색 테두리
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              marginRight: "10px", // 버튼 간 간격
              fontSize: "20px",
            }}
          >
            취소
          </button>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "orange",
              border: "2px solid black", // 검은색 테두리
              color: "#fff",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            확인
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckPasswordComponent;
