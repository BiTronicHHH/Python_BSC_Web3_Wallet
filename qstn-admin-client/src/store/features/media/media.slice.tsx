import { PayloadAction, combineReducers, createSlice } from "@reduxjs/toolkit";
import { Media, MediaState } from "../types";
import {
  addUsers,
  FetchAllMedia,
  FetchMedia,
  uploadImage,
} from "./media.actions";

const name = "media";

const mediaState: MediaState = {
  loading: false,
  mediaUploaded: false,
  MediaErrors: null,
  mediaList: [],
  userInvited: false,
};

export const mediaSlice = createSlice({
  name,
  initialState: mediaState,
  reducers: {
    clearMediaState: (state) => {
      state.mediaUploaded = false;
      state.MediaErrors = null;
      state.userInvited = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImage.pending, (state) => ({
      ...state,
      loading: true,
      mediaUploaded: false,
      MediaErrors: null,
    }));
    builder.addCase(
      uploadImage.fulfilled,
      (state, action: PayloadAction<boolean>) => ({
        ...state,
        loading: false,
        mediaUploaded: action.payload,
        MediaErrors: null,
      })
    );
    builder.addCase(
      uploadImage.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        loading: false,
        MediaErrors: action.payload,
        mediaUploaded: false,
      })
    );
    builder.addCase(FetchAllMedia.pending, (state) => ({
      ...state,
      loading: true,
      mediaList: [],
    }));
    builder.addCase(
      FetchAllMedia.fulfilled,
      (state, action: PayloadAction<Array<Media>>) => ({
        ...state,
        loading: false,
        mediaList: action.payload,
      })
    );
    builder.addCase(
      FetchAllMedia.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        loading: false,
        MediaErrors: action.payload,
        mediaList: [],
      })
    );
    builder.addCase(addUsers.pending, (state) => ({
      ...state,
      loading: true,
      userInvited: false,
    }));
    builder.addCase(
      addUsers.fulfilled,
      (state, action: PayloadAction<boolean>) => ({
        ...state,
        loading: false,
        userInvited: action.payload,
      })
    );
    builder.addCase(addUsers.rejected, (state, action: PayloadAction<any>) => ({
      ...state,
      loading: false,
      userInvited: false,
    }));
  },
});

// export action
export const { clearMediaState } = mediaSlice.actions;
const mediaReducer = combineReducers({
  media: mediaSlice.reducer,
});

export default mediaReducer;
