import { combineReducers } from 'redux'
import { appReducer } from './App'
import { timerProgressReducer } from './TimerProgress'

export const rootReducer = combineReducers({
  App: appReducer,
  TimerProgress: timerProgressReducer
})
