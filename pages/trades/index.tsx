import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import Button from '../../components/buttons/button'
import TradeDisplay from '../../components/displays/trade-display'
import DropdownWithCheckboxGroup from '../../components/dropdowns/multi-select-dropdown'
import SearchBar from '../../components/inputs/search-bar'
import Spinner from '../../components/spinners/spinner'
import useGetUserTrades from '../api/v2/_queries/use-get-current-user-trades'

const TradeStatuses = ['completed', 'pending', 'declined']

const Trades = () => {
  const [searchString, setSearchString] = useState<string>('')
  const [selectedTradeStatuses, setSelectedTradeStatuses] = useState<string[]>(
    []
  )

  const { trades, isFetching: userTradesIsFetching } = useGetUserTrades({})

  const selectedTrades: DottsTrade[] = useMemo(() => {
    const lowercaseSearchString = searchString.toLowerCase()

    const nameFilteredTrades = trades.filter(
      (trade: DottsTrade) =>
        trade.offeringUsername
          ?.toLowerCase()
          ?.includes(lowercaseSearchString) ||
        trade.receivingUsername?.toLowerCase()?.includes(lowercaseSearchString)
    )

    return nameFilteredTrades.filter(
      (trade: DottsTrade) =>
        selectedTradeStatuses.length === 0 ||
        selectedTradeStatuses.includes(trade.tradeStatus)
    )
  }, [trades, searchString, selectedTradeStatuses])

  if (userTradesIsFetching) {
    return <Spinner />
  }

  const updateSelectedTradeStatusButtonIds = (toggleId) =>
    selectedTradeStatuses.includes(toggleId)
      ? setSelectedTradeStatuses(
          selectedTradeStatuses.filter((status) => status != toggleId)
        )
      : setSelectedTradeStatuses(selectedTradeStatuses.concat(toggleId))

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
    <>
      <NextSeo title="Trades" />
      <h1>Trades</h1>
      <div>
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <SearchBar
              onChange={handleUpdateSearchString}
              disabled={userTradesIsFetching}
            />
            <DropdownWithCheckboxGroup
              title="Statues"
              checkboxes={tradeStatusCheckboxes}
              selectedCheckboxIds={selectedTradeStatuses}
            />
          </div>
          <div className="flex items-center">
            <Button onClick={null} isLoading={false}>
              <Link href="trades/new-trade">New Trade</Link>
            </Button>
          </div>
        </div>

        <div className="w-full">
          {selectedTrades.map((trade: DottsTrade, index: number) => (
            <TradeDisplay key={index} trade={trade} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Trades
