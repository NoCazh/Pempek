// features/formDataSlice.js
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    menuName: "",
    details: "",
    price: "",
    category: "",
  },
  reducers: {
    onChangeProduct: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearProduct: (state, action) => {
      localStorage.removeItem("persist:root");

      // Return the initial state to reset the form
      return state;
    },
  },
});

export const { onChangeProduct, clearProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;
