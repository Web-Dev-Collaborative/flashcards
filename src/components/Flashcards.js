import React, { Component } from 'react'
import axios from 'axios'

import DeckChooser from './DeckChooser'
import DeckCreator from './DeckCreator'
import DeckEditor from './DeckEditor'
import Quiz from './Quiz'
import Results from './Results'
import Review from './Review'

import '../styles/reset.css'
import '../styles/Flashcards.css'

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
      optionsShowing: false,
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

  displayComponent = ofComponent => {
    this.setState({
      deckChooserShowing: false,
      deckCreatorShowing: false,
      deckEditorShowing: false,
      flashcardFrontShowing: true,
      optionsShowing: false,
      quizShowing: false,
      resultsShowing: false,
      reviewShowing: false,
      [ofComponent]: true
    })
  }

  toggleOptionsMenu = () => {
    this.setState({
      optionsShowing: !this.state.optionsShowing
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
        <h1>Flashcards</h1>

        { !this.state.optionsShowing ?
        <img 
          alt="Open Options"
          className="open-options" 
          src="data:image/png;base64,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"
          onClick={this.toggleOptionsMenu}
        /> :
        ''
        }

        { this.state.optionsShowing ? 
          <div className="options-container"> 
            <h3>Options</h3>
            <div className="grid-parent options-buttons-container">
              <button onClick={() => this.displayComponent('reviewShowing')}>Review Cards</button>
              <button onClick={() => this.displayComponent('quizShowing')}>Quiz</button>
              <button onClick={() => this.displayComponent('resultsShowing')}>See Results</button>
              <button onClick={() => this.displayComponent('deckChooserShowing')}>Select a Deck of Flashcards</button>
              <button onClick={() => this.displayComponent('deckCreatorShowing')}>Create a New Deck of Flashcards</button>
              <button onClick={() => this.displayComponent('deckEditorShowing')}>Edit a Deck of Flashcards</button>
            </div>
            <img 
              alt="Close Options"
              className="close-options"
              onClick={this.toggleOptionsMenu}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHoSURBVGhD7Zm9LgVBAEaXSkSoVAoq0fEIPIMoiFDRegaFgmhEoVIhEbU3oNQoRfSi8K8ghO9sTLK5udmdO7szO8Wc5ERms3szJ7uzcu9kiUTCiT65Kq/kl/xt2Wd5KqekNUQcSvMhP/KxRV+lmcubnJNWrEguepHclSHZNhPyWDKvezksK+Fx4gIiYoIn5UIytzUOlMHJrAkepxjuRCcbkpCDfFTCiOREFleMLEnmd5KPSkghgUghsZFCqhiQe3I0H7kxL/knbIO3kH3J+dfSJYaIT/ktZzhQgbcQJk+ES4yJ4NpNDljgdY24xLhEgPfF3kuMawR4DwGbmDoRECQEymLqRkCwEOgW00QEBA2BYsydbCICgocAMbeSz8MdWZdWQoqPE3auGReChxQjdmXnmnElaEi3hV1cM3VigoWUvZ2aiAkSYvOKrRvjPcQmwlAnxmtILxEG1xhvIS4RBpcYbyF8s+NLUa8RBhNzI8c4UIHXR2v6/68rxNhEgPfFHooUEhspJDasQwYlJ77no/hYlszvKB9V8CQ5me2u2NiSzG07H1XA7qmp7udAJIxLNkeZm9WG6KT8kFxwKdnuWmjRRcmdMBHn0hqKHyQXxiQRVju6RdgMXZdsPJ61KG8ofriYlYlEwoks+wNGRIw6mFtGZgAAAABJRU5ErkJggg==" 
            />
          </div> :
          ''
        }

        { this.state.currentDeckName ? 
          <div 
            className="small">Deck: {this.state.currentDeckName.charAt(0).toUpperCase() + this.state.currentDeckName.slice(1)}
          </div> : '' 
        }

        { this.state.reviewShowing ? 
          <Review 
            currentCardIndex={this.state.currentCardIndex}
            currentDeck={this.state.currentDeck}
            displayComponent={this.displayComponent}
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
            displayComponent={this.displayComponent}
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

        { this.state.deckEditorShowing ? <DeckEditor decks={this.state.decks} /> : '' }

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
