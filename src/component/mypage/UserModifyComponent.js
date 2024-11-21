import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  updateUserProfile,
  withdrawUser,
} from "../../api/userApi";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

const UserModifyComponent = () => {
  const dispatch = useDispatch();

  const handleWithdraw = async (urId) => {
    const confirmWithdraw = window.confirm("정말 탈퇴하시겠습니까?");
    if (confirmWithdraw) {
      await withdrawUser(urId, dispatch);
    }
  };

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    phoneNumber: "",
    email: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    phoneNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState({}); // 유효성 검증을 위한 오류 상태
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [cookies] = useCookies(); // 쿠키 가져오기

  // 기존 회원 정보를 불러오기 위한 useEffect
  useEffect(() => {
    const user = cookies.user; // 쿠키에서 토큰 가져오기

    if (!user) {
      setErrorMessage("사용자 인증이 필요합니다."); // 사용자 정보가 없을 경우 오류 메시지 설정
      return;
    }
    // 사용자 프로필 가져오기
    getUserProfile(user.urId)
      .then((response) => {
        // 응답 데이터가 undefined가 아닐 때만 설정
        if (response && response.urId) {
          // 여기에서 urId를 확인
          setFormData({
            username: response.urId, // ur_id에 맞춰 수정
            name: response.urNm, // ur_nm에 맞춰 수정
            phoneNumber: response.urPhn, // ur_phn에 맞춰 수정
            email: response.urEml, // ur_eml에 맞춰 수정
          });
        } else {
          setErrorMessage("사용자 정보를 불러오는 데 실패했습니다."); // 오류 메시지 설정
        }
      })
      .catch((error) => {
        console.error("Failed to load user data", error);
        setErrorMessage("회원 정보를 불러오는 데 실패했습니다."); // 오류 메시지 설정
      });
  }, [cookies]);

  // 입력 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidationErrors({
      ...validationErrors,
      [name]: "", // 입력할 때마다 기존 오류 메시지 초기화
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    const phonePattern = /^010\d{8}$/; // 010으로 시작하는 11자리 숫자
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 정규식

    if (!phonePattern.test(formData.phoneNumber)) {
      errors.phoneNumber =
        "전화번호는 010으로 시작하는 11자리 숫자여야 합니다.";
    }

    if (!emailPattern.test(formData.email)) {
      errors.email = "유효한 이메일 주소를 입력하세요.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return; // 오류가 있으면 서버 요청을 하지 않음
    }

    const updatedUser = {
      urPhn: formData.phoneNumber, // 전화번호
      urEml: formData.email, // 이메일
    };

    // JWT 토큰 가져오기
    const token = cookies.user.token; // 쿠키에서 토큰 가져오기 (토큰이 저장된 위치에 따라 수정 필요)

    try {
      const user = cookies.user; // 쿠키에서 사용자 정보 가져오기
      await updateUserProfile(user.urId, updatedUser, token); // 수정 요청 (토큰을 인자로 전달)

      // 수정 성공 시 추가 작업 (예: 성공 메시지 표시)
      alert("회원 정보가 수정되었습니다.");
    } catch (error) {
      console.error("Failed to update user profile", error);
      setErrorMessage("회원 정보를 수정하는 데 실패했습니다.");
    }
  };

  // 비밀번호 변경 페이지로 이동
  const handlePasswordChange = () => {
    navigate("/mypage/change-password"); // 비밀번호 확인 페이지로 리디렉션
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
        회원 정보 수정
      </h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "600px",
          position: "relative", // 버튼 위치를 위한 상대적 위치 설정
          paddingBottom: "80px", // 폼 하단 공간 확보 // 버튼 위치를 위한 상대적 위치 설정
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
            onChange={handleChange}
            disabled
            style={{
              padding: "10px",
              width: "calc(100% - 120px)", // 라벨 너비를 고려한 너비 조정
              border: "2px solid black",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* 비밀번호 변경 버튼 */}
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
          <button
            type="button"
            onClick={handlePasswordChange}
            style={{
              padding: "10px 20px",
              backgroundColor: "orange",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "calc(100% - 120px)",
            }}
          >
            비밀번호 변경
          </button>
        </div>

        {/* 이름 입력 */}
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
            이름
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly // 수정 불가능
            style={{
              padding: "10px",
              width: "calc(100% - 120px)", // 라벨 너비를 고려한 너비 조정
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
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
              전화번호
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              style={{
                padding: "10px",
                width: "calc(100% - 120px)", // 라벨 너비를 고려한 너비 조정
                border: "2px solid black",
                borderRadius: "4px",
              }}
            />
          </div>
          {/* 오류 메시지 */}
          {validationErrors.phoneNumber && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "5px",
                marginLeft: "110px",
              }}
            >
              {validationErrors.phoneNumber}
            </p>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
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
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                padding: "10px",
                width: "calc(100% - 120px)", // 라벨 너비를 고려한 너비 조정
                border: "2px solid black",
                borderRadius: "4px",
              }}
            />
          </div>
          {/* 오류 메시지 */}
          {validationErrors.email && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "5px",
                marginLeft: "110px",
              }}
            >
              {validationErrors.email}
            </p>
          )}
        </div>

        {/* 취소 및 확인 버튼 컨테이너 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center", // 중앙에 배치
            position: "absolute",
            bottom: "10px", // 폼 하단에서 10px 위로 배치
            left: "0",
            right: "0",
          }}
        >
          <button
            type="button" // type을 "button"으로 설정하여 폼 제출을 방지
            style={{
              padding: "10px 20px",
              backgroundColor: "white", // 흰색 배경
              color: "black", // 글자 색상
              border: "2px solid black", // 검은색 테두리
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              marginRight: "10px", // 버튼 간 간격
            }}
            onClick={() => {
              navigate("/mypage"); // 마이페이지 기본 경로로 이동
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
            }}
          >
            확인
          </button>
        </div>

        {/* 회원탈퇴 버튼 */}
        <div
          style={{
            position: "absolute",
            bottom: "10px", // 폼 하단에서 10px 위로 배치
            right: "10px", // 오른쪽에 고정
          }}
        >
          <button
            type="button"
            onClick={() => handleWithdraw(formData.username)}
            style={{
              padding: "10px 20px",
              backgroundColor: "gray", // 회색 배경
              color: "white", // 흰색 글자
              border: "2px solid black", // 검은색 테두리
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            회원 탈퇴
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserModifyComponent;
