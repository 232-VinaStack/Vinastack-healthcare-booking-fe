import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  doctor: [],
  dep_id: "",
  dep_name: "",
}

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    getDoctor: (state,action) => {
      state.doctor =  action.payload;
    },
    getDepId: (state, action) => {
      state.dep_id = action.payload;
    },
    getDepName: (state, action) => {
      state.dep_name = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { getDoctor, getDepId, getDepName } = doctorSlice.actions

export default doctorSlice.reducer