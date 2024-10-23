import { jwtDecode } from "jwt-decode";
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

// 토큰에서 urAuthCode 추출
export const getUserAuthCodeFromToken = () => {
  const userCookie = getCookie("user"); // 쿠키에서 "user" 값을 가져옴

  console.log("권한값", userCookie.urAuthCode)

  // 쿠키 값이 JSON 객체라면 직접 사용
  return userCookie.urAuthCode; // urAuthCode 반환
};