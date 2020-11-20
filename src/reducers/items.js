const initItems = [ 
  {key: 0, category: 0, name: '', thumbnail: ''},
  {key: 1, category: 0, name: '', thumbnail: ''},
  {key: 2, category: 0, name: '', thumbnail: ''},
]

const items = (state = initItems, action) => {
  switch (action.type) {
    case 'ADD_ITEMS':
      return [
        ...state,
        action.items,
      ]
    default:
      return state
  }
}

export default items
