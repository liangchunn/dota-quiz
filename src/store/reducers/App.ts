import produce from 'immer'
import { shuffle, difference } from 'lodash'
import { Store } from '../../types/Store'
import { ActionWithPayload, Action } from '../../types/ActionHelpers'
import { AppActionTypes } from '../../types/ActionTypes'
import { generateChoice } from '../game/generateChoice'
import { BASE_POINTS } from '../../util/constants'
import { calculateStreakBonus } from '../../util/streakBonus'
import { itemsWithComponentsById } from '../../util/transformODotaConstantsById'

const getDefaultState = (): Store.App => {
  const itemList = shuffle(itemsWithComponentsById.ids)
  const choiceLength = 8
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
    streak: 0,
    highestStreak: 0,
    gameMode: 'NONE'
  }
}

const getGameModeState = (gameMode: Store.App['gameMode']): Store.App => {
  switch (gameMode) {
    case 'CLASSIC':
      return {
        ...getDefaultState(),
        gameMode: 'CLASSIC' as Store.App['gameMode']
      }
    case 'HARDCORE_CLASSIC':
      return {
        ...getDefaultState(),
        gameMode: 'HARDCORE_CLASSIC' as Store.App['gameMode'],
        tries: 1
      }
    case 'TIMED':
      return {
        ...getDefaultState(),
        gameMode: 'TIMED' as Store.App['gameMode']
      }
    default: {
      return getDefaultState()
    }
  }
}

export const appReducer = (
  prevState = getDefaultState(),
  action: ActionWithPayload<AppActionTypes, any> & Action<any>
) =>
  produce(prevState, draft => {
    switch (action.type) {
      case AppActionTypes.REDUCE_TRIES: {
        draft.tries--
        if (draft.tries === 0) {
          draft.gameState = 'GAME_OVER'
          draft.guesses = prevState.answer.map(answer =>
            prevState.choices.indexOf(answer)
          )
        }
        return
      }
      case AppActionTypes.CLEAR_GAME_MODE: {
        draft.gameMode = 'NONE'
        return
      }
      case AppActionTypes.SELECT_GAME_MODE: {
        return getGameModeState(action.payload)
      }
      case AppActionTypes.RESTART_GAME: {
        return getGameModeState(prevState.gameMode)
      }
      case AppActionTypes.NEXT_QUIZ: {
        if (
          prevState.gameState === 'FAIL' ||
          prevState.gameState === 'GAME_OVER'
        ) {
          return
        }
        if (prevState.currentIndex === prevState.itemList.length - 1) {
          draft.gameState = 'GAME_WON'
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
              draft.score + BASE_POINTS + calculateStreakBonus(prevState.streak)
            draft.streak = draft.streak + 1
            if (draft.streak > draft.highestStreak) {
              draft.highestStreak = draft.streak
            }
          } else {
            draft.tries = draft.tries - 1
            if (draft.tries === 0) {
              draft.gameState = 'GAME_OVER'
              draft.guesses = prevState.answer.map(answer =>
                prevState.choices.indexOf(answer)
              )
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
