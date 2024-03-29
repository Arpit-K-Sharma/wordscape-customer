import React from 'react'
import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productSlice';
import { data } from 'autoprefixer';


const cartSlice = createSlice({
    name: "cart",
    initialState: {
      isLoading: false,
      data: [],
    },
    reducers : {
        addToCart: (state, action) => {
            state.data.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.data.pop(action.payload);
        },
    },
});


export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;