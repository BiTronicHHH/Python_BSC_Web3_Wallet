import { createAsyncThunk } from "@reduxjs/toolkit";
import configuration from "../../../axiosConfig";

const SLICE_NAME = "changePsw";

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
