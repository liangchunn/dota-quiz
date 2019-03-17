import { includes, remove, times, constant } from 'lodash'
import { items as DotaConstantsItems } from 'dotaconstants'

const excludeIds = [
  275, // trident
  276, // combo_breaker
  260, // refresher_shard
  1021, // river_painter
  1022, // river_painter2
  1023, // river_painter3
  1024, // river_painter4
  1025, // river_painter5
  1026, // river_painter6
  1027, // river_painter7
  1028, // mutation_tombstone
  1029, // super_blink
  1030, // pocket_tower
  1032 // pocket_roshan
]

const deprecatedIds = [
  71, // poor_mans_shield
  212, // ring_of_aquila
  239, // iron_talon,
  196 // diffusal_blade_2
]

// transform into array
// filter useless items
// filter deprecated ids
// transform recipe into generic recipe

const items = Object.keys(DotaConstantsItems)
  .map(key => {
    const item = DotaConstantsItems[key]
    return {
      id: item.id,
      key,
      dname: item.dname,
      img: item.img,
      components: item.components
    }
  })
  .filter(item => !includes(excludeIds, item.id))
  .filter(item => !includes(deprecatedIds, item.id))

const itemsWithRecipe = items.reduce(
  (prev, curr) =>
    includes(curr.key, 'recipe_')
      ? [...prev, curr.key.replace('recipe_', '')]
      : prev,
  [] as string[]
)

const recipeIds = items.reduce(
  (prev, curr) => (includes(curr.key, 'recipe_') ? [...prev, curr.id] : prev),
  [] as number[]
)

const sanitizedItems = items.filter(item => !includes(recipeIds, item.id))

for (let item of sanitizedItems) {
  if (item.components !== null) {
    // let occurrences = 0
    const removedItems = remove(item.components, str =>
      str.startsWith('recipe_')
    )
    item.components = [
      ...item.components,
      ...times(removedItems.length, constant('recipe'))
    ]
  }
}

const normalizeSanitizedItems = sanitizedItems.reduce(
  (prev, curr) => ({
    ...prev,
    [curr.key]: curr
  }),
  {} as {
    [key: string]: {
      id: number
      key: string
      dname: string
      img: string
      components: string[] | null
    }
  }
)

for (const key of itemsWithRecipe) {
  // check if the item which the recipe belongs to exists in the normalized set
  // this is because we might have already filtered it out
  if (normalizeSanitizedItems[key]) {
    normalizeSanitizedItems[key].components!.push('recipe')
  }
}

// append back recipe
normalizeSanitizedItems['recipe'] = {
  id: -9999,
  key: 'recipe',
  dname: 'Recipe',
  img: '/apps/dota2/images/items/recipe_lg.png?3',
  components: null
}

export const allItems = {
  keys: Object.keys(normalizeSanitizedItems),
  itemByKey: normalizeSanitizedItems
}

let filteredItemsWithComponents = allItems.keys.reduce(
  (prev, key) =>
    allItems.itemByKey[key].components !== null
      ? {
          ...prev,
          [key]: allItems.itemByKey[key]
        }
      : prev,
  {} as typeof allItems.itemByKey
)

export const itemsWithComponents = {
  keys: Object.keys(filteredItemsWithComponents),
  itemByKey: filteredItemsWithComponents
}

let filteredItemsWithoutComponents = allItems.keys.reduce(
  (prev, key) =>
    allItems.itemByKey[key].components === null
      ? {
          ...prev,
          [key]: allItems.itemByKey[key]
        }
      : prev,
  {} as typeof allItems.itemByKey
)

export const itemsWithoutComponents = {
  keys: Object.keys(filteredItemsWithoutComponents),
  itemByKey: filteredItemsWithoutComponents
}

const usageMap: Record<string, number> = {}

for (const key of allItems.keys) {
  usageMap[key] = 0
}

for (const key of allItems.keys) {
  const component = allItems.itemByKey[key].components
  if (component !== null) {
    for (const c of component) {
      usageMap[c] = usageMap[c] + 1
    }
  }
}

export const shuffleStock = Object.keys(usageMap).reduce(
  (prev, key) => (usageMap[key] > 0 ? [...prev, key] : prev),
  [] as string[]
)
