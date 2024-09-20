import { createSlice } from "@reduxjs/toolkit";

const initState = {
  id: "",
};

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      console.log("로그인....");

      //(id, pw로 구성)
      const data = action.payload;

      // 새로운 상태
      return { id: data.id };
    },
    logout: (state, action) => {
      console.log("로그아웃...");
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice;
