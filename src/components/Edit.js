import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const Edit = (props) => {
  console.log('Rendering Edit')
  console.dir(props)

  return (
    <div className="edit">
      <div className="header">
        <Link to={`/decks/${props.deckName}`}><h1>{ props.deckName.charAt(0).toUpperCase()+props.deckName.slice(1) } - Edit</h1></Link>
      </div>

      <div className="grid grid-2">
        {Object.keys(props.deck).map((card, index) => <div key={index}><span>{card}</span><span>{props.deck[card]}</span></div>)}
      </div>
      <button className="delete-button">Delete Deck</button>
    </div>
  )
}

Edit.propTypes = {
  deckName: PropTypes.string.isRequired,
  deck: PropTypes.object.isRequired
}

export default Edit