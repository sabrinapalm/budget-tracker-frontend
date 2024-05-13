import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  loginError: '',
  showRegistrationForm: false,
  userId: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserSession: (state, action) => {
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
    clearAuthState: (state) => {
      state.isLoggedIn = false;
      state.loginError = '';
      state.showRegistrationForm = false;
      state.userId = '';
    },
    loginSuccess: (state, action) => {
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
      state.loginError = '';
    },
  },
});

export const { setLoginError, setShowRegistrationForm, clearAuthState, loginSuccess, setUserSession } =
  authSlice.actions;

export default authSlice.reducer;
