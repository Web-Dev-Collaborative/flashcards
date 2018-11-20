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
      <div className="sub-header">
        <h2>Cards...</h2>
      </div>
      { Object.keys(props.deck).map((card, index) => {
        return (
          <div className="card-holder grid grid-2" key={index} >
            <input className="card-edit-input-front" placeholder={card} />
            <input className="card-edit-input-back" placeholder={props.deck[card]} />
          </div>
          )
        })
      }
      <button className="edit-button cancel">Cancel Changes</button>
      <button className="edit-button save">Save Deck</button>
      <button className="edit-button delete">Delete Deck</button>
    </div>
  )
}

Edit.propTypes = {
  deckName: PropTypes.string.isRequired,
  deck: PropTypes.object.isRequired
}

export default Edit