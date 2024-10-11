import { createAsyncThunk } from "@reduxjs/toolkit";
import { joinPost } from "../api/userApi";


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