import React from 'react'
import PropTypes from 'prop-types'

import '../styles/DeckEditor.css'

class DeckEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  static propTypes = {
    decks: PropTypes.object
  }

  render() {
    return (
      <div className="deck-editor-container">
        <h3>Deck Editor Coming Soon!</h3>
      </div>
    )
  }
}

export default DeckEditor