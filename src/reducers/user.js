const initUser = {
  id: '',
  selectedItem: ''
}

const user = (state = initUser, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return {
        ...state,
        id: action.id,

      }
    case 'SELECTED_ITEM':
      return {
        ...state,
        selectedItem: action.item,
      }
    default:
      return state
  }
}

export default user
