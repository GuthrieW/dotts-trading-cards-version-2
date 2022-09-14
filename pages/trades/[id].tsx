import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'
import Button from '../../components/buttons/button'
import TradeDisplay from '../../components/displays/trade-display'
import useGetTrade from '../api/v2/_queries/use-get-trade'
import useAcceptTrade from '../api/v2/_mutations/use-accept-trade'
import useDeclineTrade from '../api/v2/_mutations/use-decline-trade'
import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'

const Trade = () => {
  const router = useRouter()
  const tradeId = router.query.id as string

  const {
    trade,
    isFetching: tradeIsFetching,
    error: tradeError,
  } = useGetTrade({ id: tradeId })
  const {
    currentUser,
    isFetching: currentUserIsFetching,
    error: currentUserError,
  } = useGetCurrentUser({})

  const {
    acceptTrade,
    isSuccess: acceptTradeIsSuccess,
    isLoading: acceptTradeIsLoading,
    error: acceptTradeError,
  } = useAcceptTrade()
  const {
    declineTrade,
    isSuccess: declineTradeIsSuccess,
    isLoading: declineTradeIsLoading,
    error: declineTradeError,
  } = useDeclineTrade()

  if (tradeIsFetching || currentUserIsFetching) {
    return null
  }

  if (tradeError || currentUserError) {
    toast.warning('Error fetching trade data')
  }

  const tradeResolved =
    trade.tradeStatus === 'completed' || trade.tradeStatus === 'declined'
  const userIsTradeReceiver = trade.receivingUserId === currentUser._id

  return (
    <div className="w-full">
      <TradeDisplay allowHref={false} trade={trade} />
      {!tradeResolved && userIsTradeReceiver && (
        <div>
          <Button
            text="Accept"
            onClick={() => acceptTrade()}
            isLoading={false}
          ></Button>
          <Button
            text="Decline"
            onClick={() => declineTrade()}
            isLoading={false}
          ></Button>
        </div>
      )}
    </div>
  )
}

export default Trade
