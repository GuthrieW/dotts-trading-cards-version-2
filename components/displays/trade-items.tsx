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
      <div className="flex flex-wrap ml-2">
        {cards.map((card: Card) => (
          <img
            className="border border-gray-100 shadow-sm mb-1 relative h-40"
            src={card.imageUrl}
            alt="user image"
          />
        ))}
      </div>
    </div>
  )
}

export default TradeItems
