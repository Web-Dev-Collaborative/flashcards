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
      ...props
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
  deleteCheck = (e) => {
    console.log('deleteCheck clicked',this.state.deckName)
    // Popup asking if they want to confirm, if they click yes, call this.state.deleteDeck(thisDeck)
    console.dir(modal)
    modal.current.className = 'modal delete-check showing'
  }

  addCard = (e) => {
    console.log('addCard ',e)
    console.dir(e)
  }

  deleteCard = (cardName) => {
    console.log('deleteCard:',cardName)
    // filter and only return cards that do not match the provided cardName
    const tmpDeck = _.pickBy(this.state.deck, (cardValue, card) => {
      if (card !== cardName) {
        return card
      }
    })
    console.log('Deleted '+cardName+' from deck. Updating state.')
    // Update and save deck changes to application state
    this.props.updateDeck(this.state.deckName, tmpDeck)
    // this.props.saveToLocalStorage()
  }

  render() {
    console.log('Rendering Edit')
    console.dir(this.state)
  
    return (
      <div className="edit">
        <div className="header">
          <h1>
            <Link to={`/decks/${this.state.deckName}`}>{ this.state.deckName.charAt(0).toUpperCase()+this.state.deckName.slice(1) }</Link>
            <Link to={`/decks/${this.state.deckName}/edit`}> - Edit</Link>
          </h1>
        </div> 

        <div className="containing-div">
          { Object.keys(this.state.deck).map((card, index) => {
              return (
                <EditCard 
                  key={index} 
                  card={card} 
                  deck={this.state.deck} 
                  deckName={this.state.deckName} 
                  deleteCard={this.deleteCard} 
                />
              )
            })
          }

          <button onClick={this.addCard} className="button new-card-button">Add A New Card</button>
        </div>

        <div className="modal delete-check hidden" ref={modal} >
          <h3 className="sub-header">Are you sure you want to delete {this.state.deckName}?</h3>
          <button className="button delete" onClick={() => {
            modal.current.className = 'modal delete-check hidden'
            this.props.deleteDeck(this.state.deckName)
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
          <Link className="button edit-Link cancel" to={`/decks/${this.state.deckName}`}>Cancel Changes</Link>
          <button className="button save" onClick={() => { 
            this.props.saveToLocalStorage()
            // Deck saved. Redirecting to decks/:deckId
            console.log('Deck saved. Redirecting to decks/:deckId')
            this.props.history.push(`/decks/${this.state.deckName}`)
          }
          }>Save Changes</button>
          <button className="button delete" onClick={this.deleteCheck}>Delete Deck</button>
        </div>
      </div>
    )
  }
}

export default withRouter(EditDeck)