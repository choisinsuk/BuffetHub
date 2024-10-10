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
  const headers = { "Content-Type": "application/x-www-form-urlencoded" }; // 'x-www-form-urlencoded'로 변경
  const form = new URLSearchParams(); // URLSearchParams 객체 생성 (x-www-form-urlencoded 형식에 적합)

  // FormData 대신 URLSearchParams를 사용하여 데이터 추가
  form.append("urId", joinParam.urId); // 회원 ID
  form.append("urPw", joinParam.urPw); // 비밀번호
  form.append("urNm", joinParam.urNm); // 이름
  form.append("urPhn", joinParam.urPhn); // 전화번호
  form.append("urEml", joinParam.urEml); // 이메일

  // POST 요청 보내기
  const res = await axios.post(`${host}/register`, form, { headers });

  return res.data; // 응답 데이터 반환
};