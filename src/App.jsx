import React, { useEffect, useState } from "react"

export default function App() {
  const [cards, setCards] = useState( {success: false} )
  const [shuffle, setShuffle] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  const [score, setScore] = useState(0)

  async function requestCards(cb) {
    const response = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=12")
    const json = await response.json()
    cb(json)
  }

  useEffect(() => {
    requestCards(setCards)
  }, [])

  function clickCard(index) {
    setShuffle(shuffle.sort(() => Math.random() - 0.5))
    if (!cards.cards[index].clicked) {
      setScore(score + 1)
      cards.cards[index].clicked = true
      if (score === 11) setScore('You won')
    } else {
      setScore(0)
      requestCards(setCards)
    }
  }

  return (
    <>
      <div className="score">
        <p>{score !== 'You won' ? `Score: ${score}` : 'You won!'}</p>
      </div>
      <div className="cards">
        {cards.success && shuffle.map(index => <div key={cards.cards[index].code}><img src={cards.cards[index].image} onClick={() => clickCard(index)}/></div>)}
      </div>
    </>
  )
}