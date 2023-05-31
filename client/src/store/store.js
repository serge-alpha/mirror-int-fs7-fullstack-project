import { configureStore } from '@reduxjs/toolkit'

import userSlice from './features/userSlice'
import bookSlice from './features/bookSlice'

export const store= configureStore({
  reducer: {
    user:userSlice,
    books:bookSlice
  }
})

