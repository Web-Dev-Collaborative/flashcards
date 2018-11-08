const decks = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_DECK' :
      console.log('ADD_DECK redu')
      break
    case 'DELETE_DECK' :
      console.log('DELETE_DECK redu')
      break
    case 'EDIT_DECK' :
      console.log('EDIT_DECK redu')
      break
    default :
      return state
  }
  return state
}

export default decks