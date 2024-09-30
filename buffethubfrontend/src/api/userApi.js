import axios from "axios"
import { API_SERVER_HOST } from "./todoApi"

const host = `${API_SERVER_HOST}/api/user`

export const loginPost = async (loginParam) => {
  console.log("서버로 전송되는 loginParam: ", loginParam);
  
  const header = {headers: {"Content-Type" : "x-www-form-urlencoded"}}

  const form = new FormData()
  form.append('ur_id', loginParam.id)
  form.append('ur_pw', loginParam.pw)

  const res = await axios.post(`${host}/login`, form, header)

  return res.data
}