import { format } from 'date-fns'
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
    offeringUsername,
    receivingUsername,
    offeringUserCardIds: offeringUserCards,
    receivingUserCardIds: receivingUserCards,
    tradeStatus,
    tradeOfferDate,
  } = trade
  const tradeResolved =
    tradeStatus === 'completed' || tradeStatus === 'declined'

  return (
    <Link href={tradeResolved || !allowHref ? '' : `/trades/${_id}`}>
      <div
        title={tradeResolved ? '' : 'Open trade'}
        className={`w-full flex justify-between items-start rounded-lg border border-neutral-800 shadow-md my-2 ${
          tradeResolved || !allowHref ? '' : 'cursor-pointer'
        }`}
      >
        <div className="flex flex-row w-3/4">
          <TradeItems
            username={offeringUsername}
            cards={offeringUserCards}
            tradePartnerRole="offering"
          />
          <TradeItems
            username={receivingUsername}
            cards={receivingUserCards}
            tradePartnerRole="receiving"
          />
        </div>
        <div className="flex flex-col justify-center items-end w-1/4 m-1">
          <TextIcon text={tradeStatus.toUpperCase()} />
          <p>
            Trade Offered On{' '}
            {tradeOfferDate && format(new Date(tradeOfferDate), 'MM-dd-yyyy')}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default TradeDisplay
