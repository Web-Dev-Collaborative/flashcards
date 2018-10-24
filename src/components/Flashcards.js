import React, { Component } from 'react'
import axios from 'axios'

import Scoreboard from './Scoreboard'
import Deck from './Deck'
import Survey from './Survey'
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
      currentDeck: {},
      currentDeckName: '',
      keysArray: [],
      currentCardIndex: 0,
      // Buckets to hold cards while working through a set, categorized by difficulty
      easyBucket: {},
      mediumBucket: {},
      difficultBucket: {}
    }
  }

  flipCard = () => {
    this.setState({ flashcardFrontShowing: !this.state.flashcardFrontShowing })
  }

  changeDeckTo = deckName => {
    if (!this.state.decks && !this.state.decks[deckName]) {
      console.log('No deck of name '+deckName)
      return null
    } else {
      this.setState({ 
        currentDeck: this.state.decks[deckName],
        currentDeckName: deckName,
        currentCardIndex: 0,
        flashcardFrontShowing: true,
        keysArray: Object.keys(this.state.decks[deckName]),
        easyBucket: {},
        mediumBucket: {},
        difficultBucket: {}
      })  
    }
  }

  showPreviousCard = () => {
    if (this.state.currentCardIndex <= 0) return
    this.setState({ 
      currentCardIndex: this.state.currentCardIndex - 1,
      flashcardFrontShowing: true 
    })
  }

  showNextCard = () => {
    if (this.state.currentCardIndex >= this.state.keysArray.length - 1) return
    this.setState({ 
      currentCardIndex: this.state.currentCardIndex + 1,
      flashcardFrontShowing: true
    })
  }

  moveCardToBucket = (cardFront, bucket) => {
    // console.log('moving '+cardFront+' to bucket '+bucket)
    // prevents undefined from being added to the bucket object
    if (cardFront === undefined) return
    // Copy the current deck of flashcards in use
    let tmpDeck = {...this.state.currentDeck}
    // remove the card from the copy
    delete tmpDeck[cardFront]
    // Copy the object of the current bucket being selected (easy, medium, difficult) 
    // and append the new card to being added to that bucket
    let tmpBucket = {...this.state[bucket], [cardFront]: this.state.currentDeck[cardFront]},
        adjustedCardIndex = 0
    // adjust the current card index number, defaults to 0 
    // if it's not already 0...
    if (this.state.currentCardIndex > 0) {
      // to one less than the previous current card index as a card was removed and put in a bucket 
      adjustedCardIndex = this.state.currentCardIndex - 1
    }
    // Set the state changes 
    // add the card to the easy/medium/difficult bucket
    // replace the current deck with the copy where the card was removed
    // update the keys array so we aren't attempting to select a card from the currentDeck that was removed
    // set the front of the card as showing before rendering the next card in the currentDeck
    this.setState({
      [bucket]: tmpBucket,
      currentDeck: tmpDeck,
      keysArray: Object.keys(tmpDeck),
      flashcardFrontShowing: true,
      currentCardIndex: adjustedCardIndex
    })
  }

  onKeyDown = e => {
    console.log(e.keyCode + ' pressed');
  }

  componentWillMount = () => {
      document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount = () => {
      document.removeEventListener("keydown", this.onKeyDown);
  }

  async componentDidMount() {
    this.setState({ isLoading: true })

    try {
      const result = await axios.get('./FlashcardSets.json')
      this.setState({
        decks: result.data.flashcards,
        // default deck is Spanish
        currentDeckName: 'spanish',
        currentDeck: result.data.flashcards['spanish'],
        keysArray: Object.keys(result.data.flashcards['spanish']),
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
    if (!Object.keys(this.state.decks).length > 0) return null
    // variables for readability
    let easyCount = Object.keys(this.state.easyBucket).length,
        mediumCount = Object.keys(this.state.mediumBucket).length,
        difficultCount = Object.keys(this.state.difficultBucket).length
    // all of the cards sorted plus one is the current card being worked on
    let currentCardNumber = easyCount + mediumCount + difficultCount
    // all of the cards sorted plus all of the cards unsorted are the total
    let totalCardNumber = currentCardNumber + this.state.keysArray.length

    return (
      <div className="main">
        <Scoreboard 
          currentDeckName={this.state.currentDeckName} 
          easyCount={easyCount}
          mediumCount={mediumCount}
          difficultCount={difficultCount}
          currentCardNumber={currentCardNumber}
          totalCardNumber={totalCardNumber}
        /> 

        <div className="container">
          <div className="flashcards-container grid-div">
            <img 
              alt="Previous Card"
              className="controls controls-div controls-prev prev"
              style={ { transform: 'rotate(180deg)' } }
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACTSURBVGhD7dmxDYQwEERRJ3RAIVQIVEVCEfRDArOBM8sissbmP2miS7zSv4gEAL8za4d2VrZoXdi0p7JLmzR78ch4bOmIvDi2C5HPrZWOiMVvJNYaibkiMUck5ojEXJGYIxJzRGKOhjjkS1q7Zm/VSo/P6+LPTlJOSMoFSTkhKSck5YKknJCUkyGSGupjKAC0kNILaew3BgvattYAAAAASUVORK5CYII=" 
              onClick={this.showPreviousCard} 
              />
            { // if there are more cards to be reviewed
              this.state.keysArray.length > 0 ? 
              <Card 
                frontShowing={this.state.flashcardFrontShowing} 
                front={Object.keys(this.state.currentDeck)[this.state.currentCardIndex]}
                back={this.state.currentDeck[Object.keys(this.state.currentDeck)[this.state.currentCardIndex]]}
                flipCard={this.flipCard}
              /> 
            :
            // otherwise show a default card that indicates you have finished with this deck
              <Card 
                frontShowing={this.state.flashcardFrontShowing} 
                front='You have run out of cards to review. Great job! Please select another deck below.'
                back='Nothing to see here. Move along.'
                flipCard={this.flipCard}
              />
            }
            <img 
              alt="Next Card"
              className="controls controls-div controls-next next"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACTSURBVGhD7dmxDYQwEERRJ3RAIVQIVEVCEfRDArOBM8sissbmP2miS7zSv4gEAL8za4d2VrZoXdi0p7JLmzR78ch4bOmIvDi2C5HPrZWOiMVvJNYaibkiMUck5ojEXJGYIxJzRGKOhjjkS1q7Zm/VSo/P6+LPTlJOSMoFSTkhKSck5YKknJCUkyGSGupjKAC0kNILaew3BgvattYAAAAASUVORK5CYII=" 
              onClick={this.showNextCard} 
            />
          </div>
        </div>

        { 
          // The Survey only displays when the back of the card is showing
          !this.state.flashcardFrontShowing ? 
            // if the front is NOT showing and there are more cards in the current flashcard deck...
            this.state.keysArray.length > 0 ?
              // display the survey
              <Survey 
                moveCardToBucket={this.moveCardToBucket} 
                front={Object.keys(this.state.currentDeck)[this.state.currentCardIndex]}
              /> 
            : 
              '' 
          :
            ''
        }

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

        <footer>
          &copy; 2018
        </footer>
      </div> //end of main
    )
  }
}

export default Flashcards
