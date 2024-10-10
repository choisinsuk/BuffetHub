import React, { useState } from "react";
import { joinPostAsync } from "../../slice/JoinSlice";
import { useDispatch } from "react-redux";

const JoinComponent = () => {
  const dispatch = useDispatch();
  
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [username, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  const handleTermsChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      urId: userId,
      urPw: password,
      urNm: username,
      urPhn: userPhone,
      urEml: `${userEmail}@${selectedEmail}`,
      urPrplYn: "Y",
      urStmbplYn: "Y",
    };

    try {
      const response = await dispatch(joinPostAsync(userData));
      if (response && response.success) {
        window.location.href = "/user/login";
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginTop: "20px",
      maxHeight: "90vh",
      overflowY: "auto",
      paddingRight: "20px",
    }}>
      <h1 style={{
        color: "orange",
        marginBottom: "20px",
        fontWeight: "bold",
        fontSize: "24px",
      }}>
        뷔페허브 회원가입
      </h1>

      {/* 아이디 입력 */}
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
        <label htmlFor="userId-input" style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "20px" }}>
          아이디
        </label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            id="userId-input"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="영문, 숫자 포함 8~25자"
            style={{
              padding: "10px",
              width: "500px",
              border: "2px solid black",
              borderRadius: "4px",
              marginRight: "10px",
            }}
          />
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            중복확인
          </button>
        </div>
      </div>

      {/* 비밀번호 입력 */}
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
        <label htmlFor="password-input" style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "20px" }}>
          비밀번호
        </label>
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="영문, 숫자 포함 8~25자"
          style={{
            padding: "10px",
            width: "645px",
            border: "2px solid black",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* 비밀번호 확인 입력 */}
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
        <label htmlFor="confirm-password-input" style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "20px" }}>
          비밀번호 확인
        </label>
        <input
          id="confirm-password-input"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="비밀번호 한 번 더 입력"
          style={{
            padding: "10px",
            width: "645px",
            border: "2px solid black",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* 이름 입력 */}
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
        <label htmlFor="username-input" style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "20px" }}>
          이름
        </label>
        <input
          id="username-input"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="2~10자 한글"
          style={{
            padding: "10px",
            width: "645px",
            border: "2px solid black",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* 전화번호 입력 */}
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
        <label htmlFor="userPhone-input" style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "20px" }}>
          전화번호
        </label>
        <input
          id="userPhone-input"
          type="text"
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
          placeholder="'-' 없이 11자리를 입력"
          style={{
            padding: "10px",
            width: "645px",
            border: "2px solid black",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* 이메일 입력 */}
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
        <label htmlFor="userEmail-input" style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "20px" }}>
          이메일
        </label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            id="userEmail-input"
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="이메일 주소 입력"
            style={{
              padding: "10px",
              width: "300px",
              border: "2px solid black",
              borderRadius: "4px",
              marginRight: "10px",
            }}
          />
          <span style={{ marginRight: "5px" }}>@</span>
          <select
            id="email-select"
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
            style={{
              padding: "10px",
              border: "2px solid black",
              borderRadius: "4px",
            }}
          >
            <option value="">이메일 도메인 선택</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
            {/* 추가 이메일 도메인 옵션 추가 가능 */}
          </select>
        </div>
      </div>

      {/* 약관 동의 체크박스 */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={handleTermsChange}
          style={{ marginRight: "5px" }}
        />
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>약관에 동의합니다.</span>
      </div>

      {/* 제출 버튼 */}
      <button
        onClick={handleSubmit}
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
        가입하기
      </button>
    </div>
  );
};

export default JoinComponent;