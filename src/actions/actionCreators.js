/* actions (types) */
// Decks
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const EDIT_DECK = 'EDIT_DECK'
  // Cards
  export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
  export const EDIT_CARD_FROM_DECK = 'EDIT_CARD_FROM_DECK'
  export const DELETE_CARD_FROM_DECK = 'DELETE_CARD_FROM_DECK'

/* constants */


/* action creators */
// Decks
export const addDeck = (deck) => {
  return { 
    type: ADD_DECK, 
    deck 
  }
}
export const editDeck = (deck) => {
  return { 
    type: EDIT_DECK, 
    deck 
  }
}
export const deleteDeck = (deck) => {
  return { 
    type: DELETE_DECK, 
    deck 
  }
}
// Cards
export const addCardToDeck = (card, deck) => {
  return { 
    type: ADD_CARD_TO_DECK, 
    card,
    deck 
  }
}
export const addCardToDeck = (card, deck) => {
  return { 
    type: EDIT_CARD_FROM_DECK, 
    card,
    deck 
  }
}
export const addCardToDeck = (card, deck) => {
  return { 
    type: DELETE_CARD_FROM_DECK, 
    card,
    deck 
  }
}


/*
Flashcards State
  Permanant/Data
    Decks
      Cards
    Stats

  Temporary/Data
    Buckets
      Easy
      Medium
      Wrong
    Quiz-Results

  UI-State
    optionsShowing
    reviewShowing
    quizShowing
    resultsShowing
    deckChooserShowing
    deckCreatorShowing
    deckEditorShowing

Flashcards Functions
  Cards
    flipCard
    showPreviousCard
    showNextCard

  Decks
    addDeck
    changeDeckTo

  Bucketing
    moveCardToBucket

  displayComponent
  toggleOptionsMenu

*/
