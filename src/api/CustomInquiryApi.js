import axios from "axios";

// 서버 주소
export const API_SERVER_HOST = 'http://localhost:8080';

// API 경로 설정
const prefix = `${API_SERVER_HOST}/api/inquiry`;

// 고객 문의 하나 조회 (GET 요청)
export const getOne = async (CQ_NB) => {
  try {
    const res = await axios.get(`${prefix}/${CQ_NB}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching inquiry with ID ${CQ_NB}:`, error);
    throw error;
  }
};

// 고객 문의 리스트 조회 (GET 요청)
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  try {
    const res = await axios.get(`${prefix}/list`, { params: { page: page, size: size } });
    return res.data;
  } catch (error) {
    console.error('Error fetching inquiry list:', error);
    throw error;
  }
};

// 고객 문의 추가 (POST 요청)
export const postAdd = async (inquiryObj) => {
  try {
    const res = await axios.post(`${prefix}/add`, inquiryObj);
    return res.data;
  } catch (error) {
    console.error('Error adding inquiry:', error);
    throw error;
  }
};

// 고객 문의 삭제 (DELETE 요청)
export const deleteOne = async (CQ_NB) => {
  try {
    const res = await axios.delete(`${prefix}/delete/${CQ_NB}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting inquiry with ID ${CQ_NB}:`, error);
    throw error;
  }
};

// 고객 문의 수정 (PUT 요청)
export const putOne = async (inquiryObj) => {
  try {
    const res = await axios.put(`${prefix}/modify/${inquiryObj.CQ_NB}`, inquiryObj);
    return res.data;
  } catch (error) {
    console.error(`Error updating inquiry with ID ${inquiryObj.CQ_NB}:`, error);
    throw error;
  }
};
