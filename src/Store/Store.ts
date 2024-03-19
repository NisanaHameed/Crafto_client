import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Slice/AuthSlice";

const store = configureStore({
    reducer:{
        auth:AuthReducer
    }
})

export default store;