export const connection = info => ({
  type: 'CONNECT',
  info
})

export const selectedItem = item => ({
  type: 'SELECTED_ITEM',
  item
})

export const addItems = items => ({
  type: 'ADD_ITEMS',
  items
})
