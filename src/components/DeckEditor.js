import React from 'react'
import PropTypes from 'prop-types'

import CardCreator from './CardCreator'

import '../styles/DeckEditor.css'

class DeckEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: props.decks,
      editing: false,
      currentDeck: {},
      currentDeckName: props.currentDeckName
    }
    this.changeDeckTo = props.changeDeckTo.bind(this)
  }

  static propTypes = {
    changeDeckTo: PropTypes.func.isRequired,
    currentDeckName: PropTypes.string,
    decks: PropTypes.object
  }

  editDeck = deckName => {
    this.setState({
      currentDeck: this.state.decks[deckName],
      currentDeckName: deckName,
      editing: true
    })
  }

  addCard = card => {
    if (!card.front) return
    if (!card.back) return

    if (Object.keys(this.state.currentDeck).includes(card.front)) {
      alert('You already have a card by that name. Try another name.')
      return
    }

    const tmpCards = {...this.state.currentDeck, [card.front]: card.back}
    this.setState({ currentDeck: tmpCards })
  }

  render() {
    return (
      <div className="deck-editor-container">
        <h3>Deck Editor</h3>

        { !this.state.editing ?
          <div>
            <span>Select a Deck to Edit</span>
            <div className="growing-grid-div">
            { this.state.decks ?
                Object.keys(this.state.decks).map(deckName => {
                return <div key={deckName} className="grid-child">
                          <button onClick={() => {
                            this.changeDeckTo(deckName)
                            this.editDeck(deckName)
                          }}>{deckName}</button>
                      </div>
                }) :
                <div><span>No decks to choose from</span></div>
            }
            </div>
          </div> :
          <div className="editor">
            <span>Editing {this.state.currentDeckName.charAt(0).toUpperCase() + this.state.currentDeckName.slice(1)}</span>
            { Object.keys(this.state.currentDeck).map(cardFront => 
                <CardCreator 
                  key={cardFront}
                  addCard={this.addCard} 
                  deckName={this.state.currentDeckName} 
                  valueFront={cardFront} 
                  valueBack={this.state.currentDeck[cardFront]} 
                />
              )
            }
            <button className="button" onClick={() => this.setState({ editing: false })}>Cancel Changes</button>
        </div>
        }
      </div>
    )
  }
}


export default DeckEditor