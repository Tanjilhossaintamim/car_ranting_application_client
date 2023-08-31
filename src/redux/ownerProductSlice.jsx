import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  owner_cars: [],
  previousPage: null,
  nextPage: null,
  is_loading: false,
  errorMessage: null,
  selectedCar: [],
};

const ownerProductSlice = createSlice({
  name: "ownerProduct",
  initialState,
  reducers: {
    setSelectedCar: (state, action) => {
      state.selectedCar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOwnerProducts.pending, (state, action) => {
      state.is_loading = true;
    });
    builder.addCase(getOwnerProducts.fulfilled, (state, action) => {
      state.is_loading = false;
      state.owner_cars = action.payload.results;
      state.previousPage = action.payload.previous;
      state.nextPage = action.payload.next;
    });
    builder.addCase(getOwnerProducts.rejected, (state, action) => {
      state.is_loading = false;
      state.errorMessage = action.error.message;
    });
  },
});

export const { setSelectedCar } = ownerProductSlice.actions;

export const getOwnerProducts = createAsyncThunk("owner/get", async (url) => {
  const header = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  };
  try {
    const response = await axios.get(url, header);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export default ownerProductSlice.reducer;
