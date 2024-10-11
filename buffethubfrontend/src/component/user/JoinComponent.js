import React, { useEffect, useState } from "react";
import { joinPostAsync } from "../../slice/JoinSlice";
import { useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";

const JoinComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputUrId, setUrId] = useState("");  // 아이디
  const [inputUrPw, setUrPw] = useState("");  //비밀번호
  const [inputCkPw, setCkPw] = useState("");  // 비밀번호 확인
  const [passwordMatch, setPasswordMatch] = useState(true);  // 비밀번호 일치
  const [inputUrNm, setUrNm] = useState(""); // 이름
  const [inputUrPhn, setUrPhn] = useState(""); // 전화번호
  const [inputUrEml, setUrEml] = useState("");  // 이메일
  const [selectedEmail, setSelectedEmail] = useState("");  //이메일 주소
  const [agreePrivacyPolicy, setAgreePrivacyPolicy] = useState(false);
  const [agreeStoreTerms, setAgreeStoreTerms] = useState(false);

  useEffect(() => {
    setPasswordMatch(inputUrPw === inputCkPw);
  }, [inputUrPw, inputCkPw]);

  const handlePasswordChange = (e) => {
    setUrPw(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setCkPw(e.target.value);
  };

  const handlePrivacyPolicyChange = () => {
    setAgreePrivacyPolicy(!agreePrivacyPolicy);
  };

  const handleStoreTermsChange = () => {
    setAgreeStoreTerms(!agreeStoreTerms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      urId: inputUrId,
      urPw: inputUrPw,
      urNm: inputUrNm,
      urPhn: inputUrPhn,
      urEml: `${inputUrEml}@${selectedEmail}`, // 이메일 형식 맞추기
      urPrplYn: agreePrivacyPolicy ? "Y" : "N", // 개인정보 약관 동의 여부
      urStmbplYn: agreeStoreTerms ? "Y" : "N", // 가게 회원 약관 동의 여부
    };

        // 콘솔에 회원가입 데이터 출력
        console.log("회원가입 데이터:", userData);

        try {
          const response = await dispatch(joinPostAsync(userData)).unwrap(); // joinPostAsync 호출
          if (response.success) { // 성공 시
            navigate("/user/login"); // useNavigate를 사용하여 로그인 페이지로 이동
          } else {
            alert("회원가입에 실패했습니다.");
          }
        } catch (error) {
          console.error("회원가입 실패:", error);
          alert("회원가입 도중 오류가 발생했습니다.");
        }
      };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: "20px",
        maxHeight: "90vh",
        overflowY: "auto",
        paddingRight: "20px",
      }}
    >
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

      {/* 아이디 입력 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <label
          htmlFor="userId-input"
          style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "20px" }}
        >
          아이디
        </label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            id="userId-input"
            type="text"
            value={inputUrId}
            onChange={(e) => setUrId(e.target.value)}
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <label
          htmlFor="password-input"
          style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "20px" }}
        >
          비밀번호
        </label>
        <input
          id="password-input"
          type="password"
          value={inputUrPw}
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <label
          htmlFor="confirm-password-input"
          style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "20px" }}
        >
          비밀번호 확인
        </label>
        <input
          id="confirm-password-input"
          type="password"
          value={inputCkPw}
          onChange={handleConfirmPasswordChange}
          placeholder="비밀번호 한 번 더 입력"
          style={{
            padding: "10px",
            width: "645px",
            border: "2px solid black",
            borderRadius: "4px",
          }}
        />
        {!passwordMatch && (
          <span style={{ color: "red", fontWeight: "bold" }}>
            비밀번호가 일치하지 않습니다.
          </span>
        )}
      </div>

      {/* 이름 입력 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <label
          htmlFor="username-input"
          style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "20px" }}
        >
          이름
        </label>
        <input
          id="username-input"
          type="text"
          value={inputUrNm}
          onChange={(e) => setUrNm(e.target.value)}
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <label
          htmlFor="userPhone-input"
          style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "20px" }}
        >
          전화번호
        </label>
        <input
          id="userPhone-input"
          type="text"
          value={inputUrPhn}
          onChange={(e) => setUrPhn(e.target.value)}
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <label
          htmlFor="userEmail-input"
          style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "20px" }}
        >
          이메일
        </label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            id="userEmail-input"
            type="text"
            value={inputUrEml}
            onChange={(e) => setUrEml(e.target.value)}
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

      {/* 개인정보 약관 동의 */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <input
          type="checkbox"
          checked={agreePrivacyPolicy}
          onChange={handlePrivacyPolicyChange}
        />
        <label style={{ marginLeft: "5px" }}>
          개인정보 이용약관에 동의합니다.
        </label>
      </div>

      {/* 가게 회원 약관 동의 */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <input
          type="checkbox"
          checked={agreeStoreTerms}
          onChange={handleStoreTermsChange}
        />
        <label style={{ marginLeft: "5px" }}>
          가게 회원 약관에 동의합니다.
        </label>
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
