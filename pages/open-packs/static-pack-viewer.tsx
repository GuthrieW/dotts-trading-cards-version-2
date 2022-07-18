import React, { useState } from 'react'
import useGetLastOpenedPack from '../api/v2/_queries/use-get-last-opened-pack'
import ReactCardFlip from 'react-card-flip'

const StaticPackViewer = () => {
  const [revealedCards, setRevealedCards] = useState<number[]>([])

  const { lastOpenedPack, isFetching, error } = useGetLastOpenedPack({})

  const updateRevealedCards = (index: number) => {
    if (revealedCards.includes(index)) return
    setRevealedCards([...revealedCards, index])
  }

  return (
    <div>
      {lastOpenedPack.map((card, index) => (
        <ReactCardFlip isFlipped={revealedCards.includes(index)}>
          <img
            width="320"
            height="440"
            key={index}
            draggable={false}
            className={`rounded-sm transition-all duration-200 cursor-pointer select-none `}
            src={card.image_url}
            onClick={() => updateRevealedCards(index)}
          />

          <img
            width="320"
            height="440"
            key={index}
            draggable={false}
            className={`rounded-sm transition-all duration-200 select-none `}
            src={card.image_url}
          />
        </ReactCardFlip>
      ))}
    </div>
  )
}

export default StaticPackViewer
