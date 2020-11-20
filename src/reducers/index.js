import { combineReducers } from 'redux'
import info from './info'
import items from './items'
import user from './user'

export default combineReducers({
  info,
  items,
  user,
})
