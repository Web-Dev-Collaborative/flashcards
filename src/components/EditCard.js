import React from 'react'
import PropTypes from 'prop-types'

// TODOS
// Save cards by unique id number instead of name, so that...
// Validate against duplicate entries:
// Ask the user if they meant to create a new card with the same name

class EditCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardFront: props.card,
      cardBack: props.deck[props.card] || 'New Card Back',
      editing: false,
      workingDeck: {},
      ...props
    }
  }

  static propTypes = {
    card: PropTypes.string.isRequired,
    deck: PropTypes.object.isRequired,
    deckName: PropTypes.string.isRequired,
    deleteCard: PropTypes.func.isRequired
  }

  onFrontChange = (event) => {
    console.log('onFrontChange ',event.target.value)
    this.setState({ cardFront: event.target.value })
  }

  onBackChange = (event) => {
    console.log('onBackChange ',event.target.value)
    this.setState({ cardBack: event.target.value })
  }

  toggleEditing = () => {
    // if the card is being edited currently...
    if (this.state.editing) {
      // validate front and back are not blank
      if (this.state.cardFront.trim() === '' || this.state.cardFront.trim() === null || this.state.cardFront.trim() === undefined) {
        // TODO fix these janky alerts to be nice modal/toast popups instead
        alert('Blank front. Did you mean to delete this card? Hint: use the delete button.')
        return
      }
      if (this.state.cardBack.trim() === '' || this.state.cardBack.trim() === null || this.state.cardBack.trim() === undefined) {
        alert('Blank back. Did you mean to delete this card?')
        return
      }
    }
    this.setState({ editing: !this.state.editing })
  }

  render() {
    return (
      <div>
        { !this.state.editing 
        ? <div className="grid card-holder edit-card-container">
            <h3 className="card-edit-front">{this.state.cardFront}</h3>
            <span className="card-edit-back">{this.state.cardBack}</span>
            <button className="edit-button" onClick={this.toggleEditing}>Edit</button>
            <button className="delete-button" onClick={this.props.deleteCard}>Delete</button>
          </div>
        : <div className="grid card-holder edit-card-container">
            <textarea 
              type="text"
              name="card-front"
              className="card-edit-front" 
              value={this.state.cardFront}
              onChange={this.onFrontChange}
            />

            <textarea 
              type="text"
              name="card-back"
              className="card-edit-back"
              value={this.state.cardBack}
              onChange={this.onBackChange}
            />

            <button className="save-button" onClick={this.toggleEditing}>Save</button>
            <button className="delete-button" onClick={this.props.deleteCard}>Delete</button>
          </div>
        }
      </div>
    )
  }
}

export default EditCard