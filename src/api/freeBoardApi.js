import axios from "axios";

// 서버주소
export const API_SERVER_HOST = 'http://localhost:8080';

// API 엔드포인트 prefix 설정
const prefix = `${API_SERVER_HOST}/api/admin/freeBoard`;

// Axios 인스턴스 생성
// 매 요청마다 baseURL과 Content-Type 헤더가 자동으로 포함됩니다.
export const axiosInstance = axios.create({
  baseURL: API_SERVER_HOST, // 기본 서버 URL 설정
  headers: {
    "Content-Type": "application/json" // 모든 요청에서 JSON 형식의 데이터를 사용
  },
});

// JWT 토큰을 Axios 인스턴스의 Authorization 헤더에 추가하는 함수
// 이 함수는 API 요청 전에 반드시 호출해야 Authorization 헤더에 토큰이 포함됩니다.
export const setAuthToken = () => {
  const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 JWT 토큰 가져오기
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`; // 토큰이 있으면 Authorization 헤더 추가
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"]; // 토큰이 없으면 헤더에서 삭제
  }
};

// 특정 게시글을 조회하는 API 호출 함수
// @param {number} ftNb - 조회하려는 게시글의 고유 번호
// @returns {object} - 조회한 게시글 데이터
export const getOne = async (ftNb) => {
  try {
    // `GET /api/admin/freeBoard/{ftNb}` API 요청
    const res = await axiosInstance.get(`${prefix}/${ftNb}`);
    return res.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error fetching notice:", error); // 오류 발생 시 콘솔에 로그 출력
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리하도록 함
  }
};

// 게시글 목록을 조회하는 API 호출 함수
// @param {object} options - 페이지네이션 옵션
// @param {number} options.page - 페이지 번호 (기본값: 0)
// @param {number} options.size - 페이지 당 항목 수 (기본값: 10)
// @returns {array} - 조회한 게시글 목록 데이터
export const getList = async ({ page = 0, size = 10 } = {}) => {
  try {
    // `GET /api/admin/freeBoard/list` API 요청, 페이지네이션 옵션을 포함하여 전달
    const res = await axiosInstance.get(`${prefix}/list`, { params: { page, size } });
    return res.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error fetching freeBoard list:", error);
    throw error;
  }
};

// 새로운 게시글을 추가하는 API 호출 함수
// @param {object} freeBoardObj - 추가할 게시글 정보 객체
// @returns {object} - 추가한 게시글 데이터
export const postAdd = async (freeBoardObj) => {
  try {
    // `POST /api/admin/freeBoard/` API 요청, 추가할 게시글 데이터를 포함하여 전달
    const res = await axiosInstance.post(`${prefix}/`, freeBoardObj);
    return res.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error adding freeBoard:", error);
    throw error;
  }
};

// 특정 게시글을 삭제하는 API 호출 함수
// @param {number} ftNb - 삭제하려는 게시글의 고유 번호
// @returns {object} - 삭제된 게시글 데이터
export const deleteOne = async (ftNb) => {
  try {
    // `DELETE /api/admin/freeBoard/{ftNb}` API 요청
    const res = await axiosInstance.delete(`${prefix}/${ftNb}`);
    return res.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error deleting freeBoard:", error);
    throw error;
  }
};

// 특정 게시글을 수정하는 API 호출 함수
// @param {object} freeBoard - 수정할 게시글 정보 객체
// @param {number} freeBoard.ftNb - 수정하려는 게시글의 고유 번호
// @returns {object} - 수정된 게시글 데이터
export const putOne = async (freeBoard) => {
  try {
    // `PUT /api/admin/freeBoard/{ftNb}` API 요청, 수정할 게시글 데이터를 포함하여 전달
    const res = await axiosInstance.put(`${prefix}/${freeBoard.ftNb}`, freeBoard);
    return res.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error updating freeBoard:", error);
    throw error;
  }
};
