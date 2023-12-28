import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      state = action.payload
    },
  }
})
// const filterReducer = (state = '', action) => {
//   switch(action.type) {
//     case 'setFilter':
//       return action.payload.filter
//     default:
//       return state
//   }
// }

// export const setFilter = (filter) => {
//   return { type: 'setFilter', payload: {filter} }
// }
export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
