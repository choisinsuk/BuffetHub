import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const rest_api_key = `a4bb6d5a7164720e9698ab811fb6a2b0`; //REST 키값
const redirect_uri = `http://localhost:3000/user/kakao`;
const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;
const access_token_url = `https://kauth.kakao.com/oauth/token`;

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  return kakaoURL;
};

export const getAccessToken = async (authCode) => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  };

  const res = await axios.post(access_token_url, params, header);
  const accessToken = res.data.access_token;

  return accessToken;
};

export const getUserWithAccessToken = async (accessToken) => {
  console.log('Access Token:', accessToken); // Token 값 확인
  const res = await
axios.get(`${API_SERVER_HOST}/api/user/kakao?accessToken=${accessToken}`)
return res.data
};