import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/features/user";
import boardsReducer from "@/features/boards/boardSlice";
import columnsReducer from "@/features/columns/columnSlice";
import taskReducer from "@/features/tasks/taskSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: [""],
  blacklist: ["modal"],
};

const rootReducer = combineReducers({
  user: userReducer,
  boards: boardsReducer,
  columns: columnsReducer,
  tasks: taskReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);

export { persistor, store };

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
