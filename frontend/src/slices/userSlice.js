import { createSlice } from "@reduxjs/toolkit";


 
const storedUserInfo = localStorage.getItem('userData');
const initialState = {
    user: storedUserInfo ? JSON.parse(storedUserInfo) : null,
};


const userSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.user = action.payload;
            state.login = true;
            localStorage.setItem('userData', JSON.stringify(action.payload));
        },

        userLogout: (state) => {
            state.user = null;
            state.login=false;
            localStorage.removeItem('userData');
        }
    }
});

export const { userLogin,userLogout } = userSlice.actions;
export const isLogin = (state) => state.user.login;
export default userSlice.reducer;