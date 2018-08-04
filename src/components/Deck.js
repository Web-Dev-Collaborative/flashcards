import React from 'react'
import PropTypes from 'prop-types'

import '../styles/Deck.css'

const Deck = (props) => {

  // don't render until card deck is loaded
  if (!props.cards) return null

  return (
    <div className="deck">
      {
        Object.keys(props.cards).map(key => {
          return (
            <span className="deck-data">{key} : {props.cards[key]} <br /></span>
          )
        })
      }
    </div>
  )
}

Deck.propTypes = {
  cards: PropTypes.object.isRequired
}

export default Deck
