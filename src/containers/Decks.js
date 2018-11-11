import React from 'react'
import PropTypes from 'prop-types'

import DeckChooser from '../components/DeckChooser'

const Decks = props => {
  console.log('Rendering decks')
  console.dir(props)
  return (
    <div>
      <DeckChooser changeDeckTo={props.changeDeckTo} decks={props.decks} />
    </div>
  )
}

Decks.propTypes = {
  changeDeckTo: PropTypes.func.isRequired,
  decks: PropTypes.object.isRequired
}

export default Decks