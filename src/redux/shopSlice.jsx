import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cars: [],
  count: 0,
  nextpage: null,
  previousPage: null,
  is_loading: false,
  errorMessage: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchShopProducts.pending, (state, action) => {
      state.is_loading = true;
      state.cars = [];
      state.errorMessage = null;
    });
    builder.addCase(fetchShopProducts.fulfilled, (state, action) => {
      state.is_loading = false;
      state.cars = action.payload.results;
      state.count = action.payload.count;
      state.nextpage = action.payload.next;
      state.previousPage = action.payload.previous;
      state.error = null;
    });
    builder.addCase(fetchShopProducts.rejected, (state, action) => {
      state.is_loading = false;
      state.errorMessage = action.error.message;
    });
  },
});

export const fetchShopProducts = createAsyncThunk("shop/get", async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export default shopSlice.reducer;
