import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import authSlice from "../reducer/auth";
import courseSlice from "../reducer/course";
import categorySlice from "../reducer/courseCategory";

// 1. Combine reducers
const rootReducer = combineReducers({
  auth: authSlice,
  courses: courseSlice,
  category: categorySlice,
});

// 2. Configure persist
const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth"], // Only persist the auth slice
};

// 3. Wrap reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

// 5. Create persistor
export const persistor = persistStore(store);

// 6. Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
