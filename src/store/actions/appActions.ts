import { createAction } from '../../types/ActionHelpers'
import { AppActionTypes } from '../../types/ActionTypes'
import { Dispatch } from 'redux'

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
