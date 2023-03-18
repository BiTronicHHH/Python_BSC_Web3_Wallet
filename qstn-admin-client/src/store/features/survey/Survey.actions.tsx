import { createAsyncThunk } from "@reduxjs/toolkit";
import configuration from "../../../axiosConfig";

import { CreatedSurvey } from "../types";

const SLICE_NAME = "survey";

export const saveSurvey = createAsyncThunk(
  `${SLICE_NAME}/saveSurvey`,
  async (createdSurvey: CreatedSurvey, { rejectWithValue }) => {
    try {
      const { data } = await configuration.api.post(
        "survey/draft",
        createdSurvey
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(false);
    }
  }
);

export const fetchSurveysByUser = createAsyncThunk(
  `${SLICE_NAME}/fetchSurveybyUser`,
  async (surveys, { rejectWithValue }) => {
    try {
      const { data } = await configuration.api.get("survey/user");
      return data;
    } catch (err: any) {
      return rejectWithValue(false);
    }
  }
);

export const publishSurvey = createAsyncThunk(
  `${SLICE_NAME}/publishSurvey`,
  async (surveyId: String, { rejectWithValue }) => {
    try {
      await configuration.api.patch("survey/publish", {
        survey_id: surveyId,
      });
      return true;
    } catch (err: any) {
      return rejectWithValue(false);
    }
  }
);
export const inviteToSurvey = createAsyncThunk(
  `${SLICE_NAME}/inviteToSurvey`,
  async (survey: any, { rejectWithValue }) => {
    try {
      await configuration.api.patch("survey/invite", {
        survey_id: survey.surveyId,
        emailList: survey.emailsList,
      });
      return true;
    } catch (err: any) {
      return rejectWithValue(false);
    }
  }
);

export const deleteSurvey = createAsyncThunk(
  `${SLICE_NAME}/deleteSurvey`,
  async (survey_id: any, { rejectWithValue }) => {
    try {
      await configuration.api.delete("survey/delete", { data: { survey_id } });
      return true;
    } catch (err: any) {
      return rejectWithValue(false);
    }
  }
);

export const editSurvey = createAsyncThunk(
  `${SLICE_NAME}/editSurvey`,
  async (updatedSurvey: Object, { rejectWithValue }) => {
    try {
      // survey_id, title, desciption, pages
      await configuration.api.put("survey/update", {
        ...updatedSurvey,
      });
      return true;
    } catch (err: any) {
      return rejectWithValue(false);
    }
  }
);

export const fetchSurveyById = createAsyncThunk(
  `${SLICE_NAME}/fetchSurveyById`,
  async (survey_id: string, { rejectWithValue }) => {
    try {
      const { data } = await configuration.api.get("survey/", {
        params: {
          survey_id,
        },
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(false);
    }
  }
);
