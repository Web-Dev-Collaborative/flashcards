import React from 'react'
import PropTypes from 'prop-types'

import Deck from './Deck'

import '../styles/DeckChooser.css'

const DeckChooser = props => {
  console.log('Rendering DeckChooser with props: ')
  console.dir(props)
  return (
    <div className="decks decks-container">
      <h3>Select other flashcard decks</h3>
      <div className="growing-grid-div">
      { 
        Object.keys(props.decks).map(deckName => {
        return <div key={deckName} className="grid-child">
                  <button onClick={(e) => props.changeDeckTo(deckName).bind(this)}>{deckName}</button>

                  <div className="deck-overlay" onClick={(e) => {
                    console.log(e.target)
                  }}>
                  
                  <Deck 
                    cards={props.decks[deckName]}
                  />
                </div>
              </div>
        })
      }
      </div>
    </div>
  )
}

DeckChooser.propTypes = {
  changeDeckTo: PropTypes.func.isRequired,
  decks: PropTypes.object.isRequired
}

export default DeckChooser