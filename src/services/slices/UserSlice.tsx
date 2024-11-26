import { TUser } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';

type TUserState = {
  isAuthenticated: boolean;
  user: TUser;
  error: string | undefined;
};

const initialState: TUserState = {
  isAuthenticated: false,
  user: {
    name: '',
    email: ''
  },
  error: ''
};

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  getUserApi
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  updateUserApi
);

export const registerNewUser = createAsyncThunk(
  'user/registerNewUser',
  registerUserApi
);

export const loginUser = createAsyncThunk('user/loginUser', loginUserApi);

export const logoutUser = createAsyncThunk('user/logoutUser', logoutApi);

export const userSlice = createSlice({
  name: 'userBurger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message!;
      });
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.error = '';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message!;
      });
    builder
      .addCase(registerNewUser.pending, (state) => {
        state.error = '';
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.error = action.error.message!;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthenticated = false;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message!;
      });
    builder.addCase(logoutUser.fulfilled, (state) => (state = initialState));
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
    getName: (state) => state.user.name
  }
});

export const { isAuthCheckedSelector, getUser, getName } = userSlice.selectors;
