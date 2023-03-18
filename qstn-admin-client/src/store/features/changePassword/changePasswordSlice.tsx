import { PayloadAction, combineReducers, createSlice } from "@reduxjs/toolkit";
import { changePassword } from "./changePassword.actions";

const name = "changePassword";

type ChangePswState = {
  loading: boolean;
  changePasswordErrors: null | {};
  changePasswordSuccess: boolean;
};

const changePsw: ChangePswState = {
  loading: false,
  changePasswordErrors: null,
  changePasswordSuccess: false,
};

export const changePswSlice = createSlice({
  name,
  initialState: changePsw,
  reducers: {
    clearErrors: (state) => {
      state.changePasswordErrors = null;
      state.changePasswordSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changePassword.pending, (state) => ({
      ...state,
      loading: true,
      changePasswordErrors: null,
      changePasswordSuccess: false,
    }));
    builder.addCase(
      changePassword.fulfilled,
      (state, action: PayloadAction<Boolean>) => ({
        ...state,
        loading: false,
        changePasswordErrors: null,
        changePasswordSuccess: true,
      })
    );
    builder.addCase(
      changePassword.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        loading: false,
        changePasswordErrors: action.payload,
        changePasswordSuccess: false,
      })
    );
  },
});

// export action
export const { clearErrors } = changePswSlice.actions;

const changePassswordReducer = combineReducers({
  changePassword: changePswSlice.reducer,
});

export default changePassswordReducer;
