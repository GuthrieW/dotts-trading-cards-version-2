import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import TradeDisplay from '../../components/displays/trade-display'
import DropdownWithCheckboxGroup from '../../components/dropdowns/multi-select-dropdown'
import SearchBar from '../../components/inputs/search-bar'
import useGetUserTrades from '../api/v2/_queries/use-get-current-user-trades'

const TradeStatuses = ['completed', 'pending', 'declined']

const Trades = () => {
  const [selectedTradeStatuses, setSelectedTradeStatuses] = useState<string[]>(
    []
  )
  const [searchString, setSearchString] = useState<string>('')

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

  const handleUpdateSearchString = (event) =>
    setSearchString(event.target.value || '')

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
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-row justify-start items-center">
          <DropdownWithCheckboxGroup
            title="Trade Status"
            checkboxes={tradeStatusCheckboxes}
            selectedCheckboxIds={selectedTradeStatuses}
          />
        </div>
        <div className="flex flex-row justify-end items-center">
          <SearchBar onChange={handleUpdateSearchString} />
        </div>
      </div>

      <div>
        {selectedTrades.map((trade, index) => (
          <TradeDisplay key={index} trade={trade} />
        ))}
      </div>
    </div>
  )
}

export default Trades
