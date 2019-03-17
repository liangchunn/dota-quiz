import { allItemsById } from './transformODotaConstantsById'

export const selectItemById = (id: string) => {
  return allItemsById.itemsById[id]
}
