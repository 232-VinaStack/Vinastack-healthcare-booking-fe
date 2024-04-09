import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { appointmentSlice } from '../slices/appointmentSlice.js';
import doctorReducer from '../slices/doctorSlice.js';
import symptomsReducer from '../slices/symtomsSlice.js'

// Combine reducers
const rootReducer = combineReducers({
  appointment: appointmentSlice.reducer,
  doctor: doctorReducer,
  symptoms: symptomsReducer,
});

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
 const store = configureStore({
  reducer: persistedReducer,
});

// Create persisted store
export const persistor = persistStore(store);
export default store;