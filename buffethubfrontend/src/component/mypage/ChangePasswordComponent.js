import React, { useState } from "react";
import { changePassword } from "../../api/userApi";

const ChangePasswordComponent = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urId = getCookie("user"); // 쿠키 이름이 'user'라고 가정
    console.log("Retrieved urId:", urId);

    if (!urId) {
      setErrorMessage("사용자 ID를 가져오는 데 실패했습니다.");
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
      // 비밀번호 변경 성공 시 추가 작업 (예: 사용자에게 성공 메시지 표시)
    } catch (err) {
      setErrorMessage(
        "비밀번호 변경 중 오류가 발생했습니다. 다시 시도해 주세요."
      );
      console.error(
        "Error changing password:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 처리할 로직 (예: 페이지 이동)
    // 예시: history.goBack();
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
        style={{ width: "100%", maxWidth: "600px" }}
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
              width: "120px",
            }} // 라벨 너비 조정
          >
            현재 비밀번호
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            required
            autoComplete="current-password" // 현재 비밀번호
            style={{
              padding: "10px",
              width: "calc(100% - 130px)", // 라벨과 마진을 고려한 너비 조정
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
              width: "120px",
            }} // 라벨 너비 조정
          >
            새 비밀번호
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
            autoComplete="new-password" // 새 비밀번호
            style={{
              padding: "10px",
              width: "calc(100% - 130px)", // 라벨과 마진을 고려한 너비 조정
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
              width: "120px",
            }} // 라벨 너비 조정
          >
            새 비밀번호 확인
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            autoComplete="new-password" // 새 비밀번호 확인
            style={{
              padding: "10px",
              width: "calc(100% - 130px)", // 라벨과 마진을 고려한 너비 조정
              border: "2px solid black",
              borderRadius: "4px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            onClick={handleCancel}
            style={{
              padding: "10px 20px",
              backgroundColor: "lightgray",
              color: "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            취소
          </button>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "orange",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
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
