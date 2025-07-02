import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from '../slice/LoadingSlice'

export const store=configureStore({
    reducer:{
        loading:loadingReducer
    }
})