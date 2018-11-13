const uiState = (state = {}, action) => {
  switch(action.type) {
    case 'CHANGE_CURRENT_DECK' :
      // currentDeck: {},
      // currentDeckName: 'spanish',
      // keysArray: [],
      // currentCardIndex: 0
      return state
    default :
      return state
  }
}

export default uiState