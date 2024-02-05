// features/formDataSlice.js
import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    email: "",
    firstname: "",
    lastname: "",
    phonenum: "",
    shipment: "",
    address: "",
    city: "",
    province: "",
    postalcode: "",
  },
  reducers: {
    updateFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearForm: (state, action) => {
      localStorage.removeItem("persist:root");

      // Return the initial state to reset the form
      return state;
    },
  },
});

export const { updateFormData, clearForm } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
