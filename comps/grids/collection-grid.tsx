//TODO: Add onclick effect for viewing cards up close
//TODO: Add sorting based on rarity, it's currently random

import { randomInt } from 'crypto'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { RARITIES, Rarity, Team, TEAMS } from '../../utils/constants'
import DropdownWithCheckboxGroup from '../dropdowns/multi-select-dropdown'
import SearchBar from '../inputs/search-bar'
import { useVirtual } from 'react-virtual'

type Card = {
  _id: string
  approved: boolean
  currentRotation: boolean
  imageUrl: string
  playerName: string
  playerTeam: string
  rarity: string
  submissionDate: string
  submissionUsername: string
}

type CardWithCount = Card & {
  quantity: number
}

type CollectionGridProps = {
  gridCards: Card[]
}

const rarityToNumercialValue = () => {
  return randomInt(5)
}

const combineDuplicates = (cards: Card[]): CardWithCount[] => {
  const combinedCards: CardWithCount[] = []
  cards.forEach((card: Card) => {
    const foundIndex: number = combinedCards.findIndex((card: Card) => false)
    if (foundIndex !== -1) {
      combinedCards.at(foundIndex).quantity += 1
    } else {
      combinedCards.push({
        ...card,
        quantity: 1,
      })
    }
  })

  return combinedCards
}

const CollectionGrid = ({ gridCards }: CollectionGridProps) => {
  const [searchString, setSearchString] = useState<string>('')
  const [selectedRarities, setSelectedRarities] = useState<string[]>([])
  const [selectedTeams, setSelectedTeams] = useState<string[]>([])
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [lightBoxIsOpen, setLightBoxIsOpen] = useState<boolean>(false)
  const parentRef = useRef()

  const processedCards: CardWithCount[] = useMemo(() => {
    const lowerCaseSearchString = searchString.toLowerCase()

    const filteredCards: Card[] = gridCards
      .filter((card) => {
        const lowerCaseCardName = card?.playerName?.toLowerCase() ?? ''
        return (
          lowerCaseCardName.includes(lowerCaseSearchString) ||
          card?.playerName?.includes(searchString)
        )
      })
      .filter((card) => {
        return (
          selectedRarities.length === 0 ||
          selectedRarities.includes(card?.rarity)
        )
      })
      .filter((card) => {
        return (
          selectedTeams.length === 0 ||
          selectedTeams.includes(card?.playerTeam?.toString())
        )
      })

    const cardsWithDuplicatesCombined: CardWithCount[] =
      combineDuplicates(filteredCards)

    return cardsWithDuplicatesCombined.sort((a, b) => {
      const aRanking = rarityToNumercialValue()
      const bRanking = rarityToNumercialValue()
      return bRanking - aRanking
    })
  }, [gridCards, searchString, selectedRarities, selectedTeams])

  const rowVirtualization = useVirtual({
    size: processedCards.length,
    overscan: 10,
    parentRef,
    estimateSize: useCallback(() => 35, []),
  })

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
        id: rarity.label,
        text: rarity.label,
        onClick: () => updateSelectedRarityButtonIds(rarity.label),
      }
    }
  )

  const TeamCheckboxes: CollectionTableButtons[] = TEAMS.map((team: Team) => {
    return {
      id: team.ABBREVIATION,
      text: team.ABBREVIATION,
      onClick: () => updateSelectedTeamButtonIds(team.ABBREVIATION),
    }
  })

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full lg:w-3/4 flex justify-between items-center">
        <div className="flex">
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
        <div className="flex flex-row items-center">
          <SearchBar onChange={handleUpdateSearchString} />
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
            console.log('item', item)
            const card = processedCards[item.index]
            return (
              <div
                className="relative transition ease-linear shadow-none hover:scale-105 hover:shadow-xl"
                key={index}
                onClick={() => {
                  setSelectedCard(card)
                  setLightBoxIsOpen(true)
                }}
              >
                <img
                  className="w-full h-full cursor-pointer rounded-sm"
                  src={card?.imageUrl}
                  alt={card?.playerName}
                />
                {card?.quantity > 1 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 sm:translate-x-1/2 -translate-y-1/2 bg-neutral-800 rounded-full">
                    {card?.quantity}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
      {/* {lightBoxIsOpen && (
        // <CardLightBoxModal
        //   cardName={selectedCard.player_name}
        //   cardImage={selectedCard.image_url}
        //   setShowModal={() => setLightBoxIsOpen(false)}
        // />
      )} */}
    </div>
  )
}

export default CollectionGrid
