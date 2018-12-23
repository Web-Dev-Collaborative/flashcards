import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash'

import EditCard from './EditCard'

// Ref to the confirm-delete modal
const modal = React.createRef()

class EditDeck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: props.deck
    }
  }

  static propTypes = {
    deckName: PropTypes.string.isRequired,
    deck: PropTypes.object.isRequired,
    saveToLocalStorage: PropTypes.func.isRequired,
    deleteDeck: PropTypes.func.isRequired,
    updateDeck: PropTypes.func.isRequired
  }  

  // Confirm they want to delete the deck FOOOOOORREEEEVVEEEEERRRR
  deleteDeckCheck = (e) => {
    console.log('deleteDeckCheck clicked',this.props.deckName)
    // Popup asking if they want to confirm, if they click yes, call this.props.deleteDeck(thisDeck)
    console.dir(modal)
    modal.current.className = 'modal delete-check showing'
  }

  deleteCardCheck = (cardName) => {
    // TODO: Add modal to confirm Yes | No
    console.log('deleteCardCheck:',cardName)
    // filter and only return cards that do not match the provided cardName
    const tmpDeck = _.pickBy(this.props.deck, (cardValue, card) => {
      if (card !== cardName) {
        return card
      }
    })
    console.log('Deleted '+cardName+' from deck. Updating state.')
    // Update and save deck changes to application state
    this.props.updateDeck(this.props.deckName, tmpDeck)
    // this.props.saveToLocalStorage()
  }

  addCard = (e) => {
    console.log('addCard ',e)
    console.dir(e)
  }

  renderCards = () => {
    return (
      Object.keys(this.props.deck).map((card, index) => {
        return (
          <EditCard 
            key={index} 
            card={card} 
            deck={this.props.deck} 
            deckName={this.props.deckName} 
            deleteCard={this.deleteCardCheck}
          />
        )
      })
    )
  }

  render() {
    console.log('Rendering Edit')
    console.log('this.props')
    console.dir(this.props)
    console.log('this.state')
    console.dir(this.state)

    return (
      <div className="limited-width-container edit">
        <div className="header">
          <h1>
            <Link to={`/decks/${this.props.deckName}`}>{ this.props.deckName.charAt(0).toUpperCase()+this.props.deckName.slice(1) }</Link>
            <Link to={`/decks/${this.props.deckName}/edit`}> - Edit</Link>
          </h1>
        </div> 

        <div className="containing-div">
          { 
            this.renderCards()
          }

          <button onClick={this.addCard} className="button new-card-button">Add A New Card</button>
        </div>

        <div className="modal delete-check hidden" ref={modal} >
          <h3 className="sub-header">Are you sure you want to delete {this.props.deckName}?</h3>
          <button className="button delete" onClick={() => {
            modal.current.className = 'modal delete-check hidden'
            this.props.deleteDeck(this.props.deckName)
            // Deck deleted. Redirecting to decks route
            console.log('Delete deck complete. Redirecting to /decks')
            this.props.history.push(`/decks`)
          }
          }>Permanently Delete Deck</button>
          <button className="button cancel" onClick={() => {
            modal.current.className = 'modal delete-check hidden'
          }}>Cancel Deletion</button>
        </div>

        <div className="break edit-break"></div>

        <div className="grid grid-3 containing-div buttons-div">
          <Link className="button edit-Link cancel" to={`/decks/${this.props.deckName}`}>Cancel Changes</Link>
          <button className="button save" onClick={() => { 
            this.props.saveToLocalStorage()
            // Deck saved. Redirecting to decks/:deckId
            console.log('Deck saved. Redirecting to decks/:deckId')
            this.props.history.push(`/decks/${this.props.deckName}`)
          }
          }>Save Changes</button>
          <button className="button delete" onClick={this.deleteDeckCheck}>Delete Deck</button>
        </div>
      </div>
    )
  }
}

export default withRouter(EditDeck)