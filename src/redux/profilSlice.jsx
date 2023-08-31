import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../components/utils/BaseUrl";

const initialState = {
  profile: {},
  is_owner: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProfileinfo.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.is_owner = action.payload.user.is_owner;
    });
  },
});

export const getProfileinfo = createAsyncThunk("profile/get", async () => {
  const header = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  };
  try {
    const response = await axios.get(`${BASEURL}/api/profile/me/`, header);
    return response.data;
  } catch (error) {}
});

export default profileSlice.reducer;
