declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.gif'

type ColumnData = {
  id: string
  Header: string
  accessor: string
  title: string
  sortDescFirst: boolean
}

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

type DottsAccount = {
  _id: string
  isflUsername: string
  ownedCards: string[]
  newestCards: string[]
  email: string
  password: string
  ownedRegularPacks: number
  ownedUltimusPacks: number
  isSubscribed?: boolean
  isAdmin?: boolean
  isProcessor?: boolean
  isPackIssuer?: boolean
  isSubmitter?: boolean
}

type DottsAccountWithCards = DottsAccount & {
  cards: CardWithCount[]
}

type TradeStatus = 'declined' | 'completed' | 'pending'

type DottsTrade = {
  _id: string
  offeringUserId: string
  receivingUserId: string
  offeringUserCardIds: DottsCard[]
  receivingUserCardIds: DottsCard[]
  tradeStatus: TradeStatus
  tradeOfferDate: any
  tradeResolvedDate: any
  offeringUsername?: string
  receivingUsername?: string
}

type CollectionTableButtons = {
  id: string
  text: string
  onClick: Function
}
