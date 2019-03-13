import { createSelector } from 'reselect'
import { Store } from '../../types/Store'

const selectCurrentIndex = (state: Store.All) => state.App.currentIndex
const selectItemList = (state: Store.All) => state.App.itemList
export const selectCurrentChoices = (state: Store.All) => state.App.choices

export const selectCurrentItem = createSelector(
  selectItemList,
  selectCurrentIndex,
  (list, i) => list[i]
)

export const selectCurrentGuesses = (state: Store.All) => state.App.guesses

export const selectCurrentGuessState = createSelector(
  selectCurrentChoices,
  selectCurrentGuesses,
  (a, b) => {
    return b.map(guess => {
      if (guess === null) {
        return null
      } else {
        return a[guess]
      }
    })
  }
)

export const selectCurrentProgress = createSelector(
  selectItemList,
  selectCurrentIndex,
  (list, i) => [i + 1, list.length]
)
