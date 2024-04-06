import { configureStore } from '@reduxjs/toolkit';
import { appointmentSlice } from '../slices/appointmentSlice.js';

export default configureStore({
  reducer: {
    appointment: appointmentSlice.reducer,
  },
});
