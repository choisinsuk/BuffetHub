import React, { useState } from "react";

const JoinComponent = () => {
  const [userId, setUserId] = useState(""); // 아이디 입력값 상태
  const [password, setPassword] = useState(""); // 비밀번호 입력값 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 입력값 상태
  const [isDuplicate, setIsDuplicate] = useState(null); // 중복 여부 상태
  const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태
  const [username, setUserName] = useState(""); // 사용자 성명 입력값 상태
  const [userPhone, setUserPhone] = useState(""); // 사용자 전화번호 입력값 상태
  const [userEmail, setUserEmail] = useState(""); // 사용자 전화번호 입력값 상태
  const [selectedCarrier, setSelectedCarrier] = useState(""); // 선택된 통신사 상태
  const [selectedEmail, setSelectedEmail] = useState(""); // 선택된 통신사 상태
  const [emailDomain, setEmailDomain] = useState(""); // 이메일 도메인 입력값 상태
  const [agreeTerms, setAgreeTerms] = useState(false); // 약관 동의 상태

  // 중복 확인 함수 (이 부분은 API 호출로 대체할 수 있습니다.)
  const handleCheckDuplicate = () => {
    // 임시 중복 체크 로직 (서버와 연동하여 중복 체크 구현 가능)
    const existingUsernames = ["user1", "user2", "user3"]; // 예제용 사용자 아이디 목록
    setIsDuplicate(existingUsernames.includes(username));
  };

  // 비밀번호 확인 함수
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // 비밀번호 변경 시, 비밀번호 확인과 일치 여부를 검사
    setPasswordMatch(e.target.value === confirmPassword);
  };

  // 비밀번호 확인 입력 시, 비밀번호와 일치 여부를 검사
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  const handleEmailSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedEmail(selectedValue);
    // "직접입력" 선택 시 이메일 입력값 초기화 및 도메인 선택 드롭다운 숨김
    if (selectedValue === "carrier9") {
      setUserEmail("");
    }
  };

  const handleTermsChange = () => {
    setAgreeTerms(!agreeTerms); // 체크박스 상태 토글
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: "20px",
        maxHeight: "90vh", // 여기서 최대 높이를 설정
        overflowY: "auto", // 스크롤 가능하도록 설정
        paddingRight: "20px", // 오른쪽 패딩 추가 (스크롤바를 위해)
      }}
    >
      {/* 제목 추가 */}
      <h1
        style={{
          color: "orange",
          marginBottom: "20px",
          fontWeight: "bold",
          fontSize: "24px",
        }}
      >
        뷔페허브 회원가입
      </h1>

      {/* 아이디 제목과 입력칸을 세로로 정렬 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <label
          htmlFor="username-input"
          style={{
            marginBottom: "5px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          아이디
        </label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            id="userId-input"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="영문, 숫자 포함 8~25자" // placeholder 텍스트 수정
            style={{
              padding: "10px",
              width: "500px", // 가로 크기 증가
              border: "2px solid black", // 검은색 테두리
              borderRadius: "4px",
              marginRight: "10px", // 버튼과 간격 추가
            }}
          />
          <button
            onClick={handleCheckDuplicate}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ccc", // 회색 배경
              color: "#fff", // 흰색 글자
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

      {/* 비밀번호 제목과 입력칸을 세로로 정렬 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <label
          htmlFor="password-input"
          style={{
            marginBottom: "5px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          비밀번호
        </label>
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="영문, 숫자 포함 8~25자"
          style={{
            padding: "10px",
            width: "645px",
            border: "2px solid black",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* 비밀번호 확인 제목과 입력칸을 세로로 정렬 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <label
          htmlFor="password-input"
          style={{
            marginBottom: "5px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
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

      {/* 비밀번호 확인 제목과 입력칸을 세로로 정렬 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <label
          htmlFor="password-input"
          style={{
            marginBottom: "5px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
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

      {/* 전화번호 제목과 입력칸을 세로로 정렬 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <label
          htmlFor="username-input"
          style={{
            marginBottom: "5px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          전화번호
        </label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <select
            id="carrier-select"
            value={selectedCarrier}
            onChange={(e) => setSelectedCarrier(e.target.value)}
            style={{
              padding: "10px",
              width: "135px",
              marginRight: "10px", // 입력칸과 간격 추가
              border: "2px solid black",
              borderRadius: "4px",
              color: selectedCarrier ? "black" : "#ccc", // 선택된 통신사 색상 조정
            }}
          >
            <option value="" disabled>
              통신사
            </option>
            <option value="carrier1">LG U+</option>
            <option value="carrier2">KT</option>
            <option value="carrier3">SKT</option>
            <option value="carrier4">알뜰폰</option>
          </select>
          <input
            id="userPhone-input"
            type="text"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            placeholder="'-' 없이 11자리를 입력" // placeholder 텍스트 수정
            style={{
              padding: "10px",
              width: "500px", // 가로 크기 증가
              border: "2px solid black", // 검은색 테두리
              borderRadius: "4px",
              marginRight: "10px", // 버튼과 간격 추가
            }}
          />
        </div>
      </div>

      {/* 이메일 제목과 입력칸을 세로로 정렬 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <label
          htmlFor="useremail-input"
          style={{
            marginBottom: "5px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          이메일
        </label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            id="userEmail-input"
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="이메일 주소 입력" // placeholder 텍스트 수정
            style={{
              padding: "10px",
              width: "300px", // 가로 크기 증가
              border: "2px solid black", // 검은색 테두리
              borderRadius: "4px",
              marginRight: "10px", // 버튼과 간격 추가
            }}
          />
          <span style={{ marginRight: "5px" }}>@</span> {/* "@" 기호 추가 */}
          {selectedEmail === "carrier9" ? ( // "직접입력" 선택 시 입력 필드 표시
            <input
              type="text"
              value={emailDomain}
              onChange={(e) => setEmailDomain(e.target.value)}
              placeholder="직접 입력" // 직접 입력할 때의 placeholder
              style={{
                padding: "10px",
                width: "305px",
                border: "2px solid black",
                borderRadius: "4px",
              }}
            />
          ) : (
            <select
              id="email-select"
              value={selectedEmail}
              onChange={handleEmailSelectChange}
              style={{
                padding: "10px",
                width: "300px",
                marginRight: "10px", // 입력칸과 간격 추가
                border: "2px solid black",
                borderRadius: "4px",
                color: selectedEmail ? "black" : "#ccc", // 선택된 이메일 색상 조정
              }}
            >
              <option value="" disabled>
                선택해주세요
              </option>
              <option value="carrier1">naver.com</option>
              <option value="carrier2">gmail.com</option>
              <option value="carrier3">hanmail.com</option>
              <option value="carrier4">nate.com</option>
              <option value="carrier5">hotmail.com</option>
              <option value="carrier6">daum.net</option>
              <option value="carrier7">outlook.com</option>
              <option value="carrier8">kakao.com</option>
              <option value="carrier9">직접입력</option>
            </select>
          )}
        </div>
      </div>

      {/* 비밀번호 일치 여부 메시지 표시 */}
      {!passwordMatch && (
        <span style={{ marginTop: "10px", color: "red", fontWeight: "bold" }}>
          비밀번호가 일치하지 않습니다.
        </span>
      )}

      {/* 중복 여부에 따라 메시지 표시 */}
      {isDuplicate !== null && (
        <span
          style={{
            marginTop: "10px",
            color: isDuplicate ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {isDuplicate
            ? "이미 존재하는 아이디입니다."
            : "사용 가능한 아이디입니다."}
        </span>
      )}

      {/* 연한 회색 실선 추가 */}
      <hr
        style={{
          border: "1px solid lightgray",
          width: "100%",
          marginTop: "20px",
        }}
      />

      {/* 약관 동의 체크박스 추가 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "10px",
        }}
      >
        <label style={{ fontSize: "18px" }}>
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={handleTermsChange}
            style={{ marginRight: "10px" }} // 체크박스와 텍스트 사이의 간격 추가
          />
          약관 전체 동의
        </label>
        <label style={{ fontSize: "16px" }}>
          <input
            type="checkbox"
            onChange={() => {}}
            style={{ marginRight: "10px" }}
          />
          서비스 이용 약관
        </label>
        <label style={{ fontSize: "16px" }}>
          <input
            type="checkbox"
            onChange={() => {}}
            style={{ marginRight: "10px" }}
          />
          개인정보 수집 및 이용
        </label>
      </div>
    </div>
  );
};

export default JoinComponent;
