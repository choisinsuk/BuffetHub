import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 쿠키 설정 함수
//export const setCookie = (name, value, days) => {
//  const expires = new Date();
//  expires.setUTCDate(expires.getUTCDate() + days); //보관기한

//  return cookies.set(name, value, { path: "/", expires: expires });
// };

export const setCookie = (name, value) => {
  return cookies.set(name, value, { path: "/" }); // expires 옵션을 제거하여 세션 쿠키 생성
};


// 쿠키 가져오기
export const getCookie = (name) => {
  return cookies.get(name);
};

// 쿠키 삭제하기
export const removeCookie = (name, path = "/") => {
  cookies.remove(name, { path });
};