export const connection = info => ({
  type: 'CONNECT',
  info
})

export const addItems = items => ({
  type: 'ADD_ITEMS',
  items
})
