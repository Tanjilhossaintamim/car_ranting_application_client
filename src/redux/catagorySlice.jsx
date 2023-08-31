import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../components/utils/BaseUrl";

const initialState = {
  catagories: [],
  is_loading: false,
  error: null,
};

const catagorySlice = createSlice({
  name: "catagory",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCatagory.pending, (state, action) => {
      state.is_loading = true;
    });
    builder.addCase(fetchCatagory.fulfilled, (state, action) => {
      state.is_loading = false;
      state.catagories = action.payload.results;
    });
    builder.addCase(fetchCatagory.rejected, (state, action) => {
      (state.is_loading = false), (state.error = action.error.message);
    });
  },
});

export const fetchCatagory = createAsyncThunk("catagory/get", async () => {
  try {
    const response = await axios.get(`${BASEURL}/api/catagory/`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export default catagorySlice.reducer;
