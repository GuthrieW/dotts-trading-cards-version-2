//TODO: Add onclick effect for viewing cards up close
//TODO: Add sorting based on rarity, it's currently random

import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  ALL_PRO,
  ANNIVERSARY_FIRST_TEAM,
  ANNIVERSARY_SECOND_TEAM,
  AUTOGRAPH_ROOKIE,
  AWARD,
  BACKUP,
  CAPTAIN,
  CHARITY,
  FANTASY_KINGS,
  HALL_OF_FAME,
  HOLOGRAPH_EXPANSION,
  LEAST_VALUABLE_PLAYER,
  LEGEND,
  RARITIES,
  Rarity,
  STAR,
  STARTER,
  Team,
  TEAMS,
  TEAM_LOGO,
  ULTIMUS_CHAMPION,
  UNIQUE,
} from '../../utils/constants'
import DropdownWithCheckboxGroup from '../dropdowns/multi-select-dropdown'
import SearchBar from '../inputs/search-bar'
import { useVirtual } from 'react-virtual'
import ShinyImage from '../images/shiny-image'

type CardWithCount = Card & {
  quantity: number
}

type CollectionGridProps = {
  gridCards: Card[]
}

const rarityToNumercialValue = (rarity) => {
  switch (rarity) {
    case BACKUP:
      return 0
    case STARTER:
      return 1
    case STAR:
      return 2
    case ALL_PRO:
      return 3
    case LEGEND:
      return 4
    case CAPTAIN:
      return 5
    case LEAST_VALUABLE_PLAYER:
      return 6
    case TEAM_LOGO:
      return 7
    case HOLOGRAPH_EXPANSION:
      return 8
    case AUTOGRAPH_ROOKIE:
      return 9
    case FANTASY_KINGS:
      return 10
    case AWARD:
      return 11
    case ULTIMUS_CHAMPION:
      return 12
    case UNIQUE:
      return 13
    case CHARITY:
      return 14
    case ANNIVERSARY_FIRST_TEAM:
      return 15
    case ANNIVERSARY_SECOND_TEAM:
      return 16
    case HALL_OF_FAME:
      return 17
    default:
      return 1000
  }
}

const combineDuplicates = (cards: Card[]): CardWithCount[] => {
  const combinedCards: CardWithCount[] = []
  cards.forEach((card: Card) => {
    const foundIndex: number = combinedCards.findIndex((indexedCard: Card) => {
      return card._id === indexedCard._id
    })

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
  // const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  // const [lightBoxIsOpen, setLightBoxIsOpen] = useState<boolean>(false)
  const parentRef = useRef()

  const processedCards: Card[] = useMemo(() => {
    gridCards = gridCards.filter(
      (card) => card.playerName && card.playerTeam && card.imageUrl && card._id
    )

    const lowerCaseSearchString = searchString.toLowerCase()

    const filteredCards: Card[] = gridCards
      .filter((card) => {
        const lowerCaseCardName = card.playerName.toLowerCase() ?? ''
        return (
          lowerCaseCardName.includes(lowerCaseSearchString) ||
          card.playerName.includes(searchString)
        )
      })
      .filter((card) => {
        return (
          selectedRarities.length === 0 ||
          selectedRarities.includes(card.rarity)
        )
      })
      .filter((card) => {
        return (
          selectedTeams.length === 0 || selectedTeams.includes(card.playerTeam)
        )
      })

    // const cardsWithDuplicatesCombined: CardWithCount[] =
    //   combineDuplicates(filteredCards)

    return filteredCards.sort((a, b) => {
      const aRanking = rarityToNumercialValue(a.rarity)
      const bRanking = rarityToNumercialValue(b.rarity)
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
            const card = processedCards[item.index]
            return (
              <div
                className="relative transition ease-linear shadow-none hover:scale-105 hover:shadow-xl"
                key={index}
              >
                <div className="w-full h-full cursor-pointer rounded-sm">
                  <ShinyImage imageUrl={card.imageUrl} movementThreshold={80} />
                </div>

                {/* {card.quantity > 1 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 sm:translate-x-1/2 -translate-y-1/2 bg-neutral-800 rounded-full">
                    {card.quantity}
                  </span>
                )} */}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CollectionGrid
