import React from 'react'

const Deck = (props) => {
  return (
    <div className="deck">
      {
        // Object.keys(props.cards).map(key => {
        //   return `front: ${key}. back: ${props.cards[key]} \n`
        // })
      }
      {/* {props.cards.map(card => {
        return card
      })} */}
    </div>
  )
}

export default Deck
