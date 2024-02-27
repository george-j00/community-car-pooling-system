import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authRouter from "./features/auth/authSlice";
import { persistReducer , persistStore} from "redux-persist";
import storage from "./storage";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["user","token"],
};

const persistedReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authRouter),
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
