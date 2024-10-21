import React, { useEffect, useState } from "react";
import { checkIdAsync, joinPostAsync } from "../../slice/JoinSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResultModal from "../common/ResultModal";
import TermsAgreeComponent from "./TermsAgreeComponent";

const JoinComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputUrId, setUrId] = useState(""); // 아이디
  const [inputUrPw, setUrPw] = useState(""); //비밀번호
  const [inputCkPw, setCkPw] = useState(""); // 비밀번호 확인
  const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치
  const [inputUrNm, setUrNm] = useState(""); // 이름
  const [inputUrPhn, setUrPhn] = useState(""); // 전화번호
  const [inputUrEml, setUrEml] = useState(""); // 이메일
  const [selectedEmail, setSelectedEmail] = useState(""); //이메일 주소
  const [agreePrivacyPolicy, setAgreePrivacyPolicy] = useState(false);
  const [agreeStoreTerms, setAgreeStoreTerms] = useState(false);
  const [directDomain, setDirectDomain] = useState(""); // 이메일도메인 직접입력

  const [isIdChecked, setIsIdChecked] = useState(false); // 중복 체크 상태

  // 모달 상태 관리
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  // 에러 메시지 상태
  const [errorMessages, setErrorMessages] = useState({
    idError: "",
    passwordError: "",
    nmError: "",
    phnError: "",
  });

  useEffect(() => {
    setPasswordMatch(inputUrPw === inputCkPw);
  }, [inputUrPw, inputCkPw]);

  const handlePasswordChange = (e) => {
    setUrPw(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setCkPw(e.target.value);
  };

  // 이메일 주소 업데이트하는 함수
  const updateEmail = (username, domain) => {
    // 도메인이 "direct"일 경우 직접 입력된 도메인 사용
    if (domain === "direct" && directDomain) {
      domain = directDomain; // 직접 입력된 도메인으로 설정
    }

    // 도메인이 유효할 경우 이메일 주소 설정
    if (domain) {
      setUrEml(`${username}@${domain}`); // 최종 이메일 주소 설정
    } else {
      setUrEml(username); // 도메인이 없을 경우 사용자 이름만 설정
    }
  };

  // 아이디 중복 확인 비동기 함수
  const handleCheckDuplicateId = async () => {
    try {
      const isDuplicate = await dispatch(checkIdAsync(inputUrId)).unwrap(); // 백엔드에 중복확인 API 요청
      if (isDuplicate) {
        openModal("사용중인 아이디입니다."); // 중복된 아이디일 경우 모달 열기
        setIsIdChecked(false); // 중복일 경우 체크 상태 초기화
      } else {
        openModal("사용가능한 아이디입니다."); // 사용 가능한 아이디일 경우 모달 열기
        setIsIdChecked(true); // 중복이 아닐 경우 체크 상태 업데이트
      }
    } catch (error) {
      console.error("아이디 중복 확인 실패:", error);
      openModal("아이디 중복 확인 중 오류가 발생했습니다.");
    }
  };

  const openModal = (content, title) => {
    setModalContent(content);
    setModalTitle(title);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const validateInput = () => {
    const idRegex = /^[A-Za-z0-9]{8,25}$/; // 영문자와 숫자만 포함, 8~25자
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,25}$/; // 영문, 숫자 포함 8~25자
    const nameRegex = /^[가-힣]{2,10}$/; // 한글, 2~10자
    const phoneRegex = /^010\d{8}$/; // 010으로 시작하고 11자리 숫자



    const newErrorMessages = {
      idError: "",
      passwordError: "",
      nmError: "",
      phnError: "",
    };

    if (!idRegex.test(inputUrId)) {
      newErrorMessages.idError =
        "아이디는 영문, 숫자를 포함하여 8~25자여야 합니다.";
    }

    if (!passwordRegex.test(inputUrPw)) {
      newErrorMessages.passwordError =
        "비밀번호는 영문, 숫자를 포함하여 8~25자여야 합니다.";
    }

    if (!nameRegex.test(inputUrNm)) {
      newErrorMessages.nmError = "이름은 2~10자로 이루어진 한글이어야 합니다.";
    }

    if (!phoneRegex.test(inputUrPhn)) {
      newErrorMessages.phnError =
        "전화번호는 010으로 시작하는 11자리 숫자이어야 합니다.";
    }


    setErrorMessages(newErrorMessages);

    return (
      !newErrorMessages.idError &&
      !newErrorMessages.passwordError &&
      !newErrorMessages.nmError &&
      !newErrorMessages.phnError
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 약관 동의 여부 확인
    if (!agreePrivacyPolicy || !agreeStoreTerms) {
      alert("약관에 모두 동의해야 회원가입을 진행할 수 있습니다.");
      return; // 약관에 동의하지 않으면 제출하지 않음
    }

    // 중복 체크 확인
    if (!isIdChecked) {
      alert("아이디 중복 체크를 먼저 수행해주세요.");
      return; // 중복 체크가 이루어지지 않으면 제출하지 않음
    }

    // 비밀번호 일치 여부 및 약관 동의 체크
    if (!passwordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!validateInput()) {
      return; // 유효성 검증 실패 시 제출하지 않음
    }

    const userData = {
      urId: inputUrId,
      urPw: inputUrPw,
      urNm: inputUrNm,
      urPhn: inputUrPhn,
      urEml: inputUrEml, // 여기서 이미 처리된 이메일 주소를 사용
      urPrplYn: agreePrivacyPolicy ? "Y" : "N", // 개인정보 약관 동의 여부
      urStmbplYn: agreeStoreTerms ? "Y" : "N", // 가게 회원 약관 동의 여부
    };

    try {
      const response = await dispatch(joinPostAsync(userData)).unwrap(); // joinPostAsync 호출
      if (response.success) {
        // 성공 시
        alert("회원가입이 완료되었습니다")
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
        maxHeight: "80vh",
        overflowY: "auto",
        paddingRight: "20px",
      }}
    >
      <h1
        style={{
          color: "orange",
          marginBottom: "20px", // 아래쪽 여백을 40px로 조정
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
            onClick={handleCheckDuplicateId} // 중복확인 버튼 클릭 시 호출
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
        {errorMessages.idError && (
          <span style={{ color: "red", fontWeight: "bold" }}>
            {errorMessages.idError}
          </span>
        )}
      </div>

      {/* 모달창 표시 */}
      {modalVisible && (
        <ResultModal
          title={modalTitle}
          content={modalContent}
          callbackFn={closeModal}
        />
      )}

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
          style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "18px" }}
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
        {errorMessages.passwordError && (
          <span style={{ color: "red", fontWeight: "bold" }}>
            {errorMessages.passwordError}
          </span>
        )}
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
        {errorMessages.nmError && (
          <span style={{ color: "red", fontWeight: "bold" }}>
            {errorMessages.nmError}
          </span>
        )}
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
        {errorMessages.phnError && (
          <span style={{ color: "red", fontWeight: "bold" }}>
            {errorMessages.phnError}
          </span>
        )}
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
          {/* 사용자 이름 입력 */}
          <input
            id="userEmail-input"
            type="text"
            value={inputUrEml.split("@")[0]} // '@' 앞부분만 보여줌
            onChange={(e) => {
              const username = e.target.value; // 사용자 이름 업데이트
              // 이메일 주소 업데이트
              updateEmail(username, selectedEmail); // 도메인을 선택된 것으로 업데이트
            }}
            placeholder="이메일 주소 입력"
            style={{
              padding: "10px",
              width: "300px", // 넓이 조정
              border: "2px solid black",
              borderRadius: "4px",
              marginRight: "5px",
            }}
          />
          <span style={{ marginRight: "5px" }}>@</span>

          {/* 도메인 입력 부분 */}
          {selectedEmail === "direct" ? (
            <input
              type="text"
              value={directDomain}
              onChange={(e) => {
                const domain = e.target.value; // 직접 입력된 도메인 업데이트
                setDirectDomain(domain); // 직접 입력된 도메인 업데이트

                const username = inputUrEml.split("@")[0]; // '@' 앞부분만 추출
                // 이메일 주소 업데이트
                updateEmail(username, domain); // 직접 입력된 도메인으로 이메일 업데이트
              }}
              placeholder="도메인 직접 입력"
              style={{
                padding: "10px",
                border: "2px solid black",
                borderRadius: "4px",
                width: "305px", // 넓이 조정
                marginLeft: "5px",
              }}
            />
          ) : (
            <select
              id="email-select"
              value={selectedEmail}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedEmail(value);
                const username = inputUrEml.split("@")[0]; // '@' 앞부분만 추출
                // 이메일 주소 업데이트
                updateEmail(username, value); // 선택된 도메인으로 이메일 업데이트
              }}
              style={{
                padding: "10px",
                border: "2px solid black",
                borderRadius: "4px",
                width: "305px", // 넓이 조정
                marginLeft: "5px",
              }}
            >
              <option value="">이메일 도메인 선택</option>
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.net">daum.net</option>
              <option value="hanmail.net">hanmail.net</option>
              <option value="nate.com">nate.com</option>
              <option value="outlook.com">outlook.com</option>
              <option value="kakao.com">kakao.com</option>
              <option value="direct">직접 입력</option>
            </select>
          )}
        </div>
      </div>

      <TermsAgreeComponent
        agreePrivacyPolicy={agreePrivacyPolicy}
        setAgreePrivacyPolicy={setAgreePrivacyPolicy}
        agreeStoreTerms={agreeStoreTerms}
        setAgreeStoreTerms={setAgreeStoreTerms}
      />

      {/* 제출 버튼 */}
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "orange",
          width: "650px",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        회원가입
      </button>
    </div>
  );
};

export default JoinComponent;
