import React, { Component } from 'react'
import axios from 'axios'

import Scoreboard from './Scoreboard'
import Deck from './Deck'
import Card from './Card'

import '../styles/reset.css'
import '../styles/Flashcards.css'

class Flashcards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      decks: {},
      currentDeck: "spanish"
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })

    try {
      const result = await axios.get('./FlashcardSets.json')

      this.setState({
        decks: result.data.flashcards,
        isLoading: false
      })
    } catch (error) {
      console.error(error)
      this.setState({
        error,
        isLoading: false
      })
    }
  }

  render() {
    return (
      <div className="main">
        <header className="flashcards-header">
          <h1 className="flashcards-title">Flashcards</h1>
        </header>

        <Deck 
          // cards={this.state.decks[this.state.currentDeck]}
        />

        <Scoreboard />
        <div>
          Pick other decks:
          { Object.keys(this.state.decks).map(key => {
            return <button>{key}</button>
          })}
        </div>
      </div>
    )
  }
}

export default Flashcards
