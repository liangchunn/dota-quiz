const { writeFileSync } = require('fs')
import {
  allItemsById,
  itemsWithComponentsById,
  itemsWithoutComponentsById
} from '../util/transformODotaConstantsById'

writeFileSync(
  './data.json',
  JSON.stringify({
    allItemsById,
    itemsWithComponentsById,
    itemsWithoutComponentsById
  })
)
