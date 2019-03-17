import { createAction } from '../../types/ActionHelpers'
import { TimerProgressActionTypes } from '../../types/ActionTypes'
import { Dispatch } from 'redux'

export const setProgress = (dispatch: Dispatch) => (progress: number) =>
  dispatch(createAction(TimerProgressActionTypes.SET_PROGRESS, progress))
