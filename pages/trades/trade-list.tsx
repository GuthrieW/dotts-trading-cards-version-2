import { formatDistance, subDays, parseISO } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import ButtonGroup from '../../comps/buttons/button-group'
import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'
import useGetUserTrades from '../api/v2/_queries/use-get-user-trades'

type TradeStatus = 'Completed' | 'Pending' | 'Declined'

type TradeListButton = {
  id: TradeStatus
  text: TradeStatus
  disabled: boolean
  onClick: Function
}

const TradeOffer = ({ isUserTrade, cards, userId, tradeDate }) => (
  <div className="flex">
    <div>{isUserTrade ? 'Your' : 'Their'} Offer: </div>
    {cards.map((card, index) => (
      <div key={`${userId}-${tradeDate}-${index}`}>
        {card.playerName} ({card.rarity})
      </div>
    ))}
  </div>
)

const TradeList = () => {
  const {
    currentUser,
    isFetching: getCurrentUserIsFetching,
    error: getCurrentUserError,
  } = useGetCurrentUser({})
  const {
    userTrades,
    isFetching: getUserTradesIsFetching,
    error: getUserTradesError,
  } = useGetUserTrades({})

  const [selectedButtonId, setSelectedButtonId] =
    useState<TradeStatus>('Pending')

  const tradeListButtons: TradeListButton[] = [
    {
      id: 'Completed',
      text: 'Completed',
      disabled: selectedButtonId === 'Completed',
      onClick: () => {
        setSelectedButtonId('Completed')
      },
    },
    {
      id: 'Pending',
      text: 'Pending',
      disabled: selectedButtonId === 'Pending',
      onClick: () => {
        setSelectedButtonId('Pending')
      },
    },
    {
      id: 'Declined',
      text: 'Declined',
      disabled: selectedButtonId === 'Declined',
      onClick: () => {
        setSelectedButtonId('Declined')
      },
    },
  ]

  if (getCurrentUserError) {
    toast.warning('Error getting user')
  }

  if (getUserTradesError) {
    toast.warning(`Error getting trades for ${currentUser._id}`)
  }

  return (
    <div>
      <div>
        <ButtonGroup
          buttons={tradeListButtons}
          selectedButtonId={selectedButtonId}
        />
      </div>
      {userTrades
        .filter((trade) => trade.tradeStatus === selectedButtonId)
        .sort(
          (a, b) =>
            new Date(b.tradeOfferDate).getTime() -
            new Date(a.tradeOfferDate).getTime()
        )
        .map((trade, index) => {
          const {
            _id,
            offeringUserId,
            receivingUserId,
            offeringUserInfo,
            receivingUserInfo,
            offeringUserCardIds,
            receivingUserCardIds,
            tradeStatus,
            tradeOfferDate,
          } = trade
          const isUserTrade = offeringUserId === currentUser.account._id
          const tradePartner = isUserTrade
            ? receivingUserInfo.length > 0 && receivingUserInfo[0].isflUsername
            : offeringUserInfo.length > 0 && offeringUserInfo[0].isflUsername

          return (
            <Link href={`trades/${_id}`} key={index}>
              <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center">
                  <div> {isUserTrade ? 'Outgoing' : 'Incoming'}</div>
                  <div>{tradeStatus}</div>
                </div>
                <div>
                  {tradePartner.isflUsername} -{' '}
                  {formatDistance(
                    subDays(parseISO(tradeOfferDate), 0),
                    new Date(),
                    {
                      addSuffix: true,
                    }
                  )}
                </div>
                <TradeOffer
                  isUserTrade={isUserTrade}
                  cards={offeringUserCardIds}
                  userId={offeringUserId}
                  tradeDate={tradeOfferDate}
                />
                <TradeOffer
                  isUserTrade={isUserTrade}
                  cards={receivingUserCardIds}
                  userId={receivingUserId}
                  tradeDate={tradeOfferDate}
                />
              </div>
            </Link>
          )
        })}
    </div>
  )
}

export default TradeList
