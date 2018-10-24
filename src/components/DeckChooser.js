import React from 'react'
import PropTypes from 'prop-types'

import Deck from './Deck'

import '../styles/DeckChooser.css'

const DeckChooser = props => {
  return (
    <div className="decks decks-container">
      <h3>Select other flashcard decks</h3>
      <div className="growing-grid-div">
      { 
        Object.keys(props.decks).map(deckName => {
        return <div key={deckName} className="grid-child">
                <button 
                  onClick={(e) => props.changeDeckTo(deckName)}
                > 
                {deckName}</button>

                <Deck 
                  cards={props.decks[deckName]}
                />
              </div>
        })
      }
      </div>
    </div>
  )
}

DeckChooser.propTypes = {
  changeDeckTo: PropTypes.func.isRequired,
  decks: PropTypes.object
}

export default DeckChooser