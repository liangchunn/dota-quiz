import produce from 'immer'
import { Store } from '../../types/Store'
import { ActionWithPayload, Action } from '../../types/ActionHelpers'
import { TimerProgressActionTypes } from '../../types/ActionTypes'

const defaultState: Store.TimerProgress = {
  progress: 100
}

export const timerProgressReducer = (
  prevState = defaultState,
  action: ActionWithPayload<TimerProgressActionTypes, any> & Action<any>
) =>
  produce(prevState, draft => {
    switch (action.type) {
      case TimerProgressActionTypes.SET_PROGRESS: {
        draft.progress = action.payload
        return
      }
      default:
        return
    }
  })
