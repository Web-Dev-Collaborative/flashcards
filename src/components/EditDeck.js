import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import EditCard from './EditCard'

// Ref to the confirm-delete modal
const modal = React.createRef()

const EditDeck = (props) => {
  console.log('Rendering Edit')
  console.dir(props)

  // Confirm they want to delete the deck FOOOOOORREEEEVVEEEEERRRR
  const deleteCheck = (e) => {
    console.log('deleteCheck clicked',props.deckName)
    // Popup asking if they want to confirm, if they click yes, call props.deleteDeck(thisDeck)
    console.dir(modal)
    modal.current.className = 'modal delete-check showing'
  }

  const addCard = (e) => {
    console.log('addCard ',e)
    console.dir(e)
  }

  const deleteCard = (e) => {
    console.log('deleteCard ',e)
    console.dir(e)
  }


  return (
    <div className="edit">
      <div className="header">
        <h1>
          <Link to={`/decks/${props.deckName}`}>{ props.deckName.charAt(0).toUpperCase()+props.deckName.slice(1) }</Link>
          <Link to={`/decks/${props.deckName}/edit`}> - Edit</Link>
        </h1>
      </div> 

      <div className="containing-div">
        { Object.keys(props.deck).map((card, index) => {
            return (
              <EditCard 
                key={index} 
                card={card} 
                deck={props.deck} 
                deckName={props.deckName} 
                deleteCard={deleteCard} 
              />
            )
          })
        }

        <button onClick={addCard} className="new-card-button">Add A New Card</button>
      </div>

      <div className="modal delete-check hidden" ref={modal} >
        <h3 className="sub-header">Are you sure you want to delete {props.deckName}?</h3>
        <button className="delete" onClick={() => {
          modal.current.className = 'modal delete-check hidden'
          props.deleteDeck(props.deckName)
        }
        }>Permanently Delete Deck</button>
        <button className="cancel" onClick={() => {
          modal.current.className = 'modal delete-check hidden'
        }}>Cancel Deletion</button>
      </div>

      <div className="break edit-break"></div>

      <div className="grid grid-3 containing-div buttons-div">
        <Link className="button edit-Link cancel" to={`/decks/${props.deckName}`}>Cancel Changes</Link>
        <button className="save" onClick={props.saveDeckChanges}>Save Changes</button>
        <button className="delete" onClick={deleteCheck}>Delete Deck</button>
      </div>
    </div>
  )
}

EditDeck.propTypes = {
  deckName: PropTypes.string.isRequired,
  deck: PropTypes.object.isRequired,
  saveDeckChanges: PropTypes.func.isRequired,
  deleteDeck: PropTypes.func.isRequired
}

export default EditDeck