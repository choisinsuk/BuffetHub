import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";
import { logout } from "../slice/loginSlice";

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
  const response = await jwtAxios.get(`${host}/profile/${urId}`);
  return response.data;
};

export const updateUserProfile = async (urId, updatedData) => {
  try {
    const response = await jwtAxios.put(
      `${host}/profileupdate/${urId}`,
      updatedData
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
    const response = await jwtAxios.post(
      `${host}/search/id`,
      {
        name,
        email,
      },
    );
    return response.data; // 응답 데이터를 반환합니다.
  } catch (error) {
    throw error; // 에러를 던집니다.
  }
};

// 비밀번호 찾기 함수
export const findPassword = async (urId, urEml) => {
  try {
    const response = await jwtAxios.post(
      `${host}/search/password`,
      {
        urId,
        urEml,
      },
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

export const withdrawUser = async (urId, dispatch) => {

  try {
    const response = await fetch(`${host}/withdraw/${urId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const message = await response.text();
      alert(message); // 탈퇴 완료 메시지

      // 쿠키 제거 및 메인 페이지로 이동
      dispatch(logout()); // 쿠키 제거 및 로그아웃 처리
      window.location.href = "/"; // 메인 페이지로 이동
    } else {
      const errorMessage = await response.text();
      alert("진행 중인 예약이 있으면 탈퇴가 불가능합니다."); // 오류 메시지
    }
  } catch (error) {
    console.error("회원 탈퇴 실패:", error);
    alert("회원 탈퇴 중 오류가 발생했습니다.");
  }
};


// 쿠키 제거 및 로그아웃 처리
export const logoutUser = (dispatch) => {
  dispatch(logout()); // Redux 스토어에서 로그아웃 처리
  window.location.href = "/"; // 메인 페이지로 이동
};


// 현재 비밀번호 확인 함수
export const checkPassword = async (urId, currentPassword) => {
  try {
    const response = await jwtAxios.post(
      `${host}/chk-password`,
      {
        urId,              // 현재 로그인한 사용자 ID
        currentPassword,   // 현재 비밀번호
      },
    );
    return response.data; // 응답 데이터를 반환합니다.
  } catch (error) {
    console.error("비밀번호 확인 실패:", error);
    throw error; // 에러를 던집니다.
  }
};