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

type DottsAccount = {
  _id: string
  isflUsername: string
  ownedCards: string[]
  newestCards: string[]
  email: string
  password: string
  ownedRegularPacks: number
  ownedUltimusPacks: number
  isSubscribed: boolean
  isAdmin: boolean
  isProcessor: boolean
  isPackIssuer: boolean
  isSubmitter: boolean
}
