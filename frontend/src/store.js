

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import adminReducer from "./slices/adminSlice"

const store = configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer,
    }
})

export default store;