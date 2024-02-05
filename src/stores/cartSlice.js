import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const itemInCart = state.cart.find((menu) => menu.id === id);
      if (itemInCart) {
        itemInCart.quantity += 1;
        console.log("added to cart");
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        console.log("added to cart");
      }
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.cart.find((menu) => menu.id === id);

      if (item) {
        item.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.cart.find((menu) => menu.id === id);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const index = state.cart.find((menu) => menu.id === id);
      state.cart.splice(index, 1);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
