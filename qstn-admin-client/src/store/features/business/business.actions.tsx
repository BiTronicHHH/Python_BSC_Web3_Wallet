import { createAsyncThunk } from "@reduxjs/toolkit";
import configuration from "../../../axiosConfig";

import setAuthToken from "../../../axiosConfig/setHeaders";

const SLICE_NAME = "business";
export const loadBusiness = createAsyncThunk(
  `${SLICE_NAME}/loadBusiness`,
  async (token, { rejectWithValue }) => {
    const tokenSaved = localStorage.getItem("token");
    setAuthToken(tokenSaved);
    try {
      const { data } = await configuration.api.get("auth/");
      console.log("data:", data);
      return data;
    } catch (err: any) {
      if (err.message === "Network Error") {
        return rejectWithValue("network error");
      }
      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const getPopularBusiness = createAsyncThunk(
  `${SLICE_NAME}/getPopularBusiness`,
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await configuration.api.get("business/popular");
      console.log("data:", data);
      return data;
    } catch (err: any) {
      if (err.message === "Network Error") {
        return rejectWithValue("network error");
      }
      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const onBoardingBusiness = createAsyncThunk(
  `${SLICE_NAME}/onBoardingBusiness`,
  async (formdata: object, { rejectWithValue }) => {
    const tokenSaved = localStorage.getItem("token");
    setAuthToken(tokenSaved);
    try {
      const { data } = await configuration.api.post("auth/onboarding", formdata);
      console.log("data:", data);
      return data;
    } catch (err: any) {
      if (err.message === "Network Error") {
        return rejectWithValue("network error");
      }
      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const changePassword = createAsyncThunk(
  `${SLICE_NAME}/changePassword`,
  async (formdata: object, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await configuration.api.put(
        "auth/change_password",
        formdata
      );
      return true;
    } catch (err: any) {
      if (err.message === "Network Error") {
        return rejectWithValue("network error");
      }
      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  `${SLICE_NAME}/uploadAvatar`,
  async (formdata: object, { rejectWithValue }) => {
    const tokenSaved = localStorage.getItem("token");
    setAuthToken(tokenSaved);
    try {
      const { data } = await configuration.apiFile.patch("auth/upload_avatar", formdata);
      console.log("data:", data);
      return data;
    } catch (err: any) {
      if (err.message === "Network Error") {
        return rejectWithValue("network error");
      }
      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const updateAccountInfo = createAsyncThunk(
  `${SLICE_NAME}/updateAccountInfo`,
  async (formdata: object, { rejectWithValue }) => {
    const tokenSaved = localStorage.getItem("token");
    setAuthToken(tokenSaved);
    try {
      const { data } = await configuration.api.post("business/update-account-info", formdata);
      console.log("data:", data);
      return data;
    } catch (err: any) {
      if (err.message === "Network Error") {
        return rejectWithValue("network error");
      }
      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const updatePaymentMethod = createAsyncThunk(
  `${SLICE_NAME}/updatePaymentMethod`,
  async (formdata: object, { rejectWithValue }) => {
    const tokenSaved = localStorage.getItem("token");
    setAuthToken(tokenSaved);
    try {
      const { data } = await configuration.api.post("business/update-payment-method", formdata);
      console.log("data:", data);
      return data;
    } catch (err: any) {
      if (err.message === "Network Error") {
        return rejectWithValue("network error");
      }
      return rejectWithValue(err.response.data.msg);
    }
  }
);
