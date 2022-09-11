import React from 'react'

export type TradeItemsProps = {
  userId: string
  cards: Card[]
  tradePartnerRole: 'offering' | 'receiving'
  tradeStatus: TradeStatus
}

const TradeItems = ({ userId, cards, tradePartnerRole, tradeStatus }) => {
  return (
    <div className="w-1/2 flex justify-start items-start">
      <p>
        {tradePartnerRole === 'offering' ? 'Offered' : 'Received'} By: {userId}
      </p>
      <div className="grid grid-cols-4">
        {cards.map((card: Card) => (
          <div className="relative w-24 h-24">
            <img
              className="border border-gray-100 shadow-sm m-1"
              src={card.imageUrl}
              alt="user image"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TradeItems
