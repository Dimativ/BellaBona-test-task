import {settingsUnion} from './settings'
import {objectsUnion} from './objects'
import {sectionsUnion} from './sections'
import {pagesUnion} from './pages'
import {mealsUnion} from './meals'
import {reviewsUnion} from './reviews'

export const schemaTypes = [
  ...settingsUnion,
  ...objectsUnion,
  ...sectionsUnion,
  ...pagesUnion,
  ...mealsUnion,
  ...reviewsUnion,
]
