import axios from "axios"
import { API_SERVER_HOST } from "./todoApi"

const host = `${API_SERVER_HOST}/api/user`

export const loginPost = async (loginParam) => {
  
  const header = {headers: {"Content-Type" : "x-www-form-urlencoded"}}

  const form = new FormData()
  form.append('username', loginParam.username)
  form.append('password', loginParam.password)

  const res = await axios.post(`${host}/login`, form, header)

  return res.data
}


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
