import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { cartReducer } from "./cartSlice";
import { contactReducer } from "./contactSlice";
import { validReducer } from "./validSlice";
import { productReducer } from "./productSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "contact"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  contact: contactReducer,
  validation: validReducer,
  product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };

// const makeStore = () => store;
// const wrapper = createWrapper(makeStore);

// export { store, wrapper };
