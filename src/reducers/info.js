const initialState = {}

const info = (state = initialState, action) => {
  console.log('[action]:', action);
  switch (action.type) {
    case 'CONNECT':
      return {
        ...state,
        ...action.info,
        userid: `${action.info.username}#${action.info.discriminator}`
      };
    default:
      return state
  }
}

export default info
