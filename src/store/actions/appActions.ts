import { createAction } from '../../types/ActionHelpers'
import { AppActionTypes } from '../../types/ActionTypes'
import { Dispatch } from 'redux'
import { Store } from '../../types/Store'

export const toggleGuess = (dispatch: Dispatch) => (guess: string) =>
  dispatch(createAction(AppActionTypes.TOGGLE_GUESS, guess))

export const addGuess = (dispatch: Dispatch) => (guess: number) =>
  dispatch(createAction(AppActionTypes.ADD_GUESS, guess))

export const removeGuess = (dispatch: Dispatch) => (guess: number) =>
  dispatch(createAction(AppActionTypes.REMOVE_GUESS, guess))

export const nextQuiz = (dispatch: Dispatch) => () =>
  dispatch(createAction(AppActionTypes.NEXT_QUIZ))

export const restartGame = (dispatch: Dispatch) => () =>
  dispatch(createAction(AppActionTypes.RESTART_GAME))

export const selectGameMode = (dispatch: Dispatch) => (
  gameMode: Store.App['gameMode']
) => dispatch(createAction(AppActionTypes.SELECT_GAME_MODE, gameMode))

export const clearGameMode = (dispatch: Dispatch) => () =>
  dispatch(createAction(AppActionTypes.CLEAR_GAME_MODE))

export const reduceTries = (dispatch: Dispatch) => () =>
  dispatch(createAction(AppActionTypes.REDUCE_TRIES))
