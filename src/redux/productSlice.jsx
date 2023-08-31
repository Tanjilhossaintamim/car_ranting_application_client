import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cars: [],
  is_loading: false,
  previousPage: null,
  count: 0,
  nextPage: null,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.is_loading = true;
      state.cars = [];
      state.error = null;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.is_loading = false;
      state.cars = action.payload.results;
      state.previousPage = action.payload.previous;
      state.nextPage = action.payload.next;
      state.count = action.payload.count;
      state.error = null;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.is_loading = false;
      state.error = action.error.message;
    });
  },
});

export const fetchProduct = createAsyncThunk("product", async (url) => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
 
    throw new Error(error.message);
  }
});

export default productSlice.reducer;
