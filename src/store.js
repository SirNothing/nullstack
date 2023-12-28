import { configureStore } from '@reduxjs/toolkit'
import  anecdoteReducer from './reducers/anecdoteReducer'
import  filterReducer from './reducers/filterReducer'
import notifiReducer from './reducers/notifiReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notifi: notifiReducer
  }
})
export default store
