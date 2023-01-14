import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useVirtual } from 'react-virtual'
import useGetApprovedCards from '../../pages/api/v2/_queries/use-get-approved-cards'
import useGetCardsOwnedByUser from '../../pages/api/v2/_queries/use-get-cards-owned-by-user'
import { RARITIES, Rarity, Team, TEAMS } from '../../utils/constants'
import { sortAndFilterCards } from '../../utils/filter-and-sort-cards'
import DropdownWithCheckboxGroup from '../dropdowns/multi-select-dropdown'
import GreyedImage from '../images/greyed-image'
import ShinyImage from '../images/shiny-image'
import SearchBar from '../inputs/search-bar'

type CardWithCount = Card & {
  quantity: number
}

type TrophyRoomGridProps = {
  userId: string
}

const TrophyRoomGrid = ({ userId }: TrophyRoomGridProps) => {
  const [searchString, setSearchString] = useState<string>('')
  const [selectedRarities, setSelectedRarities] = useState<string[]>([])
  const [selectedTeams, setSelectedTeams] = useState<string[]>([])

  const {
    cardsOwnedByUser,
    isflUsername,
    isFetching: cardsOwnedByUserIsFetching,
    error: cardsOwnedByUserError,
  } = useGetCardsOwnedByUser({ id: userId })
  const {
    approvedCards,
    isFetching: approvedCardsIsFetching,
    error: approvedCardsError,
  } = useGetApprovedCards({})

  const parentRef = useRef()

  const processedCards: CardWithCount[] = useMemo(
    () =>
      sortAndFilterCards(
        approvedCards,
        searchString,
        selectedRarities,
        selectedTeams
      ),
    [approvedCards, searchString, selectedRarities, selectedTeams]
  )

  const rowVirtualization = useVirtual({
    size: processedCards.length,
    overscan: 10,
    parentRef,
    estimateSize: useCallback(() => 35, []),
  })

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

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex justify-start items-center">
        <div className="flex items-center">
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
      </div>
      <div
        className="flex flex-col justify-center items-center"
        ref={parentRef}
      >
        <div
          className="w-full lg:w-3/4 mx-auto relative m-4 grid grid-cols-3 md:grid-cols-6 gap-4 lg:gap-8"
          style={{ height: `${rowVirtualization.totalSize}px` }}
        >
          {rowVirtualization.virtualItems.map((item, index) => {
            let card: Card = processedCards[item.index]
            const ownedCard: CardWithCount = cardsOwnedByUser.find(
              (ownedCard: CardWithCount) => {
                if (ownedCard._id === card._id) {
                  return {
                    ...card,
                    quantity: ownedCard.quantity,
                  }
                }

                return false
              }
            )

            return (
              <div
                className="relative transition ease-linear shadow-none hover:scale-105 hover:shadow-xl"
                key={index}
              >
                {ownedCard ? (
                  <>
                    <div className="w-full h-full cursor-pointer rounded-sm">
                      <ShinyImage
                        imageUrl={ownedCard.imageUrl}
                        movementThreshold={80}
                      />
                    </div>
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 sm:translate-x-1/2 -translate-y-1/2 bg-neutral-800 rounded-full">
                      {ownedCard.quantity}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-full h-full cursor-pointer rounded-sm">
                      <GreyedImage imageUrl={card.imageUrl} />
                    </div>
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 sm:translate-x-1/2 -translate-y-1/2 bg-neutral-800 rounded-full">
                      0
                    </span>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TrophyRoomGrid
