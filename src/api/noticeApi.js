import axios from "axios";

// 서버주소
export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/admin/noticeBoard`;

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: API_SERVER_HOST, // 기본 URL
  headers: {
    "Content-Type": "application/json"
  },
});

// JWT 토큰을 Axios 인스턴스의 Authorization 헤더에 추가하는 함수
export const setAuthToken = () => {
  const token = localStorage.getItem("accessToken"); // JWT 토큰 가져오기
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Authorization 헤더 설정
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"]; // 토큰이 없으면 헤더에서 삭제
  }
};

// API 호출 함수들
export const getOne = async (ntNb) => {
  try {
    const res = await axiosInstance.get(`${prefix}/${ntNb}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching notice:", error);
    throw error; // 에러 발생 시 호출한 곳에서 처리할 수 있도록 에러 던지기
  }
};

export const getList = async ({ page = 0, size = 10 } = {}) => {
  try {
    const res = await axiosInstance.get(`${prefix}/list`, { params: { page, size } });
    return res.data;
  } catch (error) {
    console.error("Error fetching notice list:", error);
    throw error;
  }
};

export const postAdd = async (noticeObj) => {
  try {
    const res = await axiosInstance.post(`${prefix}/`, noticeObj);
    return res.data;
  } catch (error) {
    console.error("Error adding notice:", error);
    throw error;
  }
};

export const deleteOne = async (ntNb) => {
  try {
    const res = await axiosInstance.delete(`${prefix}/${ntNb}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting notice:", error);
    throw error;
  }
};

export const putOne = async (noticeBoard) => {
  try {
    const res = await axiosInstance.put(`${prefix}/${noticeBoard.ntNb}`, noticeBoard);
    return res.data;
  } catch (error) {
    console.error("Error updating notice:", error);
    throw error;
  }
};
