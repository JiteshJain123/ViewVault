import { configureStore } from '@reduxjs/toolkit'
import tvReducer from './reducers/tvSlice'
import personReducer from './reducers/personSlice'
import movieReducer from './reducers/movieSlice'

export const store = configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer,
    person:personReducer
  },
})