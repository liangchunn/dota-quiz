import { allItems } from './transformODotaConstants'

export const selectItem = (key: string) => {
  return allItems.itemByKey[key]
}
