import { createSlice } from "@reduxjs/toolkit";

const storedAdminInfo = localStorage.getItem('adminData');
const initialState = {
  admin: storedAdminInfo ? JSON.parse(storedAdminInfo) : null,
  login: storedAdminInfo ? true : false,
};

const adminSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      state.admin = action.payload;
      state.login = true;
      localStorage.setItem('adminData', JSON.stringify(action.payload));
    },
    adminLogout: (state) => {
      state.admin = null;
      state.login = false;
      localStorage.removeItem('adminData');
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export const isAdminLogin = (state) => state.admin.login;
export default adminSlice.reducer;
