import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shipment: false,
};

const validSlice = createSlice({
  name: "validation",
  initialState,
  reducers: {
    setValidation: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setValidation } = validSlice.actions;

export const validReducer = validSlice.reducer;
