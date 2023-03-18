import { changePassword, getPopularBusiness, loadBusiness, updateAccountInfo, updatePaymentMethod, uploadAvatar } from "./business.actions";

import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Business, BusinessState, PopularBusinessState, UpdateBusinessState } from "../types";

const name = "business";

const businessState: BusinessState = {
  loading: false,
  businessAuthenticated: null,
  isAuthenticated: false,
};

const updatedBusinesState: UpdateBusinessState = {
  updateError: null,
  updateSuccess: false,
  business: null
}

const popularBusinessState: PopularBusinessState = {
  loading: false,
  popluarBusinessList: []
}

export const businessSlice = createSlice({
  name,
  initialState: businessState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.businessAuthenticated = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadBusiness.pending, (state) => ({
      ...state,
      loading: true,
      isAuthenticated: false,
    }));
    builder.addCase(
      loadBusiness.fulfilled,
      (state, action: PayloadAction<Business>) => ({
        businessAuthenticated: action.payload,
        isAuthenticated: true,
        loading: false,
      })
    );
    builder.addCase(loadBusiness.rejected, (state, action: PayloadAction<any>) => ({
      loading: false,
      businessAuthenticated: null,
      isAuthenticated: false,
    }));
  },
});

export const updateBusinessSlice = createSlice({
  name,
  initialState: updatedBusinesState,
  reducers: {
    clearErrors: (state) => {
      state.updateError = null;
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadAvatar.pending, (state) => ({
      ...state,
      updateError: null,
      updateSuccess: false,
    }));
    builder.addCase(
      uploadAvatar.fulfilled,
      (state, action: PayloadAction<Business>) => ({
        ...state,
        business: action.payload,
        updateSuccess: true,
      })
    );
    builder.addCase(
      uploadAvatar.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        loginErrors: action.payload,
        updateSuccess: false,
      })
    );
    builder.addCase(updateAccountInfo.pending, (state) => ({
      ...state,
      updateError: null,
      updateSuccess: false,
    }));
    builder.addCase(
      updateAccountInfo.fulfilled,
      (state, action: PayloadAction<Business>) => ({
        ...state,
        business: action.payload,
        updateSuccess: true,
      })
    );
    builder.addCase(
      updateAccountInfo.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        loginErrors: action.payload,
        updateSuccess: false,
      })
    );
    builder.addCase(updatePaymentMethod.pending, (state) => ({
      ...state,
      updateError: null,
      updateSuccess: false,
    }));
    builder.addCase(
      updatePaymentMethod.fulfilled,
      (state, action: PayloadAction<Business>) => ({
        ...state,
        business: action.payload,
        updateSuccess: true,
      })
    );
    builder.addCase(
      updatePaymentMethod.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        updateError: action.payload,
        updateSuccess: false,
      })
    );
    builder.addCase(changePassword.pending, (state) => ({
      ...state,
      updateError: null,
      updateSuccess: false,
    }));
    builder.addCase(
      changePassword.fulfilled,
      (state, action: PayloadAction<Boolean>) => ({
        ...state,
        updateError: null,
        updateSuccess: true,
      })
    );
    builder.addCase(
      changePassword.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        updateError: action.payload,
        updateSuccess: false,
      })
    );
  },
});

export const popularBusinessSlice = createSlice({
  name,
  initialState: popularBusinessState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPopularBusiness.pending, (state) => ({
      ...state,
      loading: true
    }));
    builder.addCase(
      getPopularBusiness.fulfilled,
      (state, action: PayloadAction<Business[]>) => ({
        loading: false,
        popluarBusinessList: action.payload
      })
    );
    builder.addCase(getPopularBusiness.rejected, (state, action: PayloadAction<any>) => ({
      loading: false,
      popluarBusinessList: action.payload
    }));
  },
});

export const { logout } = businessSlice.actions;
export const { clearErrors } = updateBusinessSlice.actions;

const businessReducer = combineReducers({
  business: businessSlice.reducer,
  popularBusiness: popularBusinessSlice.reducer,
  updateBusiness: updateBusinessSlice.reducer
});

export default businessReducer;
