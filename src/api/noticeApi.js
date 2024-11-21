import axios from "axios";

// 서버 주소 정의
// API 요청의 기본 서버 주소를 설정합니다.
export const API_SERVER_HOST = 'http://localhost:8080';

// 공지사항 API 경로 prefix 설정
const prefix = `${API_SERVER_HOST}/api/admin/noticeBoard`;

// Axios 인스턴스 생성
// 이 인스턴스를 통해 매번 API 호출 시 기본 URL과 헤더가 자동으로 포함됩니다.
export const axiosInstance = axios.create({
  baseURL: API_SERVER_HOST, // 기본 서버 URL 설정
  headers: {
    "Content-Type": "application/json" // 모든 요청에서 JSON 형식의 데이터를 사용
  },
});

// JWT 토큰을 Axios 인스턴스의 Authorization 헤더에 추가하는 함수
// 이 함수는 API 요청 전에 반드시 호출하여 Authorization 헤더에 토큰이 포함되도록 설정합니다.
export const setAuthToken = () => {
  const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 JWT 토큰 가져오기
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`; // 토큰이 있으면 Authorization 헤더 추가
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"]; // 토큰이 없으면 헤더에서 삭제
  }
};

// 특정 공지사항을 조회하는 API 호출 함수
// @param {number} ntNb - 조회하려는 공지사항의 고유 번호
// @returns {object} - 조회한 공지사항 데이터
export const getOne = async (ntNb) => {
  try {
    // `GET /api/admin/noticeBoard/{ntNb}` API 요청
    const res = await axiosInstance.get(`${prefix}/${ntNb}`);
    return res.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error fetching notice:", error); // 오류 발생 시 콘솔에 로그 출력
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리하도록 함
  }
};

// 공지사항 목록을 조회하는 API 호출 함수
// @param {object} options - 페이지네이션 옵션
// @param {number} options.page - 페이지 번호 (기본값: 0)
// @param {number} options.size - 페이지 당 항목 수 (기본값: 10)
// @returns {array} - 조회한 공지사항 목록 데이터
export const getList = async ({ page = 0, size = 10 } = {}) => {
  try {
    // `GET /api/admin/noticeBoard/list` API 요청, 페이지네이션 옵션을 포함하여 전달
    const res = await axiosInstance.get(`${prefix}/list`, { params: { page, size } });
    return res.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error fetching notice list:", error);
    throw error;
  }
};

// 새로운 공지사항을 추가하는 API 호출 함수
// @param {object} noticeObj - 추가할 공지사항 정보 객체
// @returns {object} - 추가한 공지사항 데이터
export const postAdd = async (noticeObj) => {
  try {
    // `POST /api/admin/noticeBoard/` API 요청, 추가할 공지사항 데이터를 포함하여 전달
    const res = await axiosInstance.post(`${prefix}/`, noticeObj);
    return res.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error adding notice:", error);
    throw error;
  }
};

// 특정 공지사항을 삭제하는 API 호출 함수
// @param {number} ntNb - 삭제하려는 공지사항의 고유 번호
// @returns {object} - 삭제된 공지사항 데이터
export const deleteOne = async (ntNb) => {
  try {
    // `DELETE /api/admin/noticeBoard/{ntNb}` API 요청
    const res = await axiosInstance.delete(`${prefix}/${ntNb}`);
    return res.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error deleting notice:", error);
    throw error;
  }
};

// 특정 공지사항을 수정하는 API 호출 함수
// @param {object} noticeBoard - 수정할 공지사항 정보 객체
// @param {number} noticeBoard.ntNb - 수정하려는 공지사항의 고유 번호
// @returns {object} - 수정된 공지사항 데이터
export const putOne = async (noticeBoard) => {
  try {
    // `PUT /api/admin/noticeBoard/{ntNb}` API 요청, 수정할 공지사항 데이터를 포함하여 전달
    const res = await axiosInstance.put(`${prefix}/${noticeBoard.ntNb}`, noticeBoard);
    return res.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error updating notice:", error);
    throw error;
  }
};
