import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    absences: [],
    membersById: {},
    totalAbsencesCount: 0,
    selectedAbsenceType: "all",
    currentPage: 1,
    selectedPeriodRange: null,
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
    setSelectedAbsenceType: (state, action) => {
      return {
        ...state,
        selectedAbsenceType: action.payload,
      };
    },
    setCurrentPage: (state, action) => {
      return {
        ...state,
        currentPage: action.payload,
      };
    },
    setSelectedPeriodRange: (state, action) => {
      return {
        ...state,
        selectedPeriodRange: action.payload,
      };
    },
  },
});

export const {
  setAbsences,
  setMembers,
  setTotalAbsencesCount,
  setSelectedAbsenceType,
  setCurrentPage,
  setSelectedPeriodRange,
} = appSlice.actions;
export default appSlice.reducer;
