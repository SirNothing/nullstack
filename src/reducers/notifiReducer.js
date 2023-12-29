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

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(message(content))
    setTimeout(() => {
      dispatch(message(''))
    }, (time * 1000))
  }
}
