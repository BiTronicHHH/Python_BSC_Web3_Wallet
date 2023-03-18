import { PayloadAction, combineReducers, createSlice } from "@reduxjs/toolkit";
import { SurveyState } from "../types";
import {
  deleteSurvey,
  editSurvey,
  fetchSurveyById,
  fetchSurveysByUser,
  inviteToSurvey,
  publishSurvey,
  saveSurvey,
} from "./Survey.actions";

const name = "survey";

const surveyState: SurveyState = {
  loading: false,
  surveySaved: false,
  surveysList: [],
  surveyPublished: false,
  surveyDeleted: false,
  surveyUpdated: false,
  surveyToEdit: [],
  invitationSuccess: false,
};

export const surveySlice = createSlice({
  name,
  initialState: surveyState,
  reducers: {
    clearSurveyState: (state) => {
      state.surveySaved = false;
      state.surveyPublished = false;
      state.surveyDeleted = false;
      state.invitationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveSurvey.pending, (state) => ({
      ...state,
      loading: true,
      surveySaved: false,
    }));
    builder.addCase(saveSurvey.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      surveySaved: true,
    }));
    builder.addCase(
      saveSurvey.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        loading: false,
        surveySaved: false,
      })
    );
    builder.addCase(fetchSurveysByUser.pending, (state) => ({
      ...state,
      loading: true,
      surveysList: [],
    }));
    builder.addCase(fetchSurveysByUser.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      surveysList: action.payload,
    }));
    builder.addCase(
      fetchSurveysByUser.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        loading: false,
        surveysList: [],
      })
    );
    builder.addCase(fetchSurveyById.pending, (state) => ({
      ...state,
      loading: true,
      surveyToEdit: [],
    }));
    builder.addCase(fetchSurveyById.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      surveyToEdit: action.payload,
    }));
    builder.addCase(
      fetchSurveyById.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        loading: false,
        surveysList: [],
      })
    );
    builder.addCase(publishSurvey.pending, (state) => ({
      ...state,
      loading: true,
      surveyPublished: false,
    }));
    builder.addCase(publishSurvey.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      surveyPublished: action.payload,
    }));
    builder.addCase(
      publishSurvey.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        loading: false,
        surveyPublished: false,
      })
    );
    builder.addCase(inviteToSurvey.pending, (state) => ({
      ...state,
      loading: true,
      invitationSuccess: false,
    }));
    builder.addCase(inviteToSurvey.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      invitationSuccess: true,
    }));
    builder.addCase(
      inviteToSurvey.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        loading: false,
        invitationSuccess: false,
      })
    );
    builder.addCase(deleteSurvey.pending, (state) => ({
      ...state,
      loading: true,
      surveyDeleted: false,
    }));
    builder.addCase(deleteSurvey.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      surveyDeleted: action.payload,
    }));
    builder.addCase(
      deleteSurvey.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        loading: false,
        surveyDeleted: false,
      })
    );
    builder.addCase(editSurvey.pending, (state) => ({
      ...state,
      loading: true,
      surveyUpdated: false,
    }));
    builder.addCase(editSurvey.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      surveyUpdated: action.payload,
    }));
    builder.addCase(
      editSurvey.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        loading: false,
        surveyUpdated: false,
      })
    );
  },
});

// export action
export const { clearSurveyState } = surveySlice.actions;
const mediaReducer = combineReducers({
  survey: surveySlice.reducer,
});

export default mediaReducer;
