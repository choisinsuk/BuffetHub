import {Cookies} from "react-cookie";

const cookies = new Cookies()

export const setCookie = (name, value, days) => {  // 쿠키 저장
  const expires = new Date()
  expires.setUTCDate(expires.getUTCDate() + days) // 보관기한
  return cookies.set(name, value, { path: '/', expires: expires})
}

export const getCookie = (name) => { //쿠키 조회
  return cookies.get(name)
}

export const removeCookie = (name, path = '/') => {  //쿠키 삭제
  cookies.remove(name, {path})
}