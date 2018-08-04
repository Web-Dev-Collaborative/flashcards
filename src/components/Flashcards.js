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
      flashcardFrontShowing: true,
      // testing below
      currentDeck: "spanish",
      card1: {"front": "card one front", "back": "card one back"}
    }
  }

  flipCard = () => {
    this.setState({ flashcardFrontShowing: !this.state.flashcardFrontShowing })
  }

  changeDeckTo = (deckName) => {
    this.setState({ currentDeck: deckName })
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

        <div className="flashcards-container">
          <div className="grid-div">
            <div className="controls-div controls-prev">
              <button className="controls prev">Prev Card</button>
            </div>
            <Card 
              frontShowing={this.state.flashcardFrontShowing} 
              card={this.state.card1}
              flipCard={this.flipCard}
            />
            <div className="controls-div controls-prev">
              <button className="controls next">Next Card</button>
            </div>
          </div>
        </div>

        <Scoreboard />
        <div>
          Pick other decks:
          { Object.keys(this.state.decks).map(deckName => {
            return <button 
                      key={deckName}
                      onClick={(e) => this.changeDeckTo(deckName)}
                    > 
                    {deckName}</button>
          })}
  
          <Deck 
            cards={this.state.decks[this.state.currentDeck]}
          />
        </div>
      </div> //end of main
    )
  }
}

export default Flashcards
