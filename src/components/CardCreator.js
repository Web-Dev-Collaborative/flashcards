import React from 'react'
import PropTypes from 'prop-types'

import '../styles/CardCreator.css'

class CardCreator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deckName: props.deckName,
      // Current card being added front and back text
      valueFront: '',
      valueBack: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    deckName: PropTypes.string.isRequired,
    addCard: PropTypes.func.isRequired
  }  

  handleChange(event) {
    console.log('target: '+event.target.name)

    event.target.name === 'front' ?
      this.setState({ valueFront: event.target.value }) :
      this.setState({ valueBack: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    const card = {
      front: event.target[0].value.trim(),
      back: event.target[1].value.trim()
    }

    if (!card.front || !card.back) {
      alert("Card front or back missing") 
      return
    }

    console.log('Submitted front: '+card.front+' and back: '+card.back)

    // TODO add logic to check for duplicate keys = try..catch
    this.props.addCard(card)
    this.setState({ 
      // Clear the form contents (front/back) after submission
      valueFront: '',
      valueBack: ''
    })
  }

  render() {
    return (
      <div className="card-creator-container">
        Creating Deck: {this.state.deckName}
        <h3>Card Creator</h3>
        <form onSubmit={this.handleSubmit} >
          <label>
            Card Front:
            <input 
              name="front"
              type="text" 
              value={this.state.valueFront} 
              onChange={this.handleChange} />
          </label>
          <label>
            Card Back:
            <input 
              name="back"
              type="text" 
              value={this.state.valueBack} 
              onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default CardCreator