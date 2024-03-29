import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { persistReducer } from "redux-persist";
import storage from "./storage";
import rideReducer from "./features/ride/rideSlice";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["user","userLocation"],
};

const persistedReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  ride:rideReducer
});

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
