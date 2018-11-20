import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class QuizWriteIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      currentCardIndex: 0,
      ...props
    }
  }

  static propTypes = {
    deckName: PropTypes.string.isRequired,
    deck: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
      remainingCards: Object.keys(this.props.deck)
    })
  }

  render() {
    if (this.state.isLoading) return ''
    console.log('Rendering QuizWriteIn')
    console.dir(this.state)

    return (
      <div>
        <div className="header">
          <Link to={`/decks/${this.props.deckName}`}><h1>{ this.props.deckName.charAt(0).toUpperCase()+this.props.deckName.slice(1) } - Quiz - Self Survey</h1></Link>
        </div>

        <div className="grid card-container">
          Coming soon...
          { Object.keys(this.state.deck).map((card, index) => {
            return (
              <div className="card-holder grid grid-2" key={index} >
                <div className="card-front">{card}</div>
                <input className="card-edit-input-back" placeholder={this.state.deck[card]} />
              </div>
              )
            })
          }
        </div>

      </div>
    )
  }
}

export default QuizWriteIn