import { createSlice } from '@reduxjs/toolkit';
import { createAppointment } from '@/services/dataService';

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    newAppointment: {
      doctor_id: 1,
      patient_id: 1,
      start_time: '',
      end_time: '',
      appointment_date: '',
      symptoms: [
        {
          id: 1,
          name: 'Cough',
        },
        {
          id: 2,
          name: 'Fever',
        },
      ],
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
      state.newAppointment = {};
    },
    sendAppointment: (state) => {
      createAppointment(state.newAppointment)
        .then((data) => {
          console.log('Appointment created:', data);
        })
        .catch((error) => {
          console.error('Error creating appointment:', error);
        });
    },
  },
});

export const {
  makeAppointment,
  addAppointment,
  removeAppointment,
  sendAppointment,
} = appointmentSlice.actions;

export default appointmentSlice;
