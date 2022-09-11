import React from 'react'

export type TradeItemsProps = {
  userId: string
  cards: Card[]
  tradePartnerRole: 'offering' | 'receiving'
}

const TradeItems = ({ userId, cards, tradePartnerRole }) => {
  return (
    <div className="w-1/2 m-1">
      <p>
        {tradePartnerRole === 'offering' ? 'Offered' : 'Received'} By: {userId}
      </p>
      <div className="flex flex-wrap ml-2 bg-neutral-700">
        {cards.map((card: Card) => (
          <img
            className="rounded-sm m-1 relative h-40"
            src={card.imageUrl}
            alt={`${card.playerName} - ${card.playerTeam} - ${card.rarity}`}
          />
        ))}
      </div>
    </div>
  )
}

export default TradeItems
