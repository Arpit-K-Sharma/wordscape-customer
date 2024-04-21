import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const progressSlice = createSlice({
    
        name: 'progressSlice',
        initialState: {
            step: 1
        },
        reducers: {
            increment: state => {
                console.log("Incrementing step");
                state.step += 1;
            },
            decrement: state => state.step - 1
        }
    })

export const {increment, decrement} = progressSlice.actions
export default progressSlice.reducer;


