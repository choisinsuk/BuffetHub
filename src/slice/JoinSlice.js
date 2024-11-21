import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkIdApi, joinPost } from "../api/userApi";


export const joinPostAsync = createAsyncThunk(
  'user/join',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await joinPost(userData); // joinPost 호출
      return response; // 성공한 경우 서버의 응답 데이터 반환
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // 에러 처리
    }
  }
);

// 아이디 중복 확인 비동기 액션 추가
export const checkIdAsync = createAsyncThunk(
  "user/checkId",
  async (urId, { rejectWithValue }) => {
    try {
      const response = await checkIdApi(urId); // checkIdApi 호출
      return response.data; // 서버로부터 받은 중복 여부 응답 데이터 반환
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // 에러 처리
    }
  }
);

const joinSlice = createSlice({
  name: "join",
  initialState: {
    checkIdResult: null, // 아이디 중복 확인 결과
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // 회원가입 액션 처리
    builder
      .addCase(joinPostAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinPostAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(joinPostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 아이디 중복 확인 액션 처리
    builder
      .addCase(checkIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.checkIdResult = action.payload; // 결과 저장
      })
      .addCase(checkIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default joinSlice.reducer;