import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/userApi";

const initState = {
  ur_id: "",
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  console.log("서버로 전달되는 param: ", param); // 전달되는 데이터 확인
  return loginPost(param);
});

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      console.log("로그인....");

      //(id, pw로 구성)
      const data = action.payload;

      // 새로운 상태
      return { ur_id: data.id };
    },
    logout: (state, action) => {
      console.log("로그아웃...");

      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled: 완료");

        const payload = action.payload
        return payload
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
