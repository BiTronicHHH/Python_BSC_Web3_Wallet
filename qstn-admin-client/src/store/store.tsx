import { configureStore } from "@reduxjs/toolkit";
// import reducers
import mediaReducer from "./features/media/media.slice";

import businessReducer from "./features/business/businessSlice";

import surveyReducer from "./features/survey/Survey.slice";
import authReducer from "./features/authentication/authenticationSlice";
import changePassswordReducer from "./features/changePassword/changePasswordSlice";

export const Store = configureStore({
  reducer: {
    mediaReducer,
    businessReducer,
    surveyReducer,
    authReducer,
    changePassswordReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
