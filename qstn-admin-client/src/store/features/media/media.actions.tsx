import { createAsyncThunk } from "@reduxjs/toolkit";
import configuration from "../../../axiosConfig";
import { MediaType } from "../../../pages/Business/badd";

const SLICE_NAME = "media";

export const uploadImage = createAsyncThunk(
  `${SLICE_NAME}/createMedia`,
  async (Mediadata: MediaType, { rejectWithValue, dispatch }) => {
    const imageToUpload = Mediadata.image[0];
    console.log("dfdf");
    try {
      const { data } = await configuration.nftApi.post(
        "/upload",
        imageToUpload
      );

      const cid = data.value.cid;

      if (cid) {
        const { data } = await configuration.api.post("media/upload", {
          name: Mediadata.display_name,
          email: Mediadata.email,
          // copies_limit: Mediadata.bio,
          // price: Mediadata.price,
          cid: cid,
          // type: Mediadata.private === true ? 1 : 0,
        });

        return data;
      }
    } catch (err: any) {
      if (err.message === "Network Error") {
        return rejectWithValue("network error");
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const FetchMedia = createAsyncThunk(
  `${SLICE_NAME}/loadmedia`,
  async (Mediadata, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await configuration.api.get("media/user");

      return data;
    } catch (err: any) {
      if (err.message === "Network Error") {
        return rejectWithValue("network error");
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const FetchAllMedia = createAsyncThunk(
  `${SLICE_NAME}/loadmedia`,
  async (Mediadata, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await configuration.api.get("media/all/public");
      return data;
    } catch (err: any) {
      if (err.message === "Network Error") {
        return rejectWithValue("network error");
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const addUsers = createAsyncThunk(
  `${SLICE_NAME}/addUsers`,
  async (media: any, { rejectWithValue }) => {
    try {
      await configuration.api.patch("media/invite", {
        media_id: media.MediaId,
        white_list: media.emailsList,
      });
      return true;
    } catch (err: any) {
      return rejectWithValue(false);
    }
  }
);

export const deleteMedia = createAsyncThunk(
  `${SLICE_NAME}/deleteMedia`,
  async (MediaId: string, { rejectWithValue, dispatch }) => {
    try {
      await configuration.api.delete("media/delete", { data: { MediaId } });
      dispatch(FetchMedia());
      return true;
    } catch (err: any) {
      return rejectWithValue(false);
    }
  }
);
