import produce from 'immer'
import { Store } from '../../types/Store'
import { ActionWithPayload, Action } from '../../types/ActionHelpers'
import {
  TimerProgressActionTypes,
  AppActionTypes
} from '../../types/ActionTypes'

const defaultState: Store.TimerProgress = {
  progress: 100
}

export const timerProgressReducer = (
  prevState = defaultState,
  action: ActionWithPayload<TimerProgressActionTypes | AppActionTypes, any> &
    Action<any>
) =>
  produce(prevState, draft => {
    switch (action.type) {
      case AppActionTypes.SELECT_GAME_MODE:
      case AppActionTypes.CLEAR_GAME_MODE: {
        draft.progress = 100
      }
      case TimerProgressActionTypes.SET_PROGRESS: {
        draft.progress = action.payload
        return
      }
      default:
        return
    }
  })
