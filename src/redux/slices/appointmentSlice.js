import { createSlice } from '@reduxjs/toolkit';

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    value: [],
  },
  reducers: {
    makeAppointment: (state, action) => {
      state.value.push(action.payload);
    },
    addAppointment: (state, action) => {
      state.value.push(action.payload);
    },
    removeAppointment: (state, action) => {
      state.value = state.value.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
  },
});

export const { makeAppointment, addAppointment, removeAppointment } =
  appointmentSlice.actions;

export default appointmentSlice;
