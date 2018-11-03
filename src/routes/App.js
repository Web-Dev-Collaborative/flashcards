import React from 'react'
import { NavLink } from 'react-router-dom'

import Flashcards from '../components/Flashcards'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Flashcards />
      // <div>
      //   <h1>Flashcards</h1>
      //   <h3>What would you like to do?</h3>
      //   <NavLink className="nav-link" activeClassName="active" to="/review">
      //     <h5>Review</h5>
      //     <p>Review a deck of flashcards</p>
      //   </NavLink>
      //   <NavLink className="nav-link" activeClassName="active" to="/decks">
      //     <h5>Decks</h5>
      //     <p>Select a flashcard deck, create a flashcard deck, edit a flashcard deck, and delete a flashcard deck</p>
      //   </NavLink>
      //   <NavLink className="nav-link" activeClassName="active" to="/quiz">
      //     <h5>Quiz</h5>
      //     <p>Quiz yourself on a deck of flashcards</p>
      //   </NavLink>
      // </div>
    )
  }
}

export default App