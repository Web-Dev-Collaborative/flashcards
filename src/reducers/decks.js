const decks = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_DECK' :
      // Validate deck has a name and cards and that the name is not a duplicate
      if (!action.deckName) return state
      if (!action.cards) return state
      // duplicate name 
      const currentDeckNames = Object.keys(state)
      if (currentDeckNames.includes(action.deckName)) {
        alert('You already have a deck by that name. Try another name.')
        return state
      }
      // Add the new deck to the decks item passed in as state
      return {
        ...state, 
        [action.deckName]: action.cards
      }
    case 'DELETE_DECK' :
      console.log('DELETE_DECK redu')
      return state
    case 'EDIT_DECK' :
      console.log('EDIT_DECK redu')
      return state
    case 'CHANGE_DECK' :
      console.log('CHANGE_DECK redu')
      console.dir(state)
      console.dir(action)
      // changeDeckTo = deckName => {
      if (!state && !state[action.deckName]) {
        console.log('No deck of name '+action.deckName)
        return state
      } else {
        return {
          ...state,
          currentDeck: state[action.deckName],
          currentDeckName: action.deckName,
          currentCardIndex: 0,
          flashcardFrontShowing: true,
          keysArray: Object.keys(state[action.deckName])
        }
      }
    default :
      return state
  }
}

export default decks