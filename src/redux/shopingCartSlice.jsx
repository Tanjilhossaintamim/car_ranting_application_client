import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../components/utils/BaseUrl";

const initialState = {
  cartItem: [],
};

const shopingCartSlice = createSlice({
  name: "shopingcart",
  initialState,
  reducers: {
    empty_carItem: (state, action) => {
      state.cartItem = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchShopingCartProductProduct.fulfilled,
      (state, action) => {
        state.cartItem = action.payload;
      }
    );
  },
});

export const { empty_carItem } = shopingCartSlice.actions;

export const fetchShopingCartProductProduct = createAsyncThunk(
  "shopingcart/",
  async (cartId) => {
    try {
      const response = await axios.get(`${BASEURL}/api/cart/${cartId}`);

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export default shopingCartSlice.reducer;
