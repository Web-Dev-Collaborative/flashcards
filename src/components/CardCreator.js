import React from 'react'
import PropTypes from 'prop-types'

import '../styles/CardCreator.css'

class CardCreator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deckName: props.deckName,
      // Current card being added front and back text
      valueFront: props.valueFront || '',
      valueBack: props.valueBack || ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    addCard: PropTypes.func.isRequired,
    deckName: PropTypes.string.isRequired,
    valueBack: PropTypes.string,
    valueFront: PropTypes.string
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

    this.props.addCard(card)

    this.setState({ 
      // Clear the form contents (front/back) after submission
      valueFront: '',
      valueBack: ''
    })
    // Set the focus back to the card front input
    this.cardFrontInput.focus()
  }

  componentDidMount() {
    this.cardFrontInput.focus()
  }

  render() {
    return (
      <div className="card-creator-container">
        Creating Deck: {this.state.deckName}
        <h3>Card Creator</h3>
        <form onSubmit={this.handleSubmit} >
          <label>
            <input 
              name="front"
              type="text" 
              value={this.state.valueFront} 
              onChange={this.handleChange} 
              placeholder={this.state.valueFront || "Card Front"}
              ref={(input) => this.cardFrontInput = input }/>
          </label>
          <label>
            <input 
              name="back"
              type="text" 
              placeholder={this.state.valueBack || "Card Back"}
              value={this.state.valueBack} 
              onChange={this.handleChange} />
          </label>
          <input type="submit" value="Add Card" className="button add-card" />
        </form>
      </div>
    )
  }
}

export default CardCreator