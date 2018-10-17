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
      currentDeck: "",
      keysArray: [],
      currentCardIndex: 0,
      workingEasyDeck: [],
      workingMediumDeck: [],
      workingDifficultDeck: [],
      // testing below
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

  moveCardToDeck = (card, deck) => {
    console.log('moving card '+card+' to deck '+deck)
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
    // if the card decks haven't loaded, don't attempt to render. wait for loading to finish.
    if (!this.state.keysArray[this.state.currentCardIndex] || !this.state.decks[this.state.currentDeck]) return null
    
    return (
      <div className="main">
        <header className="flashcards-header">
          <h1 className="flashcards-title">Flashcards</h1>
        </header>

        <div className="flashcards-container">
          <div className="grid-div">
            <img 
              alt="Previous Card"
              className="controls controls-div controls-prev prev"
              style={ { transform: 'rotate(180deg)' } }
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACTSURBVGhD7dmxDYQwEERRJ3RAIVQIVEVCEfRDArOBM8sissbmP2miS7zSv4gEAL8za4d2VrZoXdi0p7JLmzR78ch4bOmIvDi2C5HPrZWOiMVvJNYaibkiMUck5ojEXJGYIxJzRGKOhjjkS1q7Zm/VSo/P6+LPTlJOSMoFSTkhKSck5YKknJCUkyGSGupjKAC0kNILaew3BgvattYAAAAASUVORK5CYII=" 
              onClick={this.showPreviousCard} 
              />
            <Card 
              frontShowing={this.state.flashcardFrontShowing} 
              front={this.state.keysArray[this.state.currentCardIndex]}
              back={this.state.decks[this.state.currentDeck][this.state.keysArray[this.state.currentCardIndex]]}
              flipCard={this.flipCard}
              moveCardToDeck={this.moveCardToDeck}
            />
            <img 
              alt="Next Card"
              className="controls controls-div controls-next next"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACTSURBVGhD7dmxDYQwEERRJ3RAIVQIVEVCEfRDArOBM8sissbmP2miS7zSv4gEAL8za4d2VrZoXdi0p7JLmzR78ch4bOmIvDi2C5HPrZWOiMVvJNYaibkiMUck5ojEXJGYIxJzRGKOhjjkS1q7Zm/VSo/P6+LPTlJOSMoFSTkhKSck5YKknJCUkyGSGupjKAC0kNILaew3BgvattYAAAAASUVORK5CYII=" 
              onClick={this.showNextCard} 
            />
          </div>
        </div>

        <Scoreboard currentDeck={this.state.currentDeck} /> 

        <div className="decks">
          <h3>Select other flashcard decks</h3>
          <div className="grid-div-even">
          { 
            Object.keys(this.state.decks).map(deckName => {
            return <div key={deckName} className="grid-item">
                    <button 
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
