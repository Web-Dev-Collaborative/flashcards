import React from 'react'
import PropTypes from 'prop-types'

class Quiz extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // TODO fix these props -> should this be an array.length?
      numberOfQuestions = props.numberOfQuestions || 0,
      // order can be ['in numerical order', 'random', 'least studied', 'hardest', 'easiest']
      inWhatOrder = props.inWhatOrder || 'in numerical order'
    }
  }

  render() {
    return (
      <div className="quiz">
        <div className="quiz-header">
          Choose Quiz Options
        </div>
        <div className="how-many">
          How many questions
          <button className="how-many-button" data-number="4" onClick={(e) => console.log(e.target)} >4</button>
          <button className="how-many-button" data-number="8" onClick={(e) => console.log(e.target)} >8</button>
          <button className="how-many-button" data-number="12" onClick={(e) => console.log(e.target)} >12</button>
          <button className="how-many-button" data-number="all" onClick={(e) => console.log(e.target)} >all</button>
        </div>
        <div className="quiz-order">
          <span>In what order?</span>
          <button className="quiz-order-button" data-order="in numerical order" onClick={(e) => console.log(e.target)} >in numerical order</button>
          <button className="quiz-order-button" data-order="random" onClick={(e) => console.log(e.target)} >random</button>
          <button className="quiz-order-button" data-order="least studied" onClick={(e) => console.log(e.target)} >least studied</button>
          <button className="quiz-order-button" data-order="hardest" onClick={(e) => console.log(e.target)} >hardest</button>
          <button className="quiz-order-button" data-order="easiest" onClick={(e) => console.log(e.target)} >easiest</button>
        </div>
        <button className="quiz-submit-button" onSubmit={(e) => console.log(e.target)} >save quiz settings</button>
      </div>
    )
  }
}

Quiz.propTypes = {
  numberOfQuestions: PropTypes.number,
  inWhatOrder: PropTypes.string
}

export default Quiz