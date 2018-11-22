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

      <div className="containing-div">
        { Object.keys(props.deck).map((card, index) => {
          return (
            <div className="grid grid-2 card-holder" key={index} >
              <input className="card-edit-input-front" defaultValue={card} />
              <input className="card-edit-input-back" defaultValue={props.deck[card]} />
            </div>
            )
          })
        }
      </div>
      <div className="containing-div">
        <button className="edit-button cancel">Cancel Changes</button>
        <button className="edit-button save">Save Deck</button>
        <button className="edit-button delete">Delete Deck</button>
      </div>
    </div>
  )
}

Edit.propTypes = {
  deckName: PropTypes.string.isRequired,
  deck: PropTypes.object.isRequired
}

export default Edit