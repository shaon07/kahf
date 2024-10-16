// src/redux/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isUser: boolean;
  detail: any;
}

const initialState: UserState = {
  isUser: false,
  detail: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isUser = true;
    },
    logout: (state) => {
      state.isUser = false;
    },
    setUserDetails: (state, action) => {
      state.detail = action.payload;
    },
    clearUserDetails: (state) => {
      state.detail = {};
    },
    storeSocialLinks: (state, action) => {
      state.detail.socialLinks = action.payload;
    },
    clearSocialLinks: (state) => {
      state.detail.socialLinks = [];
    },
  },
});

// Export actions
export const {
  login,
  logout,
  setUserDetails,
  clearUserDetails,
  storeSocialLinks,
  clearSocialLinks,
} = userSlice.actions;

// Export selector
export const userDetail = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
