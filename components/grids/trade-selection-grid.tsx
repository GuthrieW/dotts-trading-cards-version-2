import { useCallback, useMemo, useRef, useState } from 'react'
import { useVirtual } from 'react-virtual'
import DropdownWithCheckboxGroup from '../dropdowns/multi-select-dropdown'
import SearchBar from '../inputs/search-bar'
import { RARITIES, Rarity, Team, TEAMS } from '../../utils/constants'
import useGetTradingParners from '../../pages/api/v2/_queries/use-get-trading-partners'
import { sortAndFilterCards } from '../../utils/filter-and-sort-cards'
import ShinyImage from '../images/shiny-image'
import Spinner from '../spinners/spinner'

type CardWithCount = Card & {
  quantity: number
}
type TradeSelectionGridProps = {
  sendingUserId: string
  receivingUserId: string
}

const TradeSelectionGrid = ({
  sendingUserId,
  receivingUserId,
}: TradeSelectionGridProps) => {
  const [searchString, setSearchString] = useState<string>('')
  const [selectedRarities, setSelectedRarities] = useState<string[]>([])
  const [selectedTeams, setSelectedTeams] = useState<string[]>([])
  const [selectedSendingCards, setSelectedSendingCards] = useState<
    CardWithCount[]
  >([])
  const [selectedReceivingCards, setSelectedReceivingCards] = useState<
    CardWithCount[]
  >([])

  const {
    sendingUser,
    sendingUserCards,
    receivingUser,
    receivingUserCards,
    isFetching: tradingPartnersIsFetching,
    error: tradingPartnersIsError,
  } = useGetTradingParners({ sendingUserId, receivingUserId })

  const senderRef = useRef()
  const senderCards: CardWithCount[] = useMemo(
    () =>
      sortAndFilterCards(
        sendingUserCards,
        searchString,
        selectedRarities,
        selectedTeams
      ),
    [sendingUserCards, searchString, selectedRarities, selectedTeams]
  )
  const senderVirtualCards = useVirtual({
    size: senderCards.length,
    overscan: 10,
    parentRef: senderRef,
    estimateSize: useCallback(() => 35, []),
  })

  const receiverRef = useRef()
  const receiverCards: CardWithCount[] = useMemo(
    () =>
      sortAndFilterCards(
        receivingUserCards,
        searchString,
        selectedRarities,
        selectedTeams
      ),
    [receivingUserCards, searchString, selectedRarities, selectedTeams]
  )
  const receiverVirtualCards = useVirtual({
    size: receiverCards.length,
    overscan: 10,
    parentRef: receiverRef,
    estimateSize: useCallback(() => 35, []),
  })

  const handleUpdateSendingCards = (cardToUpdate: CardWithCount) => {
    if (selectedSendingCards.some((card) => card._id === cardToUpdate._id)) {
      const newCards = selectedSendingCards.filter(
        (card) => card._id === cardToUpdate._id
      )
      setSelectedSendingCards(newCards)
    } else {
      const newCards = selectedSendingCards
      newCards.push(cardToUpdate)
      setSelectedSendingCards(newCards)
    }
  }

  const handleUpdateReceivingCards = (cardToUpdate: CardWithCount) => {
    if (selectedReceivingCards.some((card) => card._id === cardToUpdate._id)) {
      const newCards = selectedReceivingCards.filter(
        (card) => card._id === cardToUpdate._id
      )
      setSelectedReceivingCards(newCards)
    } else {
      const newCards = selectedReceivingCards
      newCards.push(cardToUpdate)
      setSelectedReceivingCards(newCards)
    }
  }

  const handleUpdateSearchString = (event) =>
    setSearchString(event.target.value || '')

  const updateSelectedRarityButtonIds = (toggleId) =>
    selectedRarities.includes(toggleId)
      ? setSelectedRarities(
          selectedRarities.filter((rarity) => rarity != toggleId)
        )
      : setSelectedRarities(selectedRarities.concat(toggleId))

  const updateSelectedTeamButtonIds = (toggleId) =>
    selectedTeams.includes(toggleId)
      ? setSelectedTeams(selectedTeams.filter((team) => team != toggleId))
      : setSelectedTeams(selectedTeams.concat(toggleId))

  const PlayerCardRarityCheckboxes: CollectionTableButtons[] = RARITIES.map(
    (rarity: Rarity) => {
      return {
        id: rarity.value,
        text: rarity.value,
        onClick: () => updateSelectedRarityButtonIds(rarity.value),
      }
    }
  )

  const TeamCheckboxes: CollectionTableButtons[] = TEAMS.map((team: Team) => {
    return {
      id: team.CITY_NAME + ' ' + team.TEAM_NAME,
      text: team.ABBREVIATION,
      onClick: () =>
        updateSelectedTeamButtonIds(team.CITY_NAME + ' ' + team.TEAM_NAME),
    }
  })

  if (tradingPartnersIsFetching) {
    return <Spinner />
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex flex-row justify-start items-center">
        <SearchBar onChange={handleUpdateSearchString} />
        <DropdownWithCheckboxGroup
          title="Rarity"
          checkboxes={PlayerCardRarityCheckboxes}
          selectedCheckboxIds={selectedRarities}
        />
        <DropdownWithCheckboxGroup
          title="Team"
          checkboxes={TeamCheckboxes}
          selectedCheckboxIds={selectedTeams}
        />
      </div>
      <div className="w-full flex flex-row justify-start items-start">
        <div
          className="w-full lg:w-3/4 mx-auto relative m-4 grid grid-cols-3 md:grid-cols-6 gap-4 lg:gap-8"
          style={{ height: `${senderVirtualCards.totalSize}px` }}
        >
          {selectedSendingCards.map((card) => (
            <p>
              {card.playerName} - {card.rarity}
            </p>
          ))}
          {senderVirtualCards.virtualItems.map((item, index) => {
            const card = senderCards[item.index]
            return (
              <div
                className="relative transition ease-linear shadow-none hover:scale-105 hover:shadow-xl"
                key={index}
                onClick={() => handleUpdateSendingCards(card)}
              >
                <div className="w-full h-full cursor-pointer rounded-sm">
                  <ShinyImage imageUrl={card.imageUrl} movementThreshold={80} />
                </div>

                {card.quantity > 1 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 sm:translate-x-1/2 -translate-y-1/2 bg-neutral-800 rounded-full">
                    {card.quantity}
                  </span>
                )}
              </div>
            )
          })}
        </div>
        <div
          className="w-full lg:w-3/4 mx-auto relative m-4 grid grid-cols-3 md:grid-cols-6 gap-4 lg:gap-8"
          style={{ height: `${receiverVirtualCards.totalSize}px` }}
        >
          {selectedReceivingCards.map((card) => (
            <p>
              {card.playerName} - {card.rarity}
            </p>
          ))}
          {receiverVirtualCards.virtualItems.map((item, index) => {
            const card = receiverCards[item.index]
            return (
              <div
                className="relative transition ease-linear shadow-none hover:scale-105 hover:shadow-xl"
                key={index}
                onClick={() => handleUpdateReceivingCards(card)}
              >
                <div className="w-full h-full cursor-pointer rounded-sm">
                  <ShinyImage imageUrl={card.imageUrl} movementThreshold={80} />
                </div>

                {card.quantity > 1 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 sm:translate-x-1/2 -translate-y-1/2 bg-neutral-800 rounded-full">
                    {card.quantity}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TradeSelectionGrid
