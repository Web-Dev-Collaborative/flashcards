const cards = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_CARD_TO_DECK' :
      console.log('ADD_CARD_TO_DECK redu')
    case 'EDIT_CARD_FROM_DECK' :
      console.log('EDIT_CARD_FROM_DECK redu')
    case 'DELETE_CARD_FROM_DECK' :
      console.log('DELETE_CARDFROM_DECK redu')
    default :
      return state
  }
  return state
}

export default cards