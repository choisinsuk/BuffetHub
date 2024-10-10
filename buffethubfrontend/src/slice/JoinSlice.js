import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { joinPost } from "../api/userApi"; // 회원가입 API 호출 함수
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {
  user: null, // 가입한 사용자 정보
  loading: false, // 로딩 상태
  error: null, // 오류 상태
};

// 비동기 회원가입 액션
export const joinPostAsync = createAsyncThunk("joinPostAsync", async (param) => {
  const response = await joinPost(param);
  return response; // API 응답 반환
});

const joinSlice = createSlice({
  name: "JoinSlice",
  initialState: initState,
  reducers: {
    clearState: (state) => {
      state.user = null; // 초기화
      state.loading = false; // 로딩 상태 초기화
      state.error = null; // 오류 상태 초기화
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(joinPostAsync.pending, (state) => {
        console.log("회원가입 처리중...");
        state.loading = true; // 로딩 상태 설정
        state.error = null; // 오류 초기화
      })
      .addCase(joinPostAsync.fulfilled, (state, action) => {
        console.log("회원가입 완료");

        const payload = action.payload;
        if (!payload.error) {
          console.log("가입한 사용자 쿠키 저장");
          setCookie("user", JSON.stringify(payload), 1); // 1일
          state.user = payload; // 가입한 사용자 정보 저장
        } else {
          state.error = payload.error; // 오류 상태 설정
        }

        state.loading = false; // 로딩 상태 해제
      })
      .addCase(joinPostAsync.rejected, (state, action) => {
        console.log("회원가입 오류 발생");
        state.loading = false; // 로딩 상태 해제
        state.error = action.error.message; // 오류 상태 설정
      });
  },
});

export const { clearState } = joinSlice.actions;
export default joinSlice.reducer;