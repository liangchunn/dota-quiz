import produce from 'immer'
import { shuffle, difference } from 'lodash'
import { Store } from '../../types/Store'
import { ActionWithPayload, Action } from '../../types/ActionHelpers'
import { AppActionTypes } from '../../types/ActionTypes'
import { itemsWithComponents } from '../../util/transformODotaConstants'
import { generateChoice } from '../game/generateChoice'

const getDefaultState = (): Store.App => {
  const itemList = shuffle(itemsWithComponents.keys)
  const choiceLength = 6
  const choice = generateChoice(itemList[0], choiceLength)
  return {
    itemList,
    answer: choice.answer,
    choices: choice.choices,
    guesses: choice.answer.map(_ => null),
    currentIndex: 0,
    score: 0,
    choiceLength,
    gameState: 'WAITING',
    tries: 3,
    streak: 0
  }
}

export const appReducer = (
  prevState = getDefaultState(),
  action: ActionWithPayload<AppActionTypes, any> & Action<any>
) =>
  produce(prevState, draft => {
    switch (action.type) {
      case AppActionTypes.RESTART_GAME: {
        return getDefaultState()
      }
      case AppActionTypes.NEXT_QUIZ: {
        if (
          prevState.gameState === 'FAIL' ||
          prevState.gameState === 'GAME_OVER'
        ) {
          return
        }
        const choice = generateChoice(
          prevState.itemList[draft.currentIndex + 1],
          prevState.choiceLength
        )
        draft.gameState = 'WAITING'
        draft.currentIndex = draft.currentIndex + 1
        draft.choices = choice.choices
        draft.answer = choice.answer
        draft.guesses = choice.answer.map(_ => null)
      }
      case AppActionTypes.ADD_GUESS: {
        if (
          prevState.gameState === 'SUCCESS' ||
          prevState.gameState === 'GAME_OVER'
        ) {
          return
        }
        const index = prevState.guesses.indexOf(null)
        if (~index) {
          draft.guesses[index] = action.payload
        }
        // check if the board is full and check if the answer is correct
        if (!~draft.guesses.indexOf(null) && draft.gameState === 'WAITING') {
          if (
            difference(draft.guesses.map(d => draft.choices[d!]), draft.answer)
              .length === 0
          ) {
            draft.gameState = 'SUCCESS'
            draft.score =
              draft.score + 200 + Math.pow(prevState.streak, 2) * 0.01 * 200
            draft.streak = draft.streak + 1
          } else {
            draft.tries = draft.tries - 1
            if (draft.tries === 0) {
              draft.gameState = 'GAME_OVER'
            } else {
              draft.gameState = 'FAIL'
            }
            draft.streak = 0
          }
        }
        return
      }
      case AppActionTypes.REMOVE_GUESS: {
        if (
          prevState.gameState === 'SUCCESS' ||
          prevState.gameState === 'GAME_OVER'
        ) {
          return
        }
        const index = action.payload
        if (prevState.guesses[index] !== null) {
          draft.guesses[index] = null
          if (draft.gameState === 'FAIL') {
            draft.gameState = 'WAITING'
          }
        }
        return
      }
      default:
        return
    }
  })
