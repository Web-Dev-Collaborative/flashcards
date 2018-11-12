/* action creators */
// Decks
export const addDeck = (deck) => {
  return { 
    type: 'ADD_DECK', 
    deck 
  }

  // addDeck = deck => {
  //   // Validate deck has a name and cards and that the name is not a duplicate
  //   if (!deck.name) return
  //   if (!deck.cards) return
  //   // duplicate name 
  //   const currentDeckNames = Object.keys(this.state.decks)
  //   if (currentDeckNames.includes(deck.name)) {
  //     alert('You already have a deck by that name. Try another name.')
  //     return
  //   }
  //   const tmpDecks = {...this.state.decks, [deck.name]: deck.cards}
  //   // Update state adding the deck and making it the currently selected deck
  //   this.setState({ 
  //     decks: tmpDecks,
  //     currentDeck: deck.cards,
  //     currentDeckName: deck.name,
  //     currentCardIndex: 0,
  //     flashcardFrontShowing: true,
  //     keysArray: Object.keys(deck.cards),
  //     easyBucket: {},
  //     mediumBucket: {},
  //     difficultBucket: {},
  //     reviewShowing: true,
  //     deckCreatorShowing: false
  //   })
  // }
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
