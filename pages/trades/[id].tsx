import Router, { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'
import Button from '../../components/buttons/button'
import TradeDisplay from '../../components/displays/trade-display'
import useGetTrade from '../api/v2/_queries/use-get-trade'
import useAcceptTrade from '../api/v2/_mutations/use-accept-trade'
import useDeclineTrade from '../api/v2/_mutations/use-decline-trade'
import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'
import Spinner from '../../components/spinners/spinner'

const Trade = () => {
  const router = useRouter()
  const tradeId = router.query.id as string

  const { trade, isFetching: tradeIsFetching } = useGetTrade({ id: tradeId })
  const { currentUser, isFetching: currentUserIsFetching } = useGetCurrentUser(
    {}
  )

  const {
    acceptTrade,
    isSuccess: acceptTradeIsSuccess,
    isLoading: acceptTradeIsLoading,
  } = useAcceptTrade()
  const {
    declineTrade,
    isSuccess: declineTradeIsSuccess,
    isLoading: declineTradeIsLoading,
  } = useDeclineTrade()

  if (tradeIsFetching || currentUserIsFetching) {
    return <Spinner />
  }

  if (acceptTradeIsSuccess || declineTradeIsSuccess) {
    Router.push('/trades')
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
            onClick={() => {
              if (acceptTradeIsLoading || declineTradeIsLoading) {
                toast.warning('Already accepting trade')
                return
              }
              acceptTrade()
            }}
            isLoading={false}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              if (acceptTradeIsLoading || declineTradeIsLoading) {
                toast.warning('Already declining trade')
                return
              }
              declineTrade()
            }}
            isLoading={false}
          >
            Decline
          </Button>
        </div>
      )}
    </div>
  )
}

export default Trade
