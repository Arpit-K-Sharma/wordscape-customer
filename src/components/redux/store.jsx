import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import progressReducer from "./progressSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        progress: progressReducer
    }
})



