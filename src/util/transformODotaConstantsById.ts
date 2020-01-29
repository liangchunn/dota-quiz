import {
  allItems,
  itemsWithComponents,
  itemsWithoutComponents
} from './transformODotaConstants'

type ItemDataById = {
  [id: string]: {
    id: number
    key: string
    dname: string
    img: string
    components: string[] | null
  }
}
const transformToIdFromKeys = Object.keys(allItems.itemByKey).reduce(
  (prev, key) => {
    const id = allItems.itemByKey[key].id
    const item = allItems.itemByKey[key]
    const components = item.components
      ? item.components
          .filter(k => Boolean(k))
          .map(k => String(allItems.itemByKey[k].id))
      : null
    return {
      ...prev,
      [id]: {
        ...item,
        components
      }
    }
  },
  {} as ItemDataById
)

const transformItemsWithComponentsToId = Object.keys(
  itemsWithComponents.itemByKey
).reduce((prev, key) => {
  const id = itemsWithComponents.itemByKey[key].id
  const item = itemsWithComponents.itemByKey[key]
  const components = item.components
    ? item.components
        .filter(k => Boolean(k))
        .map(k => String(allItems.itemByKey[k].id))
    : null
  return {
    ...prev,
    [id]: {
      ...item,
      components
    }
  }
}, {} as ItemDataById)

const transformItemsWithoutComponentsToId = Object.keys(
  itemsWithoutComponents.itemByKey
).reduce((prev, key) => {
  const id = itemsWithoutComponents.itemByKey[key].id
  const item = itemsWithoutComponents.itemByKey[key]
  const components = null
  return {
    ...prev,
    [id]: {
      ...item,
      components
    }
  }
}, {} as ItemDataById)

function getShuffleStock() {
  const usageMap: Record<string, number> = {}

  for (const id of allItemsById.ids) {
    usageMap[id] = 0
  }

  for (const id of allItemsById.ids) {
    const component = allItemsById.itemsById[id].components
    if (component !== null) {
      for (const c of component) {
        usageMap[c] = usageMap[c] + 1
      }
    }
  }

  return Object.keys(usageMap).reduce(
    (prev, key) => (usageMap[key] > 0 ? [...prev, key] : prev),
    [] as string[]
  )
}

export const allItemsById = {
  ids: Object.keys(transformToIdFromKeys),
  itemsById: transformToIdFromKeys
}
export const itemsWithComponentsById = {
  ids: Object.keys(transformItemsWithComponentsToId),
  itemsById: transformItemsWithComponentsToId
}
export const itemsWithoutComponentsById = {
  ids: Object.keys(transformItemsWithoutComponentsToId),
  itemsById: transformItemsWithoutComponentsToId
}

export const shuffleStockById = getShuffleStock()
