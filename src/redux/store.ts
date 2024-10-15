// src/redux/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from './userSlice';

// Define the root reducer
const rootReducer = combineReducers({
  user: userReducer,
});

// Configuring redux-persist to use localStorage for persisting
const persistConfig = {
  key: 'root',
  storage, // Use localStorage for persisting
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store using the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore serialization checks for redux-persist
    }),
});

// Set up persistor to be used with PersistGate
export const persistor = persistStore(store);

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
