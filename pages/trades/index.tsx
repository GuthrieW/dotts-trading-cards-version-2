import { NextSeo } from 'next-seo'
import React, { useMemo, useState } from 'react'
import TradeDisplay from '../../components/displays/trade-display'
import DropdownWithCheckboxGroup from '../../components/dropdowns/multi-select-dropdown'
import SingleSelectDropdown, {
  OptionProps,
} from '../../components/dropdowns/single-select-dropdown'
import SearchBar from '../../components/inputs/search-bar'
import Spinner from '../../components/spinners/spinner'
import useGetUserTrades from '../api/v2/_queries/use-get-current-user-trades'
import useGetAllUsers from '../api/v2/_queries/use-get-all-users'
import Router from 'next/router'
import orderBy from 'lodash/orderBy'
import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'

const TradeStatuses = ['completed', 'pending', 'declined']

const Trades = () => {
  const [searchString, setSearchString] = useState<string>('')
  const [selectedTradeStatuses, setSelectedTradeStatuses] = useState<string[]>(
    []
  )

  const { currentUser, isFetching: currentUserIsFetching } = useGetCurrentUser(
    {}
  )
  const { trades, isFetching: userTradesIsFetching } = useGetUserTrades({})
  const { allUsers, isFetching: allUsersIsFetching } = useGetAllUsers({})

  const selectedTrades: DottsTrade[] = useMemo(() => {
    const lowercaseSearchString = searchString.toLowerCase()

    const nameFilteredTrades = trades.filter(
      (trade: DottsTrade) =>
        trade.offeringUsername
          ?.toLowerCase()
          ?.includes(lowercaseSearchString) ||
        trade.receivingUsername?.toLowerCase()?.includes(lowercaseSearchString)
    )

    const statusFilteredTrades = nameFilteredTrades.filter(
      (trade: DottsTrade) =>
        selectedTradeStatuses.length === 0 ||
        selectedTradeStatuses.includes(trade.tradeStatus)
    )

    return orderBy(statusFilteredTrades, ['tradeOfferDate'], ['desc'])
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

  const tradeOptions: OptionProps[] = orderBy(
    allUsers.map((user) => {
      return {
        id: user._id,
        text: user.isflUsername,
        onClick: () => {
          Router.push(`/trades/new-trade/${user._id}`)
        },
      }
    }),
    ['text'],
    ['asc']
  )
  const newTradeOptions = tradeOptions.filter(
    (option) => currentUser._id !== option.id
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
              placeholder="Trade Partner"
            />
            <DropdownWithCheckboxGroup
              title="Statues"
              checkboxes={tradeStatusCheckboxes}
              selectedCheckboxIds={selectedTradeStatuses}
            />
          </div>
          <div className="flex items-center">
            <SingleSelectDropdown
              title={'New Trade'}
              options={newTradeOptions}
            />
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
