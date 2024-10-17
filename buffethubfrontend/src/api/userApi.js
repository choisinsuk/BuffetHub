import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";
import { jwtDecode } from "jwt-decode";

const host = `${API_SERVER_HOST}/api/user`;

// JWT 토큰을 가져오는 함수
const getToken = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("user="))
    ?.split("=")[1]; // 'user'라는 쿠키에서 토큰을 추출
};

export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();
  form.append("username", loginParam.username);
  form.append("password", loginParam.password);

  const res = await axios.post(`${host}/login`, form, header);

  return res.data;
};

// 회원가입 함수
export const joinPost = async (joinParam) => {
  const headers = { "Content-Type": "application/json" }; // JSON 형식으로 변경

  // POST 요청 보내기
  const res = await axios.post(`${host}/register`, joinParam, { headers });

  return res.data; // 응답 데이터 반환
};

// 사용자 프로필 가져오기
export const getUserProfile = async (urId) => {
  const response = await axios.get(`${host}/profile/${urId}`);
  return response.data;
};

export const updateUserProfile = async (urId, updatedData) => {
  // JWT 토큰을 가져오는 함수 호출
  const token = getToken(); // 이 부분은 사용자에 맞게 수정 필요

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
  };

  try {
    const response = await axios.put(
      `${host}/profileupdate/${urId}`,
      updatedData,
      { headers }
    );
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error(
      "Error updating profile:",
      error.response ? error.response.data : error.message
    );
    throw error; // 에러를 다시 던져서 호출자에게 알림
  }
};

export const changePassword = async (
  urId,
  currentPassword,
  newPassword,
  confirmPassword
) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
  };

  // 요청 본문 출력
  const requestBody = {
    currentPassword,
    newPassword,
    confirmPassword,
  };
  console.log("Request body:", JSON.stringify(requestBody, null, 2)); // 요청 본문을 JSON 형식으로 출력

  try {
    const res = await axios.put(
      `${host}/change-password/${urId}`,
      requestBody, // JSON 형식으로 데이터 전송
      { headers }
    );
    return res.data; // 성공 시 응답 데이터 반환
  } catch (error) {
    console.error(
      "Error changing password:",
      error.response ? error.response.data : error.message
    );
    throw error; // 에러를 다시 던져서 호출자에게 알림
  }
};

// 아이디 찾기 함수
export const findUserId = async (name, email) => {
  try {
    const response = await axios.post(
      `${host}/search/id`,
      {
        name,
        email,
      },
      {
        headers: {
          "Content-Type": "application/json", // JSON으로 요청을 보냅니다.
        },
      }
    );
    return response.data; // 응답 데이터를 반환합니다.
  } catch (error) {
    throw error; // 에러를 던집니다.
  }
};

// 비밀번호 찾기 함수
export const findPassword = async (urId, urEml) => {
  try {
    const response = await axios.post(
      `${host}/search/password`,
      {
        urId,
        urEml,
      },
      {
        headers: {
          "Content-Type": "application/json", // JSON으로 요청을 보냅니다.
        },
      }
    );
    return response.data; // 응답 데이터를 반환합니다.
  } catch (error) {
    throw error; // 에러를 던집니다.
  }
};

export const checkIdApi = async (urId) => {
  try {
    const response = await axios.get(`${host}/checkId/${urId}`);
    return response;
  } catch (error) {
    console.error("아이디 중복 확인 실패:", error);
    throw error;
  }
};
