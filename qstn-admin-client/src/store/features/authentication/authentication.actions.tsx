import { createAsyncThunk } from "@reduxjs/toolkit";
import configuration from "../../../axiosConfig";

const SLICE_NAME = "authentication";

export const registerBusiness = createAsyncThunk(
  `${SLICE_NAME}/registerbusiness`,
  async (formdata: object, { rejectWithValue }) => {
    try {
      const { data } = await configuration.api.post("auth/business/signup", formdata);
      return data;
    } catch (err: any) {
      if (err.message === "Network Error") {
        return rejectWithValue("network error");
      }
      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const loginBusiness = createAsyncThunk(
  `${SLICE_NAME}/loginbusiness`,
  async (formdata: object, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await configuration.api.post("auth/signin", formdata);
      if (data.accountType === 2) {
        return rejectWithValue("Invalid Credentials");
      } else {
        localStorage.setItem("token", data.token);
        return data;
      }
    } catch (err: any) {
      if (err.message === "Network Error") {
        return rejectWithValue("network error");
      }
      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const logoutBusiness = createAsyncThunk(
  `${SLICE_NAME}/logoutbusiness`,
  async (formdata, { rejectWithValue, dispatch }) => {
    try {
      localStorage.removeItem("token");
    } catch (err: any) {
      if (err.message === "Network Error") {
        return rejectWithValue("network error");
      }
      return rejectWithValue(err.response.data.msg);
    }
  }
);