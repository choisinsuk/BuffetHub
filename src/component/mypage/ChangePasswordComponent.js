import React, { useState } from "react";
import { changePassword } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const ChangePasswordComponent = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // 쿠키에서 사용자 ID를 가져오는 함수
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      const decoded = decodeURIComponent(parts.pop().split(";").shift());
      return JSON.parse(decoded).urId; // JSON으로 파싱하여 urId 반환
    }
  };

  const validateNewPassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,25}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urId = getCookie("user"); // 쿠키 이름이 'user'라고 가정
    console.log("Retrieved urId:", urId);

    if (!urId) {
      setErrorMessage("사용자 ID를 가져오는 데 실패했습니다.");
      return;
    }

    // 새 비밀번호 유효성 검사
    if (!validateNewPassword(newPassword)) {
      setErrorMessage(
        "새 비밀번호는 영문자와 숫자를 포함하여 8~25자여야 합니다."
      );
      return;
    }

    // 새 비밀번호와 확인 비밀번호 일치 여부 확인
    if (newPassword !== confirmPassword) {
      setErrorMessage("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    // 비밀번호 변경 API 요청
    try {
      const result = await changePassword(
        urId,
        currentPassword,
        newPassword,
        confirmPassword
      ); // 개별 인자 전달
      console.log("Password change successful:", result);

      // 성공 메시지 알림
      alert("비밀번호 변경에 성공하였습니다.");
      navigate("/mypage/userinfo"); // 성공 후 마이페이지로 이동
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErrorMessage("현재 비밀번호를 다시 입력해주세요.");
      } else {
        setErrorMessage(
          "현재 비밀번호를 다시 입력해주세요."
        );
      }
      console.error(
        "Error changing password:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 사용자 정보를 보여주는 페이지로 이동
    navigate("/mypage/userinfo");
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
        비밀번호 변경
      </h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "600px",
          position: "relative", // 버튼 배치 조정을 위한 상대적 위치 설정
          padding: "0 20px", // 양쪽에 약간의 패딩 추가
          fontSize: "24px",
        }}
      >
        {/* 현재 비밀번호 입력 */}
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
              width: "150px", // 라벨 너비 조정
              fontSize: "18px",
            }}
          >
            현재 비밀번호
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            required
            autoComplete="current-password"
            style={{
              padding: "10px",
              width: "calc(100% - 170px)", // 라벨 너비를 고려한 너비 조정
              border: "2px solid black",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* 새 비밀번호 입력 */}
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
              width: "150px", // 라벨 너비 조정
              fontSize: "18px",
            }}
          >
            새 비밀번호
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
            autoComplete="new-password"
            style={{
              padding: "10px",
              width: "calc(100% - 170px)", // 라벨 너비를 고려한 너비 조정
              border: "2px solid black",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* 새 비밀번호 확인 입력 */}
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
              width: "150px", // 라벨 너비 조정
              fontSize: "18px",
            }}
          >
            새 비밀번호 확인
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            autoComplete="new-password"
            style={{
              padding: "10px",
              width: "calc(100% - 170px)", // 라벨 너비를 고려한 너비 조정
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

export default ChangePasswordComponent;
