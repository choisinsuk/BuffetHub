import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../api/userApi';
import { useCookies } from 'react-cookie';

const UserModifyComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    phoneNumber: '',
    email: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [cookies] = useCookies(); // 쿠키 가져오기

  // 기존 회원 정보를 불러오기 위한 useEffect
  useEffect(() => {
    const user = cookies.user; // 쿠키에서 토큰 가져오기

    if (!user) {
      setErrorMessage('사용자 인증이 필요합니다.'); // 사용자 정보가 없을 경우 오류 메시지 설정
      return;
    }
  // 사용자 프로필 가져오기
  getUserProfile(user.urId)
    .then((response) => {
      console.log(response); // 응답 확인
      // 응답 데이터가 undefined가 아닐 때만 설정
      if (response && response.urId) { // 여기에서 urId를 확인
        setFormData({
          username: response.urId, // ur_id에 맞춰 수정
          name: response.urNm, // ur_nm에 맞춰 수정
          phoneNumber: response.urPhn, // ur_phn에 맞춰 수정
          email: response.urEml, // ur_eml에 맞춰 수정
        });
      } else {
        setErrorMessage('사용자 정보를 불러오는 데 실패했습니다.'); // 오류 메시지 설정
      }
    })
    .catch((error) => {
      console.error("Failed to load user data", error);
      setErrorMessage('회원 정보를 불러오는 데 실패했습니다.'); // 오류 메시지 설정
    });
}, [cookies]);

  // 입력 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    // 서버에 회원 정보 수정 요청
    axios
      .put('/api/user/profile', formData)
      .then((response) => {
        alert('회원 정보가 성공적으로 수정되었습니다.');
        navigate('/main'); // 수정 완료 후 메인 페이지로 이동
      })
      .catch((error) => {
        setErrorMessage('회원 정보 수정에 실패했습니다.');
        console.error("Error updating profile", error);
      });
  };

  // 비밀번호 변경 페이지로 이동
  const handlePasswordChange = () => {
    navigate('/change-password'); // 비밀번호 변경 페이지로 리디렉션
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
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
        {/* 아이디 입력 */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <label
            style={{ marginRight: "10px", fontWeight: "bold", fontSize: "20px", width: "100px" }}
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
        <div style={{ marginBottom: "10px" }}>
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
            }}
          >
            비밀번호 변경
          </button>
        </div>

        {/* 이름 입력 */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <label
            style={{ marginRight: "10px", fontWeight: "bold", fontSize: "20px", width: "100px" }}
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
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <label
            style={{ marginRight: "10px", fontWeight: "bold", fontSize: "20px", width: "100px" }}
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

        {/* 이메일 입력 */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <label
            style={{ marginRight: "10px", fontWeight: "bold", fontSize: "20px", width: "100px" }}
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
          수정하기
        </button>
      </form>
    </div>
  );
};

export default UserModifyComponent;
