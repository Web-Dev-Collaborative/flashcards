import React from 'react'
import { NavLink } from 'react-router-dom'

import Flashcards from '../components/Flashcards'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      decks: {},
      stats: {},
      flashcardFrontShowing: true,
      currentDeck: {},
      currentDeckName: '',
      keysArray: [],
      currentCardIndex: 0,
      // Buckets to hold cards while working through a set, categorized by difficulty
      easyBucket: {},
      mediumBucket: {},
      difficultBucket: {},
      // Options and other component display booleans
      optionsShowing: false,
      reviewShowing: true,
      quizShowing: false,
      resultsShowing: false,
      deckChooserShowing: false,
      deckCreatorShowing: false,
      deckEditorShowing: false
    }
  }

  render() {
    return (
      <div>
        <h1>Flashcards</h1>
        <div className="grid-parent grid-parent-3">
          <NavLink className="nav-link" activeClassName="active" to="/review">
            <h5>Review</h5>
            <p>Review a deck of flashcards</p>
          </NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/decks">
            <h5>Decks</h5>
            <p>Select a flashcard deck for review/quiz, create a flashcard deck, edit a flashcard deck, and delete a flashcard deck</p>
          </NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/quiz">
            <h5>Quiz</h5>
            <p>Quiz yourself on a deck of flashcards</p>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default App