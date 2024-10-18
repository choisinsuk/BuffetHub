import jwtAxios from "../util/jwtUtil"; // JWT를 포함한 Axios 인스턴스 가져오기

// 서버 주소 설정
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/noticeboard`;

// 공지사항 목록 조회
export const fetchNotices = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page, size },
  });
  return res.data;
};

// 특정 공지사항 조회
export const fetchNoticeById = async (id) => {
  const res = await jwtAxios.get(`${prefix}/${id}`);
  return res.data;
};

// 공지사항 추가
export const createNotice = async (noticeData) => {
  const headers = { "Content-Type": "application/json" };
  const res = await jwtAxios.post(prefix, noticeData, { headers });
  return res.data;
};

// 공지사항 수정
export const updateNotice = async (id, noticeData) => {
  const headers = { "Content-Type": "application/json" };
  const res = await jwtAxios.put(`${prefix}/${id}`, noticeData, { headers });
  return res.data;
};

// 공지사항 삭제
export const deleteNotice = async (id) => {
  const res = await jwtAxios.delete(`${prefix}/${id}`);
  return res.data;
};
