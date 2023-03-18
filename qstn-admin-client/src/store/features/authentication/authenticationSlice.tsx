import { PayloadAction, combineReducers, createSlice } from "@reduxjs/toolkit";
import { BusinessLoginState, BusinessRegisterState } from "../types";
import {
  loginBusiness,
  registerBusiness,
} from "../authentication/authentication.actions";

const name = "authentication";

const registerState: BusinessRegisterState = {
  loading: false,
  registerSuccess: false,
  registerErrors: null,
  business: null,
};

export const registerSlice = createSlice({
  name,
  initialState: registerState,
  reducers: {
    clearErrors: (state) => {
      state.registerErrors = null;
      state.registerSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerBusiness.pending, (state) => ({
      ...state,
      registerErrors: null,
      registerSuccess: false,
      loading: true,
    }));
    builder.addCase(registerBusiness.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      registerSuccess: true,
      registerErrors: null,
      business: action.payload,
    }));
    builder.addCase(
      registerBusiness.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        loading: false,
        registerSuccess: false,
        registerErrors: action.payload,
        business: null,
      })
    );
  },
});

const loginState: BusinessLoginState = {
  loading: false,
  token: localStorage.getItem("token"),
  loginErrors: null,
  loginSuccess: false,
};

export const loginSlice = createSlice({
  name,
  initialState: loginState,
  reducers: {
    clearLoginErrors: (state) => {
      state.loginErrors = null;
    },
    clearLoginStatus: (state) => {
      state.loginSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginBusiness.pending, (state) => ({
      ...state,
      loginErrors: null,
      loginSuccess: false,
      loading: true,
    }));
    builder.addCase(
      loginBusiness.fulfilled,
      (state, action: PayloadAction<string>) => ({
        ...state,
        loading: false,
        token: action.payload,
        loginSuccess: true,
      })
    );
    builder.addCase(
      loginBusiness.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        loading: false,
        loginErrors: action.payload,
        loginSuccess: false,
      })
    );
  },
});

// export action
export const { clearErrors } = registerSlice.actions;
export const { clearLoginErrors, clearLoginStatus } = loginSlice.actions;

const authenticationReducer = combineReducers({
  register: registerSlice.reducer,
  login: loginSlice.reducer,
});

export default authenticationReducer;
