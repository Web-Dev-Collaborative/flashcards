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
      currentDeck: "",
      keysArray: [],
      currentCardIndex: 0,
      card1: {"front": "card one front", "back": "card one back"}
    }
  }

  flipCard = () => {
    this.setState({ flashcardFrontShowing: !this.state.flashcardFrontShowing })
  }

  changeDeckTo = (deckName) => {
    this.setState({ 
      currentDeck: deckName,
      currentCardIndex: 0,
      flashcardFrontShowing: true,
      keysArray: [...Object.keys(this.state.decks[deckName])] 
    })
  }

  showPreviousCard = () => {
    if (this.state.currentCardIndex <= 0) { return }
    this.setState({ 
      currentCardIndex: this.state.currentCardIndex - 1,
      flashcardFrontShowing: true 
    })
  }

  showNextCard = () => {
    if (this.state.currentCardIndex >= this.state.keysArray.length - 1) { return }
    this.setState({ 
      currentCardIndex: this.state.currentCardIndex + 1,
      flashcardFrontShowing: true
    })
  }

  async componentDidMount() {
    this.setState({ isLoading: true })

    try {
      const result = await axios.get('./FlashcardSets.json')

      this.setState({
        decks: result.data.flashcards,
        currentDeck: "spanish",
        keysArray: [...Object.keys(result.data.flashcards["spanish"])],
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
    const cardsArray = this.state.decks[this.state.currentDeck] 
    const cardFront = this.state.keysArray[this.state.currentCardIndex] 

    // if the card decks haven't loaded, don't attempt to render. wait for loading to finish.
    if (!cardFront || !cardsArray) return null
    
    return (
      <div className="main">
        <header className="flashcards-header">
          <h1 className="flashcards-title">Flashcards</h1>
        </header>

        <div className="flashcards-container">
          <div className="grid-div">
            <div className="controls-div controls-prev">
              <button onClick={this.showPreviousCard} className="controls prev">Prev Card</button>
            </div>
            <Card 
              frontShowing={this.state.flashcardFrontShowing} 
              front={cardFront}
              back={cardsArray[cardFront]}
              flipCard={this.flipCard}
            />
            <div className="controls-div controls-next">
              <button onClick={this.showNextCard} className="controls next">Next Card</button>
            </div>
          </div>
        </div>

        <Scoreboard />

        <div>
          <h3>Select other flashcard decks</h3>
          <div className="grid-div-even">
          { 
            Object.keys(this.state.decks).map(deckName => {
            return <div>
                    <button 
                      key={deckName}
                      onClick={(e) => this.changeDeckTo(deckName)}
                    > 
                    {deckName}</button>

                    <Deck 
                      cards={this.state.decks[deckName]}
                    />
                </div>
            })
          }
          </div> 
        </div>
      </div> //end of main
    )
  }
}

export default Flashcards
