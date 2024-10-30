import axios from "axios";  

// 서버 주소
export const API_SERVER_HOST = 'http://localhost:8080';

// 공통 URL prefix 설정
const prefix = `${API_SERVER_HOST}/api/inquiry`; 

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: API_SERVER_HOST, // 기본 URL 설정
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

// 특정 고객 문의 조회 (GET)
export const getOne = async (cqNb) => { // ID 기반 조회
  try {
    const res = await axiosInstance.get(`${prefix}/${cqNb}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching inquiry:", error); // 에러 로그 출력
    throw error; // 에러 던지기
  }
};

// 고객 문의 리스트 조회 (GET) - 페이지네이션 가능
export const getList = async ({ page = 0, size = 10 } = {}) => {
  try {
    const res = await axiosInstance.get(`${prefix}/list`, { params: { page, size } });
    return res.data;
  } catch (error) {
    console.error("Error fetching inquiry list:", error); // 에러 로그 출력
    throw error;
  }
};

// 고객 문의 추가 (POST)
export const postAdd = async (inquiryObj) => {
  try {
    const res = await axiosInstance.post(`${prefix}/`, inquiryObj); // POST 요청
    return res.data;
  } catch (error) {
    console.error("Error adding inquiry:", error); // 에러 로그 출력
    throw error;
  }
};

// 특정 고객 문의 삭제 (DELETE)
export const deleteOne = async (cqNb) => { 
  try {
    const res = await axiosInstance.delete(`${prefix}/${cqNb}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting inquiry:", error); // 에러 로그 출력
    throw error;
  }
};

// 고객 문의 수정 (PUT)
export const putOne = async (inquiryObj) => { 
  try {
    const res = await axiosInstance.put(`${prefix}/${inquiryObj.cqNb}`, inquiryObj); // PUT 요청
    return res.data;
  } catch (error) {
    console.error("Error updating inquiry:", error); // 에러 로그 출력
    throw error;
  }
};
