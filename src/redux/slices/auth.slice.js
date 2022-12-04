import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  token: localStorage.getItem("authToken") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = { ...action.payload.user };
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("authToken", action.payload.token);
    },
    logout: (state) => {
      state.user = {};
      state.token = "";
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
