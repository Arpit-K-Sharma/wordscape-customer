import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const sliceProduct = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const response = await fetch(
    "https://mocki.io/v1/5d22bf68-157b-4d44-be1b-dd34fa395e0d"
  );
  return response.json();
});

/// Reducer

// const counter = (state = 0, action) => {
//   switch (action.type) {
//     case "INCREASE_QUANTITY":
//       return state + 1;
//     case "DECREASE_QUANTITY":
//       return state - 1;
//     default:
//       return state;
//   }
// };
export default sliceProduct.reducer;
