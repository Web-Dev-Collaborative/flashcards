import React from 'react'
import PropTypes from 'prop-types'

class EditCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardFront: props.card,
      cardBack: props.deck[props.card],
      editing: false,
      ...props
    }
    this.onFrontChange = this.onFrontChange.bind(this)
    this.onBackChange = this.onBackChange.bind(this)
    this.toggleEditing = this.toggleEditing.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
  }

  static propTypes = {
    card: PropTypes.string.isRequired,
    deck: PropTypes.object.isRequired
  }

  onFrontChange(e) {
    console.log('onFrontChange ',e)
    this.setState({ cardFront: e.target.value })
  }

  onBackChange(e) {
    console.log('onBackChange ',e)
    this.setState({ cardBack: e.target.value })
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing })
  }

  deleteCard(e) {
    console.log('onBackChange ',e)
    console.dir(this)
  }

  render() {
    return (
      <div>
        { !this.state.editing 
        ? <div className="grid card-holder edit-card-container">
            <h3>{this.state.card}</h3>
            <div className="grid grid-2">
              <button className="edit-button" onClick={this.toggleEditing}>Edit</button>
              <button className="delete-button" onClick={this.deleteCard}>Delete</button>
            </div>
          </div>
        : <div className="grid card-holder edit-card-container">
            <div 
                value={this.state.card}
                name="card-front"
                onChange={this.onFrontChange}
                className="card-edit-input-front" 
                contentEditable={true}
            >{this.state.card}</div>

            <div 
                type="text"
                value={this.state.deck[this.state.card]}
                name="card-front"
                onChange={this.onBackChange}
                className="card-edit-input-back"
            >{this.state.deck[this.state.card]}</div>

            <div className="grid grid-2">
              <button className="save-button" onClick={this.toggleEditing}>Save</button>
              <button className="delete-button" onClick={this.deleteCard}>Delete</button>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default EditCard