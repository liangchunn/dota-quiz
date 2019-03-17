import { difference, sampleSize, shuffle } from 'lodash'
import {
  itemsWithComponentsById,
  shuffleStockById
} from '../../util/transformODotaConstantsById'

export function generateChoice(item: string, choiceLength: number) {
  let choiceSize = choiceLength
  // get the components for the given item
  const components = itemsWithComponentsById.itemsById[item].components!
  // check if the choice size is less than the component's length
  // if it is, then we return the component's length + 1 as default
  if (choiceSize <= components.length) {
    choiceSize = components.length + 1
  }
  // now we do a set negation on the shuffle stock and the item's component
  const diff = difference(shuffleStockById, components, [item])
  // and then we sample the set for (choiceSize - component length) items
  const choices = sampleSize(diff, choiceSize - components.length)

  return {
    choices: shuffle([...components, ...choices]) as string[],
    answer: components as string[]
  }
}
