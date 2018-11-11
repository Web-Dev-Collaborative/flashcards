import React, { Component } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import DeckChooser from './DeckChooser'
import DeckCreator from './DeckCreator'
import DeckEditor from './DeckEditor'
import Quiz from './Quiz'
import Results from './Results'
import Review from './Review'

import '../styles/reset.css'
// import '../styles/Flashcards.css'

class Flashcards extends Component {
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
      reviewShowing: true,
      quizShowing: false,
      resultsShowing: false,
      deckChooserShowing: false,
      deckCreatorShowing: false,
      deckEditorShowing: false
    }
  }

  flipCard = () => {
    this.setState({ flashcardFrontShowing: !this.state.flashcardFrontShowing })
  }

  addDeck = deck => {
    // Validate deck has a name and cards and that the name is not a duplicate
    if (!deck.name) return
    if (!deck.cards) return
    // duplicate name 
    const currentDeckNames = Object.keys(this.state.decks)
    if (currentDeckNames.includes(deck.name)) {
      alert('You already have a deck by that name. Try another name.')
      return
    }
    const tmpDecks = {...this.state.decks, [deck.name]: deck.cards}
    // Update state adding the deck and making it the currently selected deck
    this.setState({ 
      decks: tmpDecks,
      currentDeck: deck.cards,
      currentDeckName: deck.name,
      currentCardIndex: 0,
      flashcardFrontShowing: true,
      keysArray: Object.keys(deck.cards),
      easyBucket: {},
      mediumBucket: {},
      difficultBucket: {},
      reviewShowing: true,
      deckCreatorShowing: false
    })
  }

  changeDeckTo = deckName => {
    if (!this.state.decks && !this.state.decks[deckName]) {
      // console.log('No deck of name '+deckName)
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
    // prevents undefined/blank cards from being added to the bucket object
    if (cardFront === undefined) return
    // Copy the current deck of flashcards in use
    let tmpDeck = {...this.state.currentDeck}
    // remove the card from the copy
    delete tmpDeck[cardFront]
    // Copy the object of the current bucket being selected (easy, medium, difficult) 
    // and append the new card to being added to that bucket
    let tmpBucket = {...this.state[bucket], [cardFront]: this.state.currentDeck[cardFront]},
        // adjust the current card index number, defaults to 0 
        adjustedCardIndex = 0
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
    // console.log(e.keyCode + ' pressed');
    if (e.keyCode === 27) this.toggleOptionsMenu()
  }

  componentWillMount = () => {
      document.addEventListener("keydown", this.onKeyDown);
  }

  componentDidUpdate = () => {
    // when the component updates, save to localStorage
    localStorage.setItem('usarneme_flashcards', JSON.stringify(this.state))
  }

  componentWillUnmount = () => {
      document.removeEventListener("keydown", this.onKeyDown);
  }

  async componentDidMount() {
    this.setState({ isLoading: true })

    // Restore flashcard set from localStorage if available
    const localStorageRef = localStorage.getItem('usarneme_flashcards')

    if(localStorageRef) {
      console.log('Local storage loaded.')
      // console.dir(JSON.parse(localStorageRef))

      const decks = JSON.parse(localStorageRef).decks
      const stats = JSON.parse(localStorageRef).stats
      const currentDeckName = JSON.parse(localStorageRef).currentDeckName

      this.setState({
        decks,
        stats,
        // default deck is Spanish if no other current deck name is set
        currentDeckName: currentDeckName || 'spanish',
        currentDeck: decks[currentDeckName] || decks['spanish'],
        keysArray: Object.keys(decks[currentDeckName]) || Object.keys(decks['spanish']),
        isLoading: false
      })
      return
    }

    console.log('localstorage unavailable. loading remote decks')
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

    // Results component variables - for readability
    let easyCount = Object.keys(this.state.easyBucket).length,
        mediumCount = Object.keys(this.state.mediumBucket).length,
        difficultCount = Object.keys(this.state.difficultBucket).length
    // all of the cards sorted plus one is the current card being worked on
    let currentCardNumber = easyCount + mediumCount + difficultCount
    // all of the cards sorted plus all of the cards unsorted are the total
    let totalCardNumber = currentCardNumber + this.state.keysArray.length

    return (
      <div className="main">

        { this.state.currentDeckName ? 
          <div 
            className="small">Deck: {this.state.currentDeckName.charAt(0).toUpperCase() + this.state.currentDeckName.slice(1)}
          </div> : '' 
        }

        { this.state.reviewShowing ? 
          <Review 
            currentCardIndex={this.state.currentCardIndex}
            currentDeck={this.state.currentDeck}
            flashcardFrontShowing={this.state.flashcardFrontShowing}
            flipCard={this.flipCard} 
            keysArray={this.state.keysArray}
            showNextCard={this.showNextCard}
            showPreviousCard={this.showPreviousCard}
          /> : ''    
        }

        { this.state.resultsShowing ?
          <Results 
            currentCardNumber={currentCardNumber}
            totalCardNumber={totalCardNumber}
            easyCount={easyCount}
            mediumCount={mediumCount}
            difficultCount={difficultCount}
          /> : '' }

        { this.state.quizShowing ? 
          <Quiz 
            currentCardIndex={this.state.currentCardIndex}
            currentDeck={this.state.currentDeck}
            flashcardFrontShowing={this.state.flashcardFrontShowing}
            flipCard={this.flipCard} 
            keysArray={this.state.keysArray}
            moveCardToBucket={this.moveCardToBucket}
            showNextCard={this.showNextCard}
            showPreviousCard={this.showPreviousCard}        
          /> : '' 
        }

        { this.state.deckChooserShowing ? <DeckChooser changeDeckTo={this.changeDeckTo} decks={this.state.decks} /> : '' }

        { this.state.deckCreatorShowing ? <DeckCreator addDeck={this.addDeck} currentDeckNames={ Object.keys(this.state.decks) }/> : '' }

        { this.state.deckEditorShowing ? 
          <DeckEditor 
            decks={this.state.decks} 
            currentDeckName={this.state.currentDeckName} 
            changeDeckTo={this.changeDeckTo}
          /> : '' 
        }

        <div className="footer">
          <footer>
            &copy; 2018
          </footer>
        </div>
      </div> //end of main
    )
  }
}

export default Flashcards
