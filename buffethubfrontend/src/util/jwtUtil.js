import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/todoApi";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {
  const host = API_SERVER_HOST;
  const header = { headers: { Auhorization: `Bearer ${accessToken}` } };
  const res = await axios.get(
    `${host}/api/user/refresh?refreshToken=${refreshToken}`,
    header
  );

  console.log(res.data);

  return res.data;
};

//before request
const beforeReq = (config) => {
  console.log("before request");

  const userInfo = getCookie("user");

  if (!userInfo) {
    console.log("User not found");
    return Promise.reject({
      response: {
        data: { error: "REQUIRE_LOGIN" },
      },
    });
  }

  const { accessToken } = userInfo;
  // Authorization 헤더 처리
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

//fail request
const requestFail = (err) => {
  console.log("request error");
  return Promise.reject(err);
};

//before return response
const beforeRes = async (res) => {
  console.log("before return response");
  console.log(res);

  const data = res.data;

  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    const userCookieValue = getCookie("user");

    const result = await refreshJWT(
      userCookieValue.accessToken,
      userCookieValue.refreshToken
    );
    console.log("refreshJWT RESULT", result);

    userCookieValue.accessToken = result.accessToken;
    userCookieValue.refreshToken = result.refreshToken;

    setCookie("user", JSON.stringify(userCookieValue), 1);

    //원래 호출
    const originalRequest = res.config;
    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
    return await axios(originalRequest);
  }
  return res;
};

//fail response
const responseFail = (err) => {
  console.log("response fail error");
  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);
export default jwtAxios;
