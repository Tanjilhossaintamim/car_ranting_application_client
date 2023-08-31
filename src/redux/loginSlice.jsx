import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userId: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    saveLoginInfo: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    checkLogin: (state, action) => {
      const expiredTime = localStorage.getItem("expiredTime");
      const time = new Date(parseInt(expiredTime));
      if (new Date() >= time) {
        state.token = null;
        state.userId = null;
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("expiredTime");
      } else {
        state.token = localStorage.getItem("token");
        state.userId = localStorage.getItem("userId");
      }
    },
    logout: (state, action) => {
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expiredTime");
    },
  },
});

export const { saveLoginInfo, checkLogin, logout } = loginSlice.actions;
export default loginSlice.reducer;
