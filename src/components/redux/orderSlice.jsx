import React from 'react'
import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productSlice';
import { data } from 'autoprefixer';


const orderSlice = createSlice({
    name: "order",
    initialState: {
        date: "",
        paperSize: "",
        pages: "",
        quantity: "",
        bindingType: "",
        coverTreatmentType: "",
        innerPaperType: "",
        innerPaperThickness: "",
        outerPaperType: "",
        outerPaperThickness: "",
        laminationType: "",
        inkType: "",
        remarks: "",
        name: "",
        companyName: "",
        email: "",
        address: "",
    },

    reducers : {
        addInnerPaper: (state, action) => {
            const {
                paperSize,
                innerPaperType,
                innerPaperThickness,
            } = action.payload;
            state.paperSize = paperSize;
            state.innerPaperType = innerPaperType;
            state.innerPaperThickness = innerPaperThickness;
        }
    },
});


export const { addInnerPaper } = orderSlice.actions;
export default orderSlice.reducer;
