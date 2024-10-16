import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/userApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {
  urId: "",
};

const loadUserCookie = () => {
  // 쿠키에서 로그인 정보 로딩
  const userInfo = getCookie("user");

  // 아이디 처리
  if (userInfo && userInfo.urId) {
    userInfo.urId = decodeURIComponent(userInfo.urId);
  }
  return userInfo;
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: loadUserCookie() || initState, // 쿠기가 없으면 초기값 사용
  reducers: {
    login: (state, action) => {
      console.log("로그인....");

      //(id, pw로 구성)
      const payload = action.payload;

      setCookie("user", JSON.stringify(payload), 1) //1일

      return payload

    },
    logout: (state, action) => {
      console.log("로그아웃...");
      removeCookie("user");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled: 완료");

        const payload = action.payload;
        // 정상적인 로그인시에만 쿠키 저장
        if (!payload.error) {
          console.log("쿠키 저장");
          setCookie("user", JSON.stringify(payload), 1); // 1일
        }

        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending: 처리중");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected : 오류");
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
