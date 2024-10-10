import React, { useState } from "react";
import { joinPostAsync } from "../../slice/JoinSlice";
import { useDispatch } from "react-redux";

const JoinComponent = () => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState(""); // 아이디 입력값 상태
  const [password, setPassword] = useState(""); // 비밀번호 입력값 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 입력값 상태
  const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태
  const [username, setUserName] = useState(""); // 사용자 성명 입력값 상태
  const [userPhone, setUserPhone] = useState(""); // 사용자 전화번호 입력값 상태
  const [userEmail, setUserEmail] = useState(""); // 사용자 이메일 입력값 상태
  const [selectedEmail, setSelectedEmail] = useState(""); // 선택된 이메일 도메인 상태
  const [agreeTerms, setAgreeTerms] = useState(false); // 약관 동의 상태

  // 비밀번호 확인 함수
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  // 비밀번호 확인 입력 시, 비밀번호와 일치 여부를 검사
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  const handleTermsChange = () => {
    setAgreeTerms(!agreeTerms); // 체크박스 상태 토글
  };

  // 중복 확인 함수 (예시, 실제 구현 필요)
  const handleCheckDuplicate = () => {
    // 아이디 중복 확인 로직 구현
    console.log("중복 확인 로직 실행");
  };

  // 회원가입 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 사용자 데이터 객체 생성
    const userData = {
      urId: userId,
      urPw: password,
      urNm: username,
      urPhn: userPhone,
      urEml: `${userEmail}@${selectedEmail}`,
      urPrplYn: "Y", // 개인정보 이용약관 동의 여부
      urStmbplYn: "Y" // 가게 회원 약관 동의 여부
    };

    // 비밀번호 일치 여부 및 약관 동의 체크
    if (!passwordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!agreeTerms) {
      alert("약관에 동의해야 합니다.");
      return;
    }

    try {
      const response = await dispatch(joinPostAsync(userData)); // 회원가입 요청 디스패치
      if (response && response.success) {
        window.location.href = "/user/login"; // 로그인 페이지로 이동
      } else {
        alert("회원가입에 실패했습니다."); // 오류 처리
      }
    } catch (error) {
      console.error("회원가입 실패:", error); // 오류 처리
      alert("회원가입 중 오류가 발생했습니다.");
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
            onClick={handleCheckDuplicate}
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
