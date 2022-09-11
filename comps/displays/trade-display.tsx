import { formatDistance } from 'date-fns'
import Link from 'next/link'
import TextIcon from './text-icon'
import TradeItems from './trade-items'

export type TradeDisplayProps = {
  trade: DottsTrade
}

const TradeDisplay = ({ trade }: TradeDisplayProps) => {
  const {
    _id,
    offeringUserId,
    receivingUserId,
    offeringUserCardIds: offeringUserCards,
    receivingUserCardIds: receivingUserCards,
    tradeStatus,
    tradeOfferDate,
    tradeResolvedDate,
  } = trade
  const tradeResolved =
    tradeStatus === 'completed' || tradeStatus === 'declined'

  return (
    <Link className="mb-2" href={tradeResolved ? '#' : `/trades/${_id}`}>
      <div className="flex justify-between items-start m-2">
        <div className="flex flex-col justify-start items-start">
          <div>Offer Date: {tradeOfferDate}</div>
          <div className="flex flex-row">
            <TradeItems
              userId={offeringUserId}
              cards={offeringUserCards}
              tradePartnerRole="offering"
              tradeStatus={tradeStatus}
            />
            <TradeItems
              userId={receivingUserId}
              cards={receivingUserCards}
              tradePartnerRole="receiving"
              tradeStatus={tradeStatus}
            />
          </div>
        </div>
        <div className="flex flex-col justify-end items-end">
          <TextIcon>{tradeStatus.toUpperCase()}</TextIcon>
          {tradeResolvedDate && (
            <p>{formatDistance(new Date(), tradeResolvedDate ?? new Date())}</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default TradeDisplay
