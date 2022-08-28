import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    absences: [],
    membersById: {},
    totalAbsencesCount: 0,
  },
  reducers: {
    setAbsences: (state, action) => {
      return {
        ...state,
        absences: action.payload,
      };
    },
    setTotalAbsencesCount: (state, action) => {
      return {
        ...state,
        totalAbsencesCount: action.payload,
      };
    },
    setMembers: (state, action) => {
      return {
        ...state,
        membersById: action.payload,
      };
    },
  },
});

export const { setAbsences, setMembers, setTotalAbsencesCount } =
  appSlice.actions;
export default appSlice.reducer;
