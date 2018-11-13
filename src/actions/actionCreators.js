/* action creators */
// Decks
export const addDeck = (deck) => {
  return { 
    type: 'ADD_DECK', 
    deckName: deck.deckName,
    cards: deck.cards
  }
}

export const editDeck = (deck) => {
  return { 
    type: 'EDIT_DECK', 
    deck 
  }
}

export const deleteDeck = (deck) => {
  return { 
    type: 'DELETE_DECK', 
    deck 
  }
}

export const changeDeckTo = (deckName) => {
  return {
    type: 'CHANGE_DECK', 
    deckName
  }
}

// Cards
export const addCardToDeck = (card, deck) => {
  return { 
    type: 'ADD_CARD_TO_DECK', 
    card,
    deck 
  }
}
export const EditCardFromDeck = (card, deck) => {
  return { 
    type: 'EDIT_CARD_FROM_DECK', 
    card,
    deck 
  }
}
export const DeleteCardFromDeck = (card, deck) => {
  return { 
    type: 'DELETE_CARD_FROM_DECK', 
    card,
    deck 
  }
}
// stats
export const retrieveStats = () => {
  return {
    type: 'RETRIEVE_STATS'
  }
}
export const saveStats = () => {
  return {
    type: 'SAVE_STATS'
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
