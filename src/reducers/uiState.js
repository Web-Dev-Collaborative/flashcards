const uiState = (state = {}, action) => {
  switch(action.type) {
    case 'CHANGE_CURRENT_DECK' :
      // currentDeck: {},
      // currentDeckName: 'spanish',
      // keysArray: [],
      // currentCardIndex: 0
      return state
    case 'TOGGLE_FLASHCARD_FRONT_SHOWING' :
      console.log('TOGGLE_FLASHCARD_FRONT_SHOWING redu')
      console.dir(state)
      console.dir(action)
      return {
        ...state,
        flashcardFrontShowing: !state.flashcardFrontShowing
      }
    default :
      return state
  }
}

export default uiState