import React from 'react'
import PropTypes from 'prop-types'

import CardCreator from './CardCreator'

import '../styles/DeckCreator.css'

class DeckCreator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deckName: '',
      // Has the user named the new deck yet?
      deckNameSubmitted: false,
      cards: {},
      // When the deck is complete and the user is ready to submit it to add it to the other flashcard decks
      deckComplete: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addCard = this.addCard.bind(this)
  }

  static propTypes = {
    // createDeck: PropTypes.func,
    // updateNewDeckName: PropTypes.func
  }

  handleChange(event) {
    this.setState({ deckName: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({ deckNameSubmitted: true })
  }

  addCard(card) {
    console.log('addCard with card: ')
    console.dir(card)
    if (!card.front) return
    if (!card.back) return
    const front = card.front,
          back = card.back
    const tmpCards = {...this.state.cards, front: back}
    this.setState({ cards: tmpCards })
  }

  render() {
    return (
      <div className="deck-creator-container">
        <h3>Deck Creator</h3>
        { !this.state.deckNameSubmitted ? 
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form> 
          : <div></div>
        }

        { 
          this.state.deckNameSubmitted ? 
            <CardCreator 
              deckName={this.state.deckName} 
              addCard={this.addCard} /> 
          : <div></div>
        }
      </div>
    )
  }
}

export default DeckCreator