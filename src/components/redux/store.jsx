import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import progressReducer from "./progressSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    // products: productReducer,
    // cart: cartReducer,
    progress: progressReducer,
    order: orderReducer,
  },
});
