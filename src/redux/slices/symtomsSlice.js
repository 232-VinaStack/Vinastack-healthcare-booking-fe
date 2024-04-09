import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  symptoms: [],
}

export const symptomsSlice = createSlice({
  name: 'symptoms',
  initialState,
  reducers: {
    getSymptoms: (state,action) => {
      state.symptoms =  action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { getSymptoms } = symptomsSlice.actions

export default symptomsSlice.reducer