import { useState } from "react";

const TermsAgreeComponent = ({
  agreePrivacyPolicy,
  setAgreePrivacyPolicy,
  agreeStoreTerms,
  setAgreeStoreTerms,
}) => {
  const [isPrivacyExpanded, setIsPrivacyExpanded] = useState(false);
  const [isStoreExpanded, setIsStoreExpanded] = useState(false);

  const togglePrivacyExpand = () => {
    setIsPrivacyExpanded(!isPrivacyExpanded);
  };

  const toggleStoreExpand = () => {
    setIsStoreExpanded(!isStoreExpanded);
  };

  return (
    <div>
      {/* 개인정보 이용약관 */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <input
          type="checkbox"
          checked={agreePrivacyPolicy}
          onChange={() => setAgreePrivacyPolicy(!agreePrivacyPolicy)}
        />
        <label style={{ marginLeft: "5px" }}>
          개인정보 이용약관에 동의합니다.(필수)
        </label>
        <button
          type="button"
          onClick={togglePrivacyExpand}
          style={{
            marginLeft: "10px",
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
            padding: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {isPrivacyExpanded ? "접기" : "내용 보기"}
          <span style={{ marginLeft: "5px", transform: isPrivacyExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
            ▼
          </span>
        </button>
      </div>

      {isPrivacyExpanded && (
        <div style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px" }}>
          <h4>개인정보보호정책</h4>
          <p>
            개인정보 수집이용 목적: 회원가입 및 본인인증, 가게 서비스 제공 등
          </p>
        </div>
      )}

      {/* 가게 회원 약관 */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <input
          type="checkbox"
          checked={agreeStoreTerms}
          onChange={() => setAgreeStoreTerms(!agreeStoreTerms)}
        />
        <label style={{ marginLeft: "5px" }}>
          가게 회원 약관에 동의합니다.(필수)
        </label>
        <button
          type="button"
          onClick={toggleStoreExpand}
          style={{
            marginLeft: "10px",
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
            padding: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {isStoreExpanded ? "접기" : "내용 보기"}
          <span style={{ marginLeft: "5px", transform: isStoreExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
            ▼
          </span>
        </button>
      </div>

      {isStoreExpanded && (
        <div style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px" }}>
          <h4>가게 회원 약관</h4>
          <p>
            가게 회원으로서 귀하의 정보를 안전하게 보호합니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default TermsAgreeComponent;
