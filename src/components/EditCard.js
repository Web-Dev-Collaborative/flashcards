import React from 'react'
import PropTypes from 'prop-types'

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
    this.frontInput = React.createRef()
    this.backInput = React.createRef()
    this.onFrontChange = this.onFrontChange.bind(this)
    this.onBackChange = this.onBackChange.bind(this)
    this.toggleEditing = this.toggleEditing.bind(this)
  }

  static propTypes = {
    card: PropTypes.string.isRequired,
    deck: PropTypes.object.isRequired,
    deckName: PropTypes.string.isRequired,
    deleteCard: PropTypes.func.isRequired
  }

  onFrontChange(e) {
    console.log('onFrontChange ',this.frontInput.current.value)
    this.setState({ cardFront: this.frontInput.current.value })
  }

  onBackChange(e) {
    console.log('onBackChange ',this.backInput.current.value)
    this.setState({ cardBack: this.backInput.current.value })
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing })
  }

  render() {
    return (
      <div>
        { !this.state.editing 
        ? <div className="grid card-holder edit-card-container">
            <h3>{this.state.cardFront}</h3>
            <div className="grid grid-2">
              <button className="edit-button" onClick={this.toggleEditing}>Edit</button>
              <button className="delete-button" onClick={this.props.deleteCard}>Delete</button>
            </div>
          </div>
        : <div className="grid card-holder edit-card-container">
            <input 
              type="text"
              name="card-front"
              ref={this.frontInput}
              className="card-edit-input-front" 
              defaultValue={this.state.cardFront}
              onChange={this.onFrontChange}
            />

            <input 
              type="text"
              name="card-back"
              ref={this.backInput}
              className="card-edit-input-back"
              defaultValue={this.state.cardBack}
              onChange={this.onBackChange}
            />

            <div className="grid grid-2">
              <button className="save-button" onClick={this.toggleEditing}>Save</button>
              <button className="delete-button" onClick={this.props.deleteCard}>Delete</button>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default EditCard