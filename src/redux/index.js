import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";

export default configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["app.selectedPeriodRange"],
        ignoredActions: ["app/setSelectedPeriodRange"],
      },
    }),
});
