import { createSlice } from '@reduxjs/toolkit'

const notifiSlice = createSlice({
  name: 'notifi',
  initialState: '',
  reducers: {
    message(state, action) {
      return action.payload
    },
  }
})
export const { message } = notifiSlice.actions
export default notifiSlice.reducer
