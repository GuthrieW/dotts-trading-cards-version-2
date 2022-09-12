import { formatDistance } from 'date-fns'
import Link from 'next/link'
import TextIcon from './text-icon'
import TradeItems from './trade-items'

type TradeDisplayProps = {
  trade: DottsTrade
  allowHref?: boolean
}

const TradeDisplay = ({ trade, allowHref = true }: TradeDisplayProps) => {
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
    <Link href={tradeResolved || !allowHref ? '#' : `/trades/${_id}`}>
      <div
        title={tradeResolved ? '' : 'Open trade'}
        className={`flex justify-between items-centers rounded-lg border border-neutral-800 shadow-md my-2 ${
          tradeResolved || !allowHref ? '' : 'cursor-pointer'
        }`}
      >
        <div className="flex flex-row w-3/4">
          <TradeItems
            userId={offeringUserId}
            cards={offeringUserCards}
            tradePartnerRole="offering"
          />
          <TradeItems
            userId={receivingUserId}
            cards={receivingUserCards}
            tradePartnerRole="receiving"
          />
        </div>
        <div className="flex justify-end items-start w-1/4 m-1">
          <TextIcon text={tradeStatus.toUpperCase()} />
          {tradeResolvedDate && (
            <p>{formatDistance(new Date(), tradeResolvedDate ?? new Date())}</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default TradeDisplay
