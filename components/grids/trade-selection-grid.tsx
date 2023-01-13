import { useCallback, useMemo, useRef, useState } from 'react'
import { useVirtual } from 'react-virtual'
import DropdownWithCheckboxGroup from '../dropdowns/multi-select-dropdown'
import SearchBar from '../inputs/search-bar'
import { RARITIES, Rarity, Team, TEAMS } from '../../utils/constants'
import useGetTradingParners from '../../pages/api/v2/_queries/use-get-trading-partners'
import { sortAndFilterCards } from '../../utils/filter-and-sort-cards'
import ShinyImage from '../images/shiny-image'
import Spinner from '../spinners/spinner'
import { toast } from 'react-toastify'
import Button from '../buttons/button'
import useInsertTrade from '../../pages/api/v2/_mutations/use-insert-trade'
import Router from 'next/router'

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
  const { insertTrade, isSuccess, isLoading, reset } = useInsertTrade()

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

  const handleAddSendingCard = (cardToAdd: CardWithCount) => {
    if (isLoading) {
      toast.warning("You're submitting a trade, stop clicking stuff")
      return
    }

    if (selectedSendingCards.length >= 6) {
      toast.warning('You cannot send more than 6 cards in a trade.')
      return
    }
    const instancesInArray: number = selectedSendingCards.filter(
      (card) => card._id === cardToAdd._id
    ).length

    if (instancesInArray >= cardToAdd.quantity) {
      toast.error(
        `You cannot add another ${cardToAdd.rarity} ${cardToAdd.playerName} to the trade.`
      )
      return
    }

    setSelectedSendingCards([...selectedSendingCards, cardToAdd])
  }

  const handleRemoveSendingCard = (cardToRemove: CardWithCount) => {
    if (isLoading) {
      toast.error("You're submitting a trade, stop clicking stuff")
      return
    }

    const cardIndex = selectedSendingCards.findIndex(
      (card) => card._id === cardToRemove._id
    )
    if (cardIndex === -1) return
    setSelectedSendingCards([
      ...selectedSendingCards.slice(0, cardIndex),
      ...selectedSendingCards.slice(cardIndex + 1),
    ])
  }

  const handleAddReceivingCard = (cardToAdd: CardWithCount) => {
    if (isLoading) {
      toast.error("You're submitting a trade, stop clicking stuff")
      return
    }

    if (selectedReceivingCards.length >= 6) {
      toast.warning('You cannot receive more than 6 cards in a trade.')
      return
    }
    const instancesInArray: number = selectedReceivingCards.filter(
      (card) => card._id === cardToAdd._id
    ).length

    if (instancesInArray >= cardToAdd.quantity) {
      toast.warning(
        `You cannot add another ${cardToAdd.rarity} ${cardToAdd.playerName} to the trade.`
      )
      return
    }

    setSelectedReceivingCards([...selectedReceivingCards, cardToAdd])
  }

  const handleRemoveReceivingCard = (cardToRemove) => {
    if (isLoading) {
      toast.error("You're submitting a trade, stop clicking stuff")
      return
    }

    const cardIndex = selectedReceivingCards.findIndex(
      (card) => card._id === cardToRemove._id
    )
    if (cardIndex === -1) return
    setSelectedReceivingCards([
      ...selectedReceivingCards.slice(0, cardIndex),
      ...selectedReceivingCards.slice(cardIndex + 1),
    ])
  }

  const handleSubmitTrade = () => {
    if (isLoading) {
      toast.error("You're submitting a trade, stop clicking stuff")
      return
    }

    if (
      selectedSendingCards.length <= 0 ||
      selectedReceivingCards.length <= 0
    ) {
      toast.warning('Both users must send at least one card')
      return
    }

    insertTrade({
      offeringUserId: sendingUserId,
      receivingUserId: receivingUserId,
      offeringUserCardIds: selectedSendingCards,
      receivingUserCardIds: selectedReceivingCards,
    })
  }

  const handleUpdateSearchString = (event): void =>
    setSearchString(event.target.value || '')

  const updateSelectedRarityButtonIds = (toggleId): void =>
    selectedRarities.includes(toggleId)
      ? setSelectedRarities(
          selectedRarities.filter((rarity) => rarity != toggleId)
        )
      : setSelectedRarities(selectedRarities.concat(toggleId))

  const updateSelectedTeamButtonIds = (toggleId): void =>
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

  if (isSuccess) {
    Router.push('/trades')
  }

  if (tradingPartnersIsFetching) {
    return <Spinner />
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-row">
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
        <div>
          <Button onClick={() => handleSubmitTrade()} isLoading={isLoading}>
            Submit Trade
          </Button>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/2 m-4">
          <p>{sendingUser.isflUsername} sends:</p>
          <div className="w-full relative grid gap-2 grid-cols-2 md:grid-cols-4 lg:gap-4">
            {selectedSendingCards.map((card: CardWithCount) => (
              <ShinyImage
                imageUrl={card.imageUrl}
                movementThreshold={80}
                onClick={() => handleRemoveSendingCard(card)}
              />
            ))}
          </div>
          <hr className="m-1" />
          <div className="flex flex-col items-center" ref={senderRef}>
            <div
              className="w-full relative p-4 m-4 grid gap-2 grid-cols-2 md:grid-cols-4 lg:gap-4"
              style={{ height: `${senderVirtualCards.totalSize}px` }}
            >
              {senderVirtualCards.virtualItems.map((item, index) => {
                const card = senderCards[item.index]
                return (
                  <div
                    className="relative transition ease-linear shadow-none hover:scale-105 hover:shadow-xl"
                    key={index}
                  >
                    <div className="w-full h-full cursor-pointer rounded-sm">
                      <ShinyImage
                        imageUrl={card.imageUrl}
                        movementThreshold={80}
                        onClick={() => handleAddSendingCard(card)}
                      />
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
        <div className="w-1/2 m-4">
          <p>{receivingUser.isflUsername} sends:</p>
          <div className="w-full relative grid gap-2 grid-cols-2 md:grid-cols-4 lg:gap-4">
            {selectedReceivingCards.map((card: CardWithCount) => (
              <ShinyImage
                imageUrl={card.imageUrl}
                movementThreshold={80}
                onClick={() => handleRemoveReceivingCard(card)}
              />
            ))}
          </div>
          <hr className="m-1" />
          <div className="flex flex-col items-center" ref={receiverRef}>
            <div
              className="w-full relative p-4 m-4 grid gap-2 grid-cols-2 md:grid-cols-4 lg:gap-4"
              style={{ height: `${receiverVirtualCards.totalSize}px` }}
            >
              {receiverVirtualCards.virtualItems.map((item, index) => {
                const card = receiverCards[item.index]
                return (
                  <div
                    className="relative transition ease-linear shadow-none hover:scale-105 hover:shadow-xl"
                    key={index}
                  >
                    <div className="w-full h-full cursor-pointer rounded-sm">
                      <ShinyImage
                        imageUrl={card.imageUrl}
                        movementThreshold={80}
                        onClick={() => handleAddReceivingCard(card)}
                      />
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
      </div>
    </div>
  )
}

export default TradeSelectionGrid
