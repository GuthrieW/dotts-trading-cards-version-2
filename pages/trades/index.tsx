import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import TradeDisplay from '../../components/displays/trade-display'
import DropdownWithCheckboxGroup from '../../components/dropdowns/multi-select-dropdown'
import useGetUserTrades from '../api/v2/_queries/use-get-current-user-trades'

const TradeStatuses = ['completed', 'pending', 'declined']

const Trades = () => {
  const [selectedTradeStatuses, setSelectedTradeStatuses] = useState<string[]>(
    []
  )

  const updateSelectedTradeStatusButtonIds = (toggleId) =>
    selectedTradeStatuses.includes(toggleId)
      ? setSelectedTradeStatuses(
          selectedTradeStatuses.filter((status) => status != toggleId)
        )
      : setSelectedTradeStatuses(selectedTradeStatuses.concat(toggleId))

  const {
    trades,
    isFetching: userTradesIsFetching,
    error: userTradesError,
  } = useGetUserTrades({})

  const selectedTrades: DottsTrade[] = useMemo(() => {
    return trades.filter(
      (trade: DottsTrade) =>
        selectedTradeStatuses.length === 0 ||
        selectedTradeStatuses.includes(trade.tradeStatus)
    )
  }, [trades, selectedTradeStatuses])

  if (userTradesIsFetching) {
    return null
  }

  if (userTradesError) {
    toast.warning(userTradesError)
  }

  const tradeStatusCheckboxes: CollectionTableButtons[] = TradeStatuses.map(
    (status: string) => {
      return {
        id: status,
        text: status.toUpperCase(),
        onClick: () => updateSelectedTradeStatusButtonIds(status),
      }
    }
  )

  return (
    <>
      <div className="flex">
        <DropdownWithCheckboxGroup
          title="Trade Status"
          checkboxes={tradeStatusCheckboxes}
          selectedCheckboxIds={selectedTradeStatuses}
        />
      </div>
      {selectedTrades.map((trade, index) => (
        <TradeDisplay key={index} trade={trade} />
      ))}
    </>
  )
}

export default Trades
