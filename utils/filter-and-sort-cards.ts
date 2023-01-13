import { rarityToNumercialValue } from './constants'

export const sortAndFilterCards = (
  cards: CardWithCount[],
  searchString: string,
  rarities: string[],
  teams: string[]
) => {
  const lowerCaseSearchString = searchString.toLowerCase()

  const filteredCards: CardWithCount[] = cards
    .filter(
      (card) => card.playerName && card.playerTeam && card.imageUrl && card._id
    )
    .filter((card: CardWithCount) => {
      const lowerCaseCardName = card.playerName.toLowerCase() ?? ''
      return (
        lowerCaseCardName.includes(lowerCaseSearchString) ||
        card.playerName.includes(searchString)
      )
    })
    .filter(
      (card: CardWithCount) =>
        rarities.length === 0 || rarities.includes(card.rarity)
    )
    .filter(
      (card: CardWithCount) =>
        teams.length === 0 || teams.includes(card.playerTeam)
    )
    .sort((a: CardWithCount, b: CardWithCount) => {
      const aRanking = rarityToNumercialValue[a.rarity] ?? 1000
      const bRanking = rarityToNumercialValue[b.rarity] ?? 1000
      return bRanking - aRanking
    })

  return filteredCards
}
