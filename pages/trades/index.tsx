import React from 'react'
import { toast } from 'react-toastify'
import TradeDisplay from '../../comps/displays/trade-display'
import useGetUserTrades from '../api/v2/_queries/use-get-current-user-trades'

const Trades = () => {
  const {
    trades,
    isFetching: userTradesIsFetching,
    error: userTradesError,
  } = useGetUserTrades({})

  if (userTradesIsFetching) {
    return null
  }

  if (userTradesError) {
    toast.warning(userTradesError)
  }

  return (
    <div>
      {trades.map((trade, index) => (
        <TradeDisplay key={index} trade={trade} />
      ))}
    </div>
  )
}

export default Trades
