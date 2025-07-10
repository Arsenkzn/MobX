import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import { contactApiSlice, contactsSlice } from "./reducers/contacts";
import { groupApiSlice } from "./reducers/group-reducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  groups: groupApiSlice.reducer,
  [contactApiSlice.reducerPath]: contactApiSlice.reducer,
  [groupApiSlice.reducerPath]: groupApiSlice.reducer,
});

const persistedContactsReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedContactsReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(contactApiSlice.middleware, groupApiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
