import axios from "axios"; 

// 서버 주소
export const API_SERVER_HOST = 'http://localhost:8080';

// 고객 문의 API 경로 prefix 설정
const prefix = `${API_SERVER_HOST}/api/inquiry`;

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: API_SERVER_HOST, // 기본 URL 설정
  headers: {
    "Content-Type": "application/json" // 모든 요청에 JSON 형식 사용
  },
});

// JWT 토큰을 Axios 인스턴스의 Authorization 헤더에 추가하는 함수
export const setAuthToken = () => {
  const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 JWT 토큰 가져오기
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Authorization 헤더 설정
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"]; // 토큰이 없으면 헤더에서 삭제
  }
};

// 특정 고객 문의 조회 (GET)
export const getOne = async (cqNb) => {
  try {
    const res = await axiosInstance.get(`${prefix}/${cqNb}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching inquiry:", error); // 에러 로그 출력
    throw error; // 에러를 다시 던짐
  }
};

// 고객 문의 목록 조회 (GET) - 페이지네이션 가능
export const getList = async ({ page = 0, size = 10 } = {}) => {
  try {
    const res = await axiosInstance.get(`${prefix}/list`, { params: { page, size } });
    return res.data;
  } catch (error) {
    console.error("Error fetching inquiry list:", error);
    throw error;
  }
};

// 고객 문의 추가 (POST)
export const postAdd = async (inquiryObj) => {
  try {
    const res = await axiosInstance.post(`${prefix}/`, inquiryObj);
    return res.data;
  } catch (error) {
    console.error("Error adding inquiry:", error);
    throw error;
  }
};

// 특정 고객 문의 삭제 (DELETE)
export const deleteOne = async (cqNb) => {
  try {
    const res = await axiosInstance.delete(`${prefix}/${cqNb}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    throw error;
  }
};

// 고객 문의 수정 (PUT)
export const putOne = async (inquiryObj) => {
  try {
    const res = await axiosInstance.put(`${prefix}/${inquiryObj.cqNb}`, inquiryObj);
    return res.data;
  } catch (error) {
    console.error("Error updating inquiry:", error);
    throw error;
  }
};
