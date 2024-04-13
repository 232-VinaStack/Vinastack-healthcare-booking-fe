import { createSlice } from '@reduxjs/toolkit';
import { createAppointment } from '@/services/dataService';

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    newAppointment: {
      clinic: null,
      doctor_id: null,
      start_time: '',
      appointment_date: '',
      symptoms: [],
      user_name: 'John Doe',
      user_phone: '1234567890',
    },
    listAppointment: [],
  },
  reducers: {
    makeAppointment: (state, { payload }) => {
      const { field, fieldData } = payload;
      state.newAppointment = { ...state.newAppointment, [field]: fieldData };
    },
    addAppointment: (state, action) => {
      state.value.push(action.payload);
    },
    removeAppointment: (state, action) => {
      state.value = state.value.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
    resetNewAppointment: (state) => {
      state.newAppointment = {
        ...state.newAppointment,
        doctor_id: null,
        start_time: '',
        appointment_date: '',
        symptoms: []
      };
    },
    sendAppointment: (state) => {
      createAppointment(state.newAppointment).then((data) => {
        console.log('Appointment created:', data);
      });
    },
  },
});

export const {
  makeAppointment,
  addAppointment,
  removeAppointment,
  resetNewAppointment,
  sendAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
