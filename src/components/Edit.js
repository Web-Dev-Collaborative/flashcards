import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const Edit = (props) => {
  console.log('Rendering Edit')
  console.dir(props)

  const deleteCheck = () => {
    console.log('deleteCheck clicked',props)
  }
  
  return (
    <div className="edit">
      <div className="header">
        <h1>
          <Link to={`/decks/${props.deckName}`}>{ props.deckName.charAt(0).toUpperCase()+props.deckName.slice(1) }</Link>
          <Link to={`/decks/${props.deckName}/edit`}> - Edit</Link>
        </h1>
      </div>

      <div className="sub-header">
        <h2>Cards...</h2>
      </div>

      <div className="containing-div">
        { Object.keys(props.deck).map((card, index) => {
          return (
            <form className="grid grid-2 card-holder" key={index} >
              <input 
                type="text"
                placeholder={card}
                value={card}
                name="card-front"
                // onChange={this.handleChange}
                className="card-edit-input-front" 
              />
              <input 
                type="text"
                placeholder={props.deck[card]}
                value={props.deck[card]}
                name="card-front"
                // onChange={this.handleChange}
                className="card-edit-input-back"
              />
            </form>
            )
          })
        }
      </div>

      <div className="break"></div>

      <div className="grid grid-3 containing-div buttons-div">
        <Link className="button edit-Link cancel" to={`/decks/${props.deckName}`}>Cancel Changes</Link>
        <button className="edit-button save" onClick={props.save}>Save Changes</button>
        <button className="edit-button delete" onClick={deleteCheck}>Delete Deck</button>
      </div>
    </div>
  )
}

Edit.propTypes = {
  deckName: PropTypes.string.isRequired,
  deck: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired
}

export default Edit