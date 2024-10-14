import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserModifyComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    phoneNumber: '',
    email: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // 기존 회원 정보를 불러오기 위한 useEffect
  useEffect(() => {
    axios
      .get('/api/user/profile')
      .then((response) => {
        setFormData({
          username: response.data.ur_id,
          name: response.data.ur_nm,
          phoneNumber: response.data.ur_phn,
          email: response.data.ur_eml,
        });
      })
      .catch((error) => {
        console.error("Failed to load user data", error);
      });
  }, []);

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
    <div>
      <h2>회원 정보 수정</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled
          />
        </div>

        {/* 비밀번호 변경 버튼 */}
        <div>
          <button type="button" onClick={handlePasswordChange}>
            비밀번호 변경
          </button>
        </div>

        <div>
          <label>이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>전화번호</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default UserModifyComponent;