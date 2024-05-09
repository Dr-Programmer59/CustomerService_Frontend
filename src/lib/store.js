import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './reducers/user'

export const makeStore = () => {
  return configureStore({
    reducer: {
        userReducer: UserReducer,
    },
  })
}