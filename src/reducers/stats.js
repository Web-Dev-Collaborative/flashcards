const stats = (state = {}, action) => {
  switch (action.type) {
    case 'RETRIEVE_STATS':
      console.log('RETRIEVE_STATS redu')
      break
    case 'SAVE_STATS':
      console.log('SAVE_STATS redu')
      break
    default:
      return state
  }
  return state
}

export default stats